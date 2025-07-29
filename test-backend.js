const axios = require('axios');

const backendUrl = 'https://rognivaran.onrender.com';

async function testBackend() {
  console.log('Testing backend connection...');
  
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await axios.get(`${backendUrl}/health`, { timeout: 30000 });
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test main endpoint
    console.log('Testing main endpoint...');
    const mainResponse = await axios.get(`${backendUrl}/`, { timeout: 30000 });
    console.log('✅ Main endpoint passed:', mainResponse.data);
    
    console.log('🎉 Backend is working properly!');
    
  } catch (error) {
    console.error('❌ Backend test failed:');
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout error - Render server might be starting up');
      console.error('This is normal for Render free tier. Try again in a few seconds.');
    } else if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else {
      console.error('Network error:', error.message);
    }
  }
}

testBackend(); 