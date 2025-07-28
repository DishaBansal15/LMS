const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['employee', 'manager'], default: 'employee' },
  leaveBalance: {
    casual: { type: Number, default: 12 },
    sick: { type: Number, default: 8 },
    earned: { type: Number, default: 10 },
  },
});
module.exports = mongoose.model('User', UserSchema);