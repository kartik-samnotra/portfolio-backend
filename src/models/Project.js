const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Project title is required'
      }
    }
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  shortDescription: {
    type: DataTypes.TEXT
  },
  content: {
    type: DataTypes.TEXT
  },
  featuredImage: {
    type: DataTypes.STRING
  },
  images: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  technologies: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  demoUrl: {
    type: DataTypes.STRING
  },
  githubUrl: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'web'
  },
  tags: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('completed', 'in-progress', 'planned'),
    defaultValue: 'completed'
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (project) => {
      if (!project.slug) {
        project.slug = project.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
      }
    }
  }
});

module.exports = Project;