const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalName: {
    type: DataTypes.STRING
  },
  mimeType: {
    type: DataTypes.STRING
  },
  size: {
    type: DataTypes.INTEGER
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alt: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.ENUM('image', 'document', 'other'),
    defaultValue: 'image'
  },
  uploadedBy: {
    type: DataTypes.UUID
  }
}, {
  timestamps: true
});

module.exports = Media;