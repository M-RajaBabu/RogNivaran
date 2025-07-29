// Simple test to check frontend-backend connection
const backendUrl = 'http://localhost:4000';

async function testConnection() {
  console.log('🧪 Testing Frontend-Backend Connection...\n');
  
  try {
    // Test 1: Basic connectivity
    console.log('1. Testing backend connectivity...');
    const response = await fetch(backendUrl);
    const data = await response.text();
    console.log('✅ Backend response:', data);
    
    // Test 2: Registration API
    console.log('\n2. Testing registration API...');
    const registerResponse = await fetch(`${backendUrl}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'testpassword123'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('✅ Registration response:', registerData);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

// Run the test
testConnection(); 