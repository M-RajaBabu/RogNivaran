import axios from 'axios';

const LOCAL_URL = 'http://localhost:4000';

async function testLocalBackend() {
  console.log('🧪 Testing Local Backend API...\n');
  
  try {
    // Test 1: Basic connectivity
    console.log('1. Testing local connectivity...');
    const healthResponse = await axios.get(LOCAL_URL);
    console.log('✅ Local backend is accessible:', healthResponse.data);
    
    // Test 2: User registration
    console.log('\n2. Testing user registration...');
    const testUser = {
      name: 'Local Test User',
      email: `localtest${Date.now()}@example.com`,
      password: 'testpassword123'
    };
    
    try {
      const registerResponse = await axios.post(`${LOCAL_URL}/api/user/register`, testUser);
      console.log('✅ Local registration successful:', registerResponse.data);
      
      // Test 3: User login
      console.log('\n3. Testing user login...');
      const loginData = {
        email: testUser.email,
        password: testUser.password
      };
      
      const loginResponse = await axios.post(`${LOCAL_URL}/api/user/login`, loginData);
      console.log('✅ Local login successful:', loginResponse.data);
      
    } catch (error) {
      console.error('❌ Local API Error:', error.response?.data || error.message);
      console.error('Status:', error.response?.status);
    }
    
  } catch (error) {
    console.error('❌ Local backend connection failed:', error.message);
    console.log('Make sure your local backend is running on port 4000');
  }
}

// Run the test
testLocalBackend(); 