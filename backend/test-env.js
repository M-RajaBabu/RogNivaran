import dotenv from 'dotenv'
dotenv.config()

console.log('=== Environment Variables Test ===')
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL ? 'SET' : 'NOT SET')
console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD ? 'SET' : 'NOT SET')
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET')

// Test the exact values that should be used
const testEmail = 'admin@rognivaran.com'
const testPassword = 'admin123'

console.log('\n=== Admin Login Test ===')
console.log('Expected email:', testEmail)
console.log('Expected password:', testPassword)
console.log('Actual ADMIN_EMAIL:', process.env.ADMIN_EMAIL)
console.log('Actual ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD)

// Test token generation
import jwt from 'jsonwebtoken'

if (process.env.JWT_SECRET) {
  const testToken = jwt.sign(testEmail + testPassword, process.env.JWT_SECRET)
  console.log('\n=== Token Test ===')
  console.log('Generated token:', testToken)
  
  try {
    const decoded = jwt.verify(testToken, process.env.JWT_SECRET)
    console.log('Decoded token:', decoded)
    console.log('Expected value:', testEmail + testPassword)
    console.log('Token verification:', decoded === testEmail + testPassword ? 'SUCCESS' : 'FAILED')
  } catch (error) {
    console.log('Token verification error:', error.message)
  }
} else {
  console.log('\n❌ JWT_SECRET not set!')
} 