const HomeContent = require("../model/HomeContent");
const { deleteFromS3, uploadImageToS3 } = require('../utils/s3Uploader');

/**
 * GET /api/home-content
 * Public
 */
exports.getHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOne();

    if (!content) {
      return res.status(404).json({
        message: "Home content not found"
      });
    }

    res.status(200).json(content);
  } catch (error) {
    console.error("Get HomeContent error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/**
 * PUT /api/home-content
 * Admin only
 * Handles both JSON and multipart/form-data
 */
exports.updateHomeContent = async (req, res) => {
  try {
    let updateData = {};

    // Check if we have form data with content field
    if (req.body.content) {
      // Parse the content from FormData
      updateData = JSON.parse(req.body.content);
    } else {
      // Regular JSON request (no file upload)
      updateData = req.body;
    }

    // Handle photo upload if present
    if (req.files && req.files.authorPhoto) {
      const file = req.files.authorPhoto[0];
      
      // Get existing content to delete old photo
      const existingContent = await HomeContent.findOne();
      if (existingContent?.aboutAuthor?.photoKey) {
        await deleteFromS3(existingContent.aboutAuthor.photoKey);
      }
      
      // Upload new photo and get permanent URL
      const { fileUrl, fileKey } = await uploadImageToS3(file);
      
      // Add photo info to update data
      updateData.aboutAuthor = {
        ...updateData.aboutAuthor,
        photoUrl: fileUrl,
        photoKey: fileKey
      };
    }

    const updatedContent = await HomeContent.findOneAndUpdate(
      {},
      updateData,
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    res.status(200).json(updatedContent);
  } catch (error) {
    console.error("Update HomeContent error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};