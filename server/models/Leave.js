
const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  from: String,
  to: String,
  reason: String,
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'rejected'],
  },
});

module.exports = mongoose.model('Leave', LeaveSchema);
