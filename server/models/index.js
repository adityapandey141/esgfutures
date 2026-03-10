const sequelize = require("../config/database");
const Admin = require("./Admin");
const Report = require("./Report");
const Page = require("./Page");
const Team = require("./Team");
const ImpactMetric = require("./ImpactMetric");
const Contact = require("./Contact");

// Define associations here if needed
// Example: Report.hasMany(Comment), etc.

const db = {
  sequelize,
  Admin,
  Report,
  Page,
  Team,
  ImpactMetric,
  Contact,
};

module.exports = db;
