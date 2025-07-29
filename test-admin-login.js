const axios = require('axios');

const backendUrl = 'https://rognivaran.onrender.com';

async function testAdminLogin() {
  console.log('=== Testing Admin Login ===');
  
  try {
    // Test admin login with the credentials you're using
    const loginResponse = await axios.post(`${backendUrl}/api/admin/login`, {
      email: 'admin@rognivaran.com',
      password: 'admin123'
    }, { timeout: 30000 });
    
    console.log('Login response:', loginResponse.data);
    
    if (loginResponse.data.success) {
      const token = loginResponse.data.token;
      console.log('✅ Admin login successful');
      console.log('Token:', token);
      
      // Test dashboard with token
      console.log('\n=== Testing Dashboard ===');
      const dashboardResponse = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { aToken: token },
        timeout: 30000
      });
      
      console.log('Dashboard response:', dashboardResponse.data);
      
    } else {
      console.log('❌ Admin login failed:', loginResponse.data.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:');
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else {
      console.error('Network error:', error.message);
    }
  }
}

testAdminLogin(); 