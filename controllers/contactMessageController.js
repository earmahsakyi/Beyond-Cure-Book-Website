const ContactMessage = require("../model/ContactMessage");

// @route   POST /api/contact
// @desc    Submit a contact form message
// @access  Public
exports.submitContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: "Name, email, and message are required" 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Please provide a valid email address" 
      });
    }

    // Normalize email
    const emailNormalized = email.trim().toLowerCase();

    // Create new contact message
    const contactMessage = await ContactMessage.create({
      name: name.trim(),
      email: emailNormalized,
      subject: subject?.trim() || "",
      message: message.trim()
    });

    res.status(201).json({
      message: "Thank you for your message! We'll get back to you soon.",
      data: {
        _id: contactMessage._id,
        name: contactMessage.name,
        email: contactMessage.email,
        createdAt: contactMessage.createdAt
      }
    });
  } catch (err) {
    console.error("Error submitting contact message:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// @route   GET /api/contact
// @desc    Get all contact messages (admin only)
// @access  Private/Admin
exports.getAllContactMessages = async (req, res) => {
  try {
    const { isRead, limit = 50, page = 1 } = req.query;

    // Build filter
    const filter = {};
    if (isRead !== undefined) {
      filter.isRead = isRead === 'true';
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch messages with pagination
    const messages = await ContactMessage.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count for pagination
    const total = await ContactMessage.countDocuments(filter);

    res.status(200).json({
      messages,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      unreadCount: await ContactMessage.countDocuments({ isRead: false })
    });
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   PATCH /api/contact/:id/read
// @desc    Mark a contact message as read/unread (admin only)
// @access  Private/Admin
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead = true } = req.body;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { isRead },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      message: `Message marked as ${isRead ? 'read' : 'unread'}`,
      data: message
    });
  } catch (err) {
    console.error("Error updating message:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @route   DELETE /api/contact/:id
// @desc    Delete a contact message (admin only)
// @access  Private/Admin
exports.deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }

    const message = await ContactMessage.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      message: "Message deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ message: "Server error" });
  }
};