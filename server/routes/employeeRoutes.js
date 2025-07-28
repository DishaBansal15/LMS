// server/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');
const User = require('../models/Users');
const Leave = require('../models/Leave');

// Get employee profile
router.get('/profile', authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// Get leave status
router.get('/leaves', authenticate, async (req, res) => {
  const leaves = await Leave.find({ userId: req.user.id });
  res.json(leaves);
});

// Apply for leave
router.post('/leave', authenticate, async (req, res) => {
  const { from, to, reason } = req.body;
  const leave = new Leave({
    userId: req.user.id,
    from,
    to,
    reason,
    status: 'pending',
  });
  await leave.save();
  res.send('Leave applied successfully');
});

module.exports = router;
