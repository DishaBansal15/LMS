const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes'); // adjust path
const cors = require('cors');
// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employee', employeeRoutes);
const managerRoutes = require('./routes/managerRoutes');
app.use('/api/manager', managerRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/leave-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ Failed to connect to MongoDB:', err);
});
