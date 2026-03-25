import bcrypt from 'bcryptjs';
import { User } from './src/models';
import sequelize from './src/config/database';

async function generateAdmin() {
  try {
    await sequelize.sync();
    
    const adminEmail = 'admin@skintermo.com';
    const existing = await User.findOne({ where: { email: adminEmail } });
    
    if (existing) {
      console.log('Admin user already exists!');
      process.exit(0);
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await User.create({
      name: 'System Administrator',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('Admin properly created with ID:', admin.id);
  } catch (error) {
    console.error('Failed to create admin:', error);
  } finally {
    process.exit(0);
  }
}

generateAdmin();
