const bcrypt = require('bcryptjs');
const { Admin } = require('../models');
const sequelize = require('../config/database');

async function createAdmin() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connected successfully');

    // Sync models
    await sequelize.sync();
    console.log('Database synced');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ where: { email: 'admin@esgfuture.com' } });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@esgfuture.com');
      console.log('If you forgot the password, delete this admin and run this script again.');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    const admin = await Admin.create({
      email: 'admin@esgfuture.com',
      password: hashedPassword,
      name: 'Admin User'
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('\n📧 Email: admin@esgfuture.com');
    console.log('🔑 Password: Admin@123');
    console.log('\n⚠️  IMPORTANT: Change this password immediately after first login!');
    console.log('\nYou can now login at: /admin/login\n');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
