const mongoose = require('mongoose');


const EmailSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  source: {
    type: String,
    default: "email-capture" 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("EmailSubscriber", EmailSubscriberSchema);