const EmailSubscriber = require("../model/EmailSubscriber");

// GET all email subscribers (admin)
exports.getAllEmails = async (req, res) => {
  try {
    const emails = await EmailSubscriber.find().sort({ createdAt: -1 });
    res.status(200).json(emails);
  } catch (err) {
    console.error("Get emails error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST subscribe to checklist
exports.subscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const emailNormalized = email.trim().toLowerCase();

    const existing = await EmailSubscriber.findOne({ email: emailNormalized });
    if (existing) {
      return res
        .status(400)
        .json({ message: "You have already subscribed to the checklist" });
    }

    await EmailSubscriber.create({ email: emailNormalized });

    res.status(201).json({
      message: "You have successfully subscribed to the checklist",
    });
  } catch (err) {
    console.error("Error subscribing to checklist:", err);
    res.status(500).json({ message: "Server error" });
  }
};
