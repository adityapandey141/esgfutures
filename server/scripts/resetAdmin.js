require("dotenv").config();
const bcrypt = require("bcryptjs");
const { Admin } = require("../models");
const sequelize = require("../config/database");

async function resetAdmin() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    // Find admin with either email
    let admin = await Admin.findOne({
      where: { email: "admin@esgfutures.com" },
    });
    if (!admin) {
      admin = await Admin.findOne({ where: { email: "admin@esgfuture.com" } });
    }

    if (!admin) {
      console.log("❌ Admin not found. Creating new admin...");
      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      await Admin.create({
        email: "admin@esgfuture.com",
        password: hashedPassword,
        name: "Admin User",
      });
      console.log("✅ Admin created successfully!");
    } else {
      console.log("✅ Admin found. Resetting password...");
      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      admin.password = hashedPassword;
      await admin.save();
      console.log("✅ Password reset successfully!");
    }

    console.log("\n📧 Email: admin@esgfuture.com");
    console.log("🔑 Password: Admin@123\n");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

resetAdmin();
