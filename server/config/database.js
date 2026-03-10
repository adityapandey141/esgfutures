const { Sequelize } = require("sequelize");
const path = require("path");

let sequelize;

if (process.env.NODE_ENV === "production") {
  // Production: Use MySQL
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
  console.log("Using MySQL database (Production)");
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
