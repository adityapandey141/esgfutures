const bcrypt = require('bcryptjs');
const { Admin } = require('../models');
const sequelize = require('../config/database');

async function initDatabase() {
  try {
    console.log('Initializing database...');
    
    // Sync database tables
    await sequelize.sync();
    console.log('✅ Database tables synced');

    // Check if admin exists
    const adminCount = await Admin.count();
    
    if (adminCount === 0) {
      console.log('No admin user found. Creating default admin...');
      
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      
      await Admin.create({
        email: 'admin@esgfuture.com',
        password: hashedPassword,
        name: 'Admin User'
      });

      console.log('✅ Default admin created successfully!');
      console.log('📧 Email: admin@esgfuture.com');
      console.log('🔑 Password: Admin@123');
      console.log('⚠️  IMPORTANT: Change this password after first login!');
    } else {
      console.log(`✅ Admin user already exists (${adminCount} admin(s) found)`);
    }

    console.log('✅ Database initialization complete');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

module.exports = initDatabase;
