const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes'); // adjust path
const cors = require('cors');
require('dotenv').config();

// Middleware

const allowedOrigins = [
  "http://localhost:3000", // local frontend
  "https://doctor-appointment-system-frontend-tau.vercel.app" 
];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow Postman or curl requests
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employee', employeeRoutes);
const managerRoutes = require('./routes/managerRoutes');
app.use('/api/manager', managerRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT,'0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ Failed to connect to MongoDB:', err);
});
