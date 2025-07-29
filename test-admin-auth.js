const axios = require('axios');

const backendUrl = 'https://rognivaran.onrender.com';

async function testAdminAuth() {
  console.log('Testing admin authentication...');
  
  try {
    // Test admin login
    console.log('Testing admin login...');
    const loginResponse = await axios.post(`${backendUrl}/api/admin/login`, {
      email: 'admin@rognivaran.com',
      password: 'admin123'
    }, { timeout: 30000 });
    
    console.log('Login response:', loginResponse.data);
    
    if (loginResponse.data.success) {
      const token = loginResponse.data.token;
      console.log('✅ Admin login successful, token received');
      
      // Test getting patients with token
      console.log('Testing get patients with token...');
      const patientsResponse = await axios.get(`${backendUrl}/api/admin/patients`, {
        headers: { aToken: token },
        timeout: 30000
      });
      
      console.log('Patients response:', patientsResponse.data);
      
      // Test getting doctors with token
      console.log('Testing get doctors with token...');
      const doctorsResponse = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
        headers: { aToken: token },
        timeout: 30000
      });
      
      console.log('Doctors response:', doctorsResponse.data);
      
    } else {
      console.log('❌ Admin login failed:', loginResponse.data.message);
    }
    
  } catch (error) {
    console.error('❌ Admin auth test failed:');
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else {
      console.error('Network error:', error.message);
    }
  }
}

testAdminAuth(); 