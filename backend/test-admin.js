import dotenv from 'dotenv';
dotenv.config();

console.log('🔍 Checking Admin Environment Variables...\n');

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

console.log('Admin Email:', adminEmail || 'NOT SET');
console.log('Admin Password:', adminPassword ? '***SET***' : 'NOT SET');

if (adminEmail && adminPassword) {
  console.log('\n✅ Admin credentials are configured!');
  console.log('You can login with:');
  console.log('Email:', adminEmail);
  console.log('Password:', adminPassword);
} else {
  console.log('\n❌ Admin credentials are missing!');
  console.log('Please set these environment variables in Render:');
  console.log('ADMIN_EMAIL=admin@rognivaran.com');
  console.log('ADMIN_PASSWORD=admin123456');
} 