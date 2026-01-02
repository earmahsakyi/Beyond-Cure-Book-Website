const Resource = require('../model/Resource');
const { uploadPdfToS3, deleteFromS3,getSignedUrlforFile } = require('../utils/s3Uploader');

/**
 * @desc    Upload a new resource (PDF)
 * @route   POST /api/resources
 * @access  Admin only
 */
exports.uploadResource = async (req, res) => {
  try {
    // Validate file upload
    if (!req.files || !req.files.document) {
      return res.status(400).json({ 
        success: false,
        message: 'No PDF file uploaded' 
      });
    }

    const { title, description, category, isPublished } = req.body;

    // Validate required fields
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and category are required'
      });
    }

    // Validate category
    if (!['patients', 'clinicians'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Category must be either "patients" or "clinicians"'
      });
    }

    const pdfFile = req.files.document[0];

    // Upload to S3
    const { fileUrl, fileKey } = await uploadPdfToS3(pdfFile, category);

    // Create resource in database
    const resource = new Resource({
      title,
      description,
      category,
      fileUrl,
      fileKey,
      fileType: 'pdf',
      fileSize: pdfFile.size,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    await resource.save();

    res.status(201).json({
      success: true,
      message: 'Resource uploaded successfully',
      data: resource
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading resource',
      error: error.message
    });
  }
};

/**
 * @desc    Get all resources (admin view - includes unpublished)
 * @route   GET /api/resources
 * @access  Admin only
 */
exports.getAllResources = async (req, res) => {
  try {
    const { category, isPublished } = req.query;

    // Build filter
    const filter = {};
    if (category) filter.category = category;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';

    const resources = await Resource.find(filter)
      .sort({ createdAt: -1 }) // Most recent first
      .select('-__v'); // Exclude version key

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });

  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching resources',
      error: error.message
    });
  }
};

/**
 * @desc    Get public resources (only published, limited fields)
 * @route   GET /api/resources/public
 * @access  Public
 */
exports.getPublicResources = async (req, res) => {
  try {
    const { category } = req.query;

    // Build filter - only published resources
    const filter = { isPublished: true };
    if (category) filter.category = category;

    const resources = await Resource.find(filter)
      .sort({ createdAt: -1 })
      .select('title description category fileUrl fileKey fileType fileSize createdAt'); // Only metadata and file URL

      const resourcesWithSignedUrls = await Promise.all(
      resources.map(async (resource) => ({
        ...resource.toObject(),
        fileUrl: await getSignedUrlforFile(resource.fileKey),
      }))
    );

    res.status(200).json({
      success: true,
      count: resourcesWithSignedUrls.length,
      data: resourcesWithSignedUrls
    });

  } catch (error) {
    console.error('Get public resources error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching public resources',
      error: error.message
    });
  }
};

/**
 * @desc    Update resource metadata (not the file itself)
 * @route   PUT /api/resources/:id
 * @access  Admin only
 */
exports.updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, isPublished } = req.body;

    // Find resource
    const resource = await Resource.findById(id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Validate category if provided
    if (category && !['patients', 'clinicians'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Category must be either "patients" or "clinicians"'
      });
    }

    // Update fields
    if (title) resource.title = title;
    if (description) resource.description = description;
    if (category) resource.category = category;
    if (isPublished !== undefined) resource.isPublished = isPublished;

    await resource.save();

    res.status(200).json({
      success: true,
      message: 'Resource updated successfully',
      data: resource
    });

  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating resource',
      error: error.message
    });
  }
};

/**
 * @desc    Delete resource (deletes from both S3 and database)
 * @route   DELETE /api/resources/:id
 * @access  Admin only
 */
exports.deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    // Find resource
    const resource = await Resource.findById(id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Delete from S3 using the fileKey
    if (resource.fileKey) {
      await deleteFromS3(resource.fileKey);
    }

    // Delete from database
    await Resource.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Resource deleted successfully from both S3 and database'
    });

  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting resource',
      error: error.message
    });
  }
};