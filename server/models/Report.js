const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255]
    }
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      is: /^[a-z0-9-]+$/
    }
  },
  abstract: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('climate', 'governance', 'sustainability', 'finance', 'research'),
    allowNull: false,
    defaultValue: 'research'
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  featured_image: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  published_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  meta_title: {
    type: DataTypes.STRING(60),
    allowNull: true
  },
  meta_description: {
    type: DataTypes.STRING(160),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft',
    allowNull: false
  }
}, {
  tableName: 'reports',
  timestamps: true,
  indexes: [
    {
      fields: ['slug']
    },
    {
      fields: ['category']
    },
    {
      fields: ['published_date']
    },
    {
      fields: ['status']
    }
  ]
});

module.exports = Report;
