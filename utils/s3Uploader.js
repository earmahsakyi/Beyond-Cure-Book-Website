const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const createError = require('http-errors');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Memory storage - keeps file in memory as Buffer before uploading to S3
const storage = multer.memoryStorage();

// File filter - validates that only PDFs are uploaded
const pdfFileFilter = (req, file, cb) => {
  // Check if the field name is 'document' and MIME type is PDF
  if (file.fieldname === 'document' && file.mimetype === 'application/pdf') {
    cb(null, true); // Accept the file
  } else {
    // Reject the file with error
    cb(createError(400, 'Only PDF files are allowed'), false);
  }
};

// File filter - validates that only images are uploaded
const imageFileFilter = (req, file, cb) => {
  if (file.fieldname === 'authorPhoto' && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(createError(400, 'Only image files are allowed'), false);
  }
};

// Multer configuration for PDF uploads
const upload = multer({
  storage,
  fileFilter: pdfFileFilter,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB limit for PDFs
  },
}).fields([{ name: 'document', maxCount: 1 }]);

// Multer configuration for image uploads
const uploadPhoto = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB limit for images 
  },
}).fields([{ name: 'authorPhoto', maxCount: 1 }]);

/**
 * Upload PDF to S3
 * @param {Object} file - The file object from multer (contains buffer, originalname, mimetype, size)
 * @param {String} category - Category for organizing files ('patients' or 'clinicians')
 * @returns {Object} - Object containing fileUrl and fileKey
 */
const uploadPdfToS3 = async (file, category = 'general') => {
  // Create folder structure based on category
  const folder = category.toLowerCase();
  
  // Generate unique filename with timestamp to avoid collisions
  const timestamp = Date.now();
  const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
  const key = `resources/${folder}/${timestamp}-${sanitizedFilename}`;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ContentDisposition: 'inline',
    Metadata: {
      'original-name': file.originalname,
      'upload-date': new Date().toISOString(),
      'category': category
    }
  };

  // Send the file to S3
  await s3.send(new PutObjectCommand(uploadParams));

  // Return both URL and key for database storage
  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  
  return {
    fileUrl,
    fileKey: key
  };
};

/**
 * Upload Image to S3 with public read access
 * @param {Object} file - The file object from multer (contains buffer, originalname, mimetype, size)
 * @param {String} folder - Folder for organizing images (default: 'authors')
 * @returns {Object} - Object containing fileUrl and fileKey
 */
const uploadImageToS3 = async (file, folder = 'authors') => {
  const timestamp = Date.now();
  const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
  const key = `${folder}/${timestamp}-${sanitizedFilename}`;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ContentDisposition: 'inline',
    Metadata: {
      'original-name': file.originalname,
      'upload-date': new Date().toISOString(),
      'folder': folder,
      'file-type': 'author-photo'
    }
  };

  // Send the file to S3
  await s3.send(new PutObjectCommand(uploadParams));

  // Return both URL and key for database storage
  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  
  return {
    fileUrl,
    fileKey: key
  };
};

/**
 * Delete file from S3 (works for both PDFs and images)
 * @param {String} fileKey - The S3 key of the file to delete
 * @returns {Boolean} - True if deletion was successful
 */
const deleteFromS3 = async (fileKey) => {
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  };

  await s3.send(new DeleteObjectCommand(deleteParams));
  return true;
};

/**
 * Get signed URL for private file access
 * @param {String} fileKey - The S3 key of the file
 * @returns {String} - Signed URL valid for 1 hour
 */
const getSignedUrlforFile = async (fileKey) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 3600, // 1 hour
  });

  return signedUrl;
};

module.exports = {
  upload,
  uploadPhoto,
  uploadPdfToS3,
  uploadImageToS3,
  deleteFromS3,
  getSignedUrlforFile,
};