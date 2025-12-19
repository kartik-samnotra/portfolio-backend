const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Skill name is required'
      }
    }
  },
  category: {
    type: DataTypes.ENUM('frontend', 'backend', 'database', 'devops', 'mobile', 'other'),
    defaultValue: 'other'
  },
  proficiency: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 100
    },
    defaultValue: 50
  },
  icon: {
    type: DataTypes.STRING
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#3B82F6'
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});

module.exports = Skill;