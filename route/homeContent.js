const express = require('express');
const router = express.Router()
const homeContentController = require('../controllers/homeContentComtroller');
const auth = require('../middleware/auth');

router.get('/',auth,homeContentController.getHomeContent);
router.put('/',auth,homeContentController.updateHomeContent);

module.exports = router;