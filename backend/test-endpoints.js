import axios from 'axios';

const BASE_URL = 'https://rognivaran.onrender.com';

// Test backend connection
async function testBackend() {
  try {
    console.log('Testing backend connection...');
    const response = await axios.get(BASE_URL);
    console.log('✅ Backend is accessible:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    return false;
  }
}

// Test user registration
async function testUserRegistration() {
  try {
    console.log('Testing user registration...');
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword123'
    };
    
    const response = await axios.post(`${BASE_URL}/api/user/register`, testUser);
    console.log('✅ User registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ User registration failed:', error.response?.data || error.message);
    return null;
  }
}

// Test user login
async function testUserLogin() {
  try {
    console.log('Testing user login...');
    const loginData = {
      email: 'test@example.com',
      password: 'testpassword123'
    };
    
    const response = await axios.post(`${BASE_URL}/api/user/login`, loginData);
    console.log('✅ User login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ User login failed:', error.response?.data || error.message);
    return null;
  }
}

// Run tests
async function runTests() {
  console.log('🧪 Starting backend tests...\n');
  
  const backendOk = await testBackend();
  if (!backendOk) {
    console.log('❌ Backend is not accessible. Stopping tests.');
    return;
  }
  
  console.log('\n--- Testing Registration ---');
  const registrationResult = await testUserRegistration();
  
  console.log('\n--- Testing Login ---');
  const loginResult = await testUserLogin();
  
  console.log('\n📊 Test Summary:');
  console.log('Backend Connection:', backendOk ? '✅' : '❌');
  console.log('Registration:', registrationResult?.success ? '✅' : '❌');
  console.log('Login:', loginResult?.success ? '✅' : '❌');
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}

export { testBackend, testUserRegistration, testUserLogin }; 