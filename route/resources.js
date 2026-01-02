const express = require('express');
const router = express.Router();
const { upload } = require('../utils/s3Uploader');
const {
  uploadResource,
  getAllResources,
  getPublicResources,
  updateResource,
  deleteResource
} = require('../controllers/resourceController');
const auth =  require('../middleware/auth');


/**
 * Public routes - no authentication required
 */
router.get('/public', getPublicResources);

/**
 * Admin routes - require authentication and admin role
 * Apply protect and authorize middleware to all routes below
 */

// Upload new resource
router.post('/', 
  auth,        
  upload,                     // Handle file upload with multer
  uploadResource             // Controller function
);

// Get all resources (admin view)
router.get('/', 
  auth,
  getAllResources
);

// Update resource metadata
router.put('/:id', 
  auth,
  updateResource
);

// Delete resource
router.delete('/:id', 
  auth, 
  deleteResource
);

module.exports = router;