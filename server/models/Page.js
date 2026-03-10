const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Page = sequelize.define('Page', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  page_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['home', 'impact', 'team', 'about']]
    }
  },
  section_key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  order_index: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  type: {
    type: DataTypes.ENUM('text', 'html', 'json'),
    defaultValue: 'text',
    allowNull: false
  }
}, {
  tableName: 'pages',
  timestamps: true,
  indexes: [
    {
      fields: ['page_name', 'section_key']
    },
    {
      fields: ['order_index']
    }
  ]
});

module.exports = Page;
