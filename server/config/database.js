const { Sequelize } = require("sequelize");
const path = require("path");

let sequelize;

// Check if forced to use local SQLite
if (process.env.USE_LOCAL_DB === "true") {
  // Use SQLite for local development
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../database.sqlite"),
    logging: false,
  });
  console.log("Using SQLite database (database.sqlite) - Local mode");
} else if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME) {
  // Use MySQL (works for both development and production)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      dialect: "mysql",
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  );
  console.log(
    `Using MySQL database: ${process.env.DB_NAME}@${process.env.DB_HOST}`,
  );
} else {
  // Fallback to SQLite if no MySQL credentials
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../database.sqlite"),
    logging: false,
  });
  console.log("Using SQLite database (database.sqlite)");
}

module.exports = sequelize;
