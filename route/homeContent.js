const express = require('express');
const router = express.Router()
const homeContentController = require('../controllers/homeContentComtroller');
const auth = require('../middleware/auth');
const  { uploadPhoto } = require('../utils/s3Uploader');

router.get('/',homeContentController.getHomeContent);
router.put('/',auth, uploadPhoto, homeContentController.updateHomeContent);

module.exports = router;