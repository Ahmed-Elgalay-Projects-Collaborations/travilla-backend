const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema(
  {
    action: {
      type: String, // e.g., "reservation_approved", "agency_rejected"
      required: true,
    },
    user_id: {
      type: Number, // MySQL user ID
      required: true,
    },
    details: {
      type: String, // Additional details about the action
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now, // Automatically set the current date and time
    },
  },
  {
    collection: 'admin_logs', // Optional: Specify collection name
  }
);

const AdminLog = mongoose.model('AdminLog', adminLogSchema);

module.exports = AdminLog;