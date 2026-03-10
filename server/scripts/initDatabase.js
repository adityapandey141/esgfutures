const bcrypt = require("bcryptjs");
const { Admin } = require("../models");
const sequelize = require("../config/database");

async function initDatabase() {
  try {
    console.log("Initializing database...");

    // Sync database tables
    // Use force: true to drop and recreate tables (WARNING: deletes all data)
    // Set FORCE_SYNC=true in environment to enable
    const forceSync = process.env.FORCE_SYNC === "true";

    if (forceSync) {
      console.log(
        "⚠️  FORCE SYNC enabled - dropping and recreating all tables...",
      );
      await sequelize.sync({ force: true });
      console.log("✅ Database tables recreated with fresh schema");
    } else {
      await sequelize.sync({ alter: true });
      console.log("✅ Database tables synced (alter mode)");
    }

    // Check if admin exists
    const adminCount = await Admin.count();

    if (adminCount === 0) {
      console.log("No admin user found. Creating default admin...");

      await Admin.create({
        email: "admin@esgfutures.com",
        password: "Admin@123",
        name: "Admin User",
      });

      console.log(" Default admin created successfully!");
      console.log(" Email: admin@esgfutures.com");
      console.log(" Password: Admin@123");
      console.log("  IMPORTANT: Change this password after first login!");
    } else {
      console.log(` Admin user already exists (${adminCount} admin(s) found)`);
    }

    console.log(" Database initialization complete");
    console.log("✅ Database initialization complete");
  } catch (error) {
    console.error("❌ Database initialization error:", error);
    throw error;
  }
}

module.exports = initDatabase;
