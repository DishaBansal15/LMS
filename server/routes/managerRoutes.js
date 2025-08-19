
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');
const Leave = require('../models/Leave');
const User = require('../models/Users');

// Get all leave requests
router.get('/leaves', authenticate, async (req, res) => {
  try {
    const leaves = await Leave.find().populate('userId', 'name email');
    const formatted = leaves.map(leave => ({
      _id: leave._id,
      user: leave.userId,
      from: leave.from,
      to: leave.to,
      reason: leave.reason,
      status: leave.status
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve/Reject leave
router.put('/leave/:id', authenticate, async (req, res) => {
  const { status } = req.body;
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).send('Invalid status');
  }
  const leave = await Leave.findById(req.params.id);
  if (!leave) return res.status(404).send('Leave not found');
  leave.status = status;
  await leave.save();
  res.send('Leave status updated');
});

module.exports = router;
