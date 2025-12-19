const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const About = sequelize.define('About', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'About Me'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  shortBio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  avatar: {
    type: DataTypes.STRING
  },
  resumeUrl: {
    type: DataTypes.STRING
  },
  socialLinks: {
    type: DataTypes.JSONB,
    defaultValue: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: ''
    }
  },
  stats: {
    type: DataTypes.JSONB,
    defaultValue: {
      projects: 0,
      clients: 0,
      experience: 0,
      awards: 0
    }
  }
}, {
  timestamps: true,
  // Only one about record should exist
  indexes: [
    {
      unique: true,
      fields: ['id']
    }
  ]
});

module.exports = About;