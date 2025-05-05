const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    sender_id: {
      type: Number, // MySQL user ID
      required: true,
    },
    receiver_id: {
      type: Number, // MySQL admin or agency ID
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'chats', // Optional: Specify collection name
  }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;