const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getAllContactMessages,
  markAsRead,
  deleteContactMessage
} = require('../controllers/contactMessageController');
const auth = require('../middleware/auth'); 

// @route   POST /api/contact
// @desc    Submit a contact form message
// @access  Public
router.post('/', submitContactMessage);

// @route   GET /api/contact
// @desc    Get all contact messages (admin only)
// @access  Private/Admin
router.get('/', auth, getAllContactMessages);

// @route   PATCH /api/contact/:id/read
// @desc    Mark a contact message as read/unread (admin only)
// @access  Private/Admin
router.patch('/:id/read', auth, markAsRead);

// @route   DELETE /api/contact/:id
// @desc    Delete a contact message (admin only)
// @access  Private/Admin
router.delete('/:id', auth, deleteContactMessage);

module.exports = router;