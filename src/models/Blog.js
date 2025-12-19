const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Blog = sequelize.define('Blog', {
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
        msg: 'Blog title is required'
      }
    }
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  excerpt: {
    type: DataTypes.TEXT
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  featuredImage: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING,
    defaultValue: 'Admin'
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'general'
  },
  tags: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  readTime: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  metaTitle: {
    type: DataTypes.STRING
  },
  metaDescription: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (blog) => {
      if (!blog.slug) {
        blog.slug = blog.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
      }
      if (!blog.excerpt && blog.content) {
        blog.excerpt = blog.content.substring(0, 150) + '...';
      }
    }
  }
});

module.exports = Blog;