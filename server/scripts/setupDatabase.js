const sequelize = require('../config/database');
const db = require('../models');

async function setupDatabase() {
  try {
    console.log('Starting database setup...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync all models
    await sequelize.sync({ force: false });
    console.log('Database models synchronized successfully.');
    
    // Create default admin if none exists
    const { Admin } = db;
    const adminCount = await Admin.count();
    
    if (adminCount === 0) {
      await Admin.create({
        name: 'Admin User',
        email: 'admin@esgfutures.com',
        password: 'admin123456', // Change this in production
        role: 'admin'
      });
      console.log('Default admin user created: admin@esgfutures.com / admin123456');
    }
    
    console.log('Database setup completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
