const { sequelize } = require('./database');
const User = require('../models/User');
const About = require('../models/About');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Experience = require('../models/Experience');
const Testimonial = require('../models/Testimonial');
const Service = require('../models/Service');
const Message = require('../models/Message');
const Media = require('../models/Media');

const syncDatabase = async () => {
  try {
    // Sync all models
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database synchronized');
    
    // Create default admin user if not exists
    await createDefaultAdmin();
    
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    throw error;
  }
};

const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } });
    
    if (!adminExists) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      
      await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
      });
      
      console.log('👑 Default admin user created');
    }
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
  }
};

module.exports = { syncDatabase };