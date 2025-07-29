import axios from 'axios'

const backendUrl = 'https://rognivaran-backend.onrender.com' // Using deployed backend URL

const testAdminEndpoints = async () => {
  console.log('Testing Admin Endpoints...\n')
  console.log('Backend URL:', backendUrl)

  try {
    // Test admin login
    console.log('1. Testing Admin Login...')
    const loginResponse = await axios.post(`${backendUrl}/api/admin/login`, {
      email: 'admin@rognivaran.com',
      password: 'admin123456'
    })
    console.log('Login Response:', loginResponse.data)
    
    if (loginResponse.data.success) {
      const token = loginResponse.data.token
      console.log('✅ Admin login successful')
      
      // Test dashboard
      console.log('\n2. Testing Dashboard...')
      const dashboardResponse = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { aToken: token }
      })
      console.log('Dashboard Response:', dashboardResponse.data)
      
      // Test doctors list
      console.log('\n3. Testing Doctors List...')
      const doctorsResponse = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
        headers: { aToken: token }
      })
      console.log('Doctors Response:', doctorsResponse.data)
      
      // Test patients list
      console.log('\n4. Testing Patients List...')
      const patientsResponse = await axios.get(`${backendUrl}/api/admin/patients`, {
        headers: { aToken: token }
      })
      console.log('Patients Response:', patientsResponse.data)
      
      // Test appointments list
      console.log('\n5. Testing Appointments List...')
      const appointmentsResponse = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { aToken: token }
      })
      console.log('Appointments Response:', appointmentsResponse.data)
      
    } else {
      console.log('❌ Admin login failed:', loginResponse.data.message)
    }
    
  } catch (error) {
    console.error('❌ Error testing endpoints:')
    if (error.response) {
      console.error('Status:', error.response.status)
      console.error('Data:', error.response.data)
    } else {
      console.error('Message:', error.message)
    }
  }
}

testAdminEndpoints() 