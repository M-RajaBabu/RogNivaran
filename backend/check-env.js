import dotenv from 'dotenv';
dotenv.config();

console.log('🔍 Checking Environment Variables...\n');

const requiredVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

const optionalVars = [
  'STRIPE_SECRET_KEY',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET'
];

console.log('Required Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`❌ ${varName}: NOT SET`);
  }
});

console.log('\nOptional Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`⚠️  ${varName}: NOT SET (optional)`);
  }
});

console.log('\n📋 Summary:');
const missingRequired = requiredVars.filter(varName => !process.env[varName]);
if (missingRequired.length === 0) {
  console.log('✅ All required environment variables are set!');
} else {
  console.log('❌ Missing required environment variables:', missingRequired);
} 