const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./Src/routes/authRoutes'));
app.use('/api/users', require('./Src/routes/userRoutes'));
app.use('/api/employees', require('./Src/routes/employeeRoutes'));
//app.use('/api/positions',require('./Src/routes/positionRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
