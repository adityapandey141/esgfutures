const { Sequelize } = require("sequelize");
const path = require("path");

let sequelize;

if (process.env.DATABASE_URL) {
  // Production: Use PostgreSQL (Render)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
  console.log("Using PostgreSQL database (Production)");
} else {
  // Development: Use SQLite
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../database.sqlite"),
    logging: false,
  });
  console.log("Using SQLite database (Development)");
}

module.exports = sequelize;
