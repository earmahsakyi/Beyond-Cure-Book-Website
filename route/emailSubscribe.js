const express = require('express');
const router = express.Router();
const EmailSubscriber = require('../controllers/emailSubscriberController');
const auth = require('../middleware/auth')



router.get('/',auth,EmailSubscriber.getAllEmails);
router.post('/',EmailSubscriber.subscribeEmail);

module.exports = router;
