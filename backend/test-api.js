import axios from 'axios';

const BASE_URL = 'https://rognivaran.onrender.com';

async function testBackend() {
  console.log('🧪 Testing Backend API...\n');
  
  try {
    // Test 1: Basic connectivity
    console.log('1. Testing basic connectivity...');
    const healthResponse = await axios.get(BASE_URL);
    console.log('✅ Backend is accessible:', healthResponse.data);
    
    // Test 2: User registration
    console.log('\n2. Testing user registration...');
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'testpassword123'
    };
    
    try {
      const registerResponse = await axios.post(`${BASE_URL}/api/user/register`, testUser);
      console.log('✅ Registration successful:', registerResponse.data);
      
      // Test 3: User login
      console.log('\n3. Testing user login...');
      const loginData = {
        email: testUser.email,
        password: testUser.password
      };
      
      const loginResponse = await axios.post(`${BASE_URL}/api/user/login`, loginData);
      console.log('✅ Login successful:', loginResponse.data);
      
    } catch (error) {
      console.error('❌ API Error:', error.response?.data || error.message);
      console.error('Status:', error.response?.status);
      console.error('Headers:', error.response?.headers);
    }
    
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
  }
}

// Run the test
testBackend(); 