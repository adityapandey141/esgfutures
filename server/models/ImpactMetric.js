const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ImpactMetric = sequelize.define('ImpactMetric', {
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
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  metric_value: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  metric_unit: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  icon_name: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  order_index: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  tableName: 'impact_metrics',
  timestamps: true,
  indexes: [
    {
      fields: ['order_index']
    },
    {
      fields: ['is_active']
    }
  ]
});

module.exports = ImpactMetric;
