const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testConnection } = require('./config/database');
const { syncDatabase } = require('./config/sync');
const errorHandler = require('./middleware/errorHandler');

// Import Routes
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

// Test database connection
testConnection();

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🎯 Portfolio CMS API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/*',
      content: '/api/*',
      admin: '/api/admin/*'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Sync database
    await syncDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📁 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 API: http://localhost:${PORT}`);
      console.log(`👤 Admin Login: ${process.env.ADMIN_EMAIL}`);
      console.log(`🔐 Admin Password: ${process.env.ADMIN_PASSWORD}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

startServer();