import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Login = () => {
  const [activeTab, setActiveTab] = useState('patient') // 'patient', 'doctor', 'admin'
  const [isRegistering, setIsRegistering] = useState(false)

  // Form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [experience, setExperience] = useState('')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  // Reset isRegistering to false when admin tab is selected
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'admin') {
      setIsRegistering(false) // Always set to login for admin
    }
  }

  // Test backend connection
  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await axios.get(backendUrl + '/')
        console.log('Backend test successful:', response.data)
      } catch (error) {
        console.error('Backend test failed:', error.message)
        toast.error('Backend connection failed. Please check if the server is running.')
      }
    }
    
    if (backendUrl) {
      testBackend()
    }
  }, [backendUrl])

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted!', { activeTab, isRegistering, name, email, password, backendUrl })

    try {
      let endpoint = ''
      let data = {}

      if (activeTab === 'patient') {
        if (isRegistering) {
          endpoint = '/api/user/register'
          data = { name, email, password }
        } else {
          endpoint = '/api/user/login'
          data = { email, password }
        }
      } else if (activeTab === 'doctor') {
        if (isRegistering) {
          endpoint = '/api/doctor/register'
          data = { name, email, password, speciality, experience, fees, about }
      } else {
          endpoint = '/api/doctor/login'
          data = { email, password }
        }
      } else if (activeTab === 'admin') {
        // Admin only has login, no registration
        endpoint = '/api/admin/login'
        data = { email, password }
      }

      console.log(`Making request to: ${backendUrl + endpoint}`)
      console.log('Request data:', data)
      
      const response = await axios.post(backendUrl + endpoint, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000 // Increased to 30 seconds for Render
      })
      
      console.log(`${activeTab} ${activeTab === 'admin' ? 'login' : (isRegistering ? 'registration' : 'login')} response:`, response.data)

      if (response.data.success) {
        if (activeTab === 'admin') {
          localStorage.setItem('aToken', response.data.token)
        } else {
          localStorage.setItem('token', response.data.token)
          setToken(response.data.token)
        }
        toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ${activeTab === 'admin' ? 'login' : (isRegistering ? 'registration' : 'login')} successful!`)
        
        // Navigate based on user type
        if (activeTab === 'patient') {
          navigate('/')
        } else if (activeTab === 'doctor') {
          navigate('/doctor/dashboard')
        } else if (activeTab === 'admin') {
          navigate('/admin/dashboard')
        }
      } else {
        toast.error(response.data.message || 'Operation failed')
      }
    } catch (error) {
      console.error(`${activeTab} ${activeTab === 'admin' ? 'login' : (isRegistering ? 'registration' : 'login')} error:`, error)
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        // Timeout error - common with Render free tier
        console.error('Request timed out - Render server might be starting up')
        toast.error('Server is taking longer than usual to respond. Please try again in a few seconds. (This is normal for free tier hosting)')
      } else if (error.response) {
        // Server responded with error status
        console.error('Error response:', error.response.data)
        toast.error(error.response.data?.message || `Server error: ${error.response.status}`)
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request)
        toast.error('No response from server. The server might be starting up. Please try again.')
      } else {
        // Something else happened
        console.error('Request setup error:', error.message)
        toast.error('Request failed: ' + error.message)
      }
    }
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setSpeciality('')
    setExperience('')
    setFees('')
    setAbout('')
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    resetForm()
  }, [activeTab, isRegistering])

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary via-blue-600 to-purple-600 flex items-center justify-center p-4 sm:p-6 lg:p-8'>
      <div className='w-full max-w-md sm:max-w-lg lg:max-w-xl'>
        {/* Logo */}
        <div className='text-center mb-6 sm:mb-8'>
          <img 
            src={assets.logo} 
            alt="RogNivaran" 
            className='h-16 sm:h-20 lg:h-24 mx-auto mb-4 sm:mb-6'
          />
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2'>
            Welcome to RogNivaran
          </h1>
          <p className='text-white/80 text-sm sm:text-base'>
            Your trusted healthcare appointment platform
          </p>
        </div>

        {/* Login Form */}
        <div className='bg-white rounded-2xl shadow-2xl p-6 sm:p-8'>
          {/* Tab Navigation */}
          <div className='flex bg-gray-100 rounded-xl p-1 mb-6 sm:mb-8'>
            <button
              type='button'
              onClick={() => handleTabChange('patient')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                activeTab === 'patient' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Patient
            </button>
            <button
              type='button'
              onClick={() => handleTabChange('doctor')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                activeTab === 'doctor' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Doctor
            </button>
            <button
              type='button'
              onClick={() => handleTabChange('admin')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                activeTab === 'admin' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Registration/Login Toggle - Only for patient and doctor */}
          {activeTab !== 'admin' && (
            <div className='flex bg-gray-50 rounded-lg p-1 mb-6'>
              <button
                type='button'
                onClick={() => setIsRegistering(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  !isRegistering
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Login
              </button>
              <button
                type='button'
                onClick={() => setIsRegistering(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  isRegistering
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Register
              </button>
            </div>
          )}

          {/* Admin Login Header */}
          {activeTab === 'admin' && (
            <div className='mb-6 text-center'>
              <div className='inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-3'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                </svg>
              </div>
              <h2 className='text-xl font-semibold text-gray-900 mb-1'>Admin Access</h2>
              <p className='text-sm text-gray-600'>Enter your credentials to access the admin panel</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Name field for registration - Only for patient and doctor registration */}
            {(isRegistering && activeTab !== 'admin') && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Full Name
                </label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email Address
              </label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                required
              />
            </div>

            {/* Password field */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Password
              </label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                required
              />
            </div>

            {/* Doctor-specific fields for registration */}
            {activeTab === 'doctor' && isRegistering && (
              <>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Speciality
                  </label>
                  <select
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    required
                  >
                    <option value=''>Select Speciality</option>
                    <option value='General Physician'>General Physician</option>
                    <option value='Gynecologist'>Gynecologist</option>
                    <option value='Dermatologist'>Dermatologist</option>
                    <option value='Pediatrician'>Pediatrician</option>
                    <option value='Neurologist'>Neurologist</option>
                    <option value='Gastroenterologist'>Gastroenterologist</option>
                    <option value='Cardiologist'>Cardiologist</option>
                    <option value='Orthopedic Surgeon'>Orthopedic Surgeon</option>
                    <option value='Psychiatrist'>Psychiatrist</option>
                    <option value='Urologist'>Urologist</option>
                    <option value='Ophthalmologist'>Ophthalmologist</option>
                    <option value='ENT Specialist'>ENT Specialist</option>
                    <option value='Dentist'>Dentist</option>
                    <option value='Physiotherapist'>Physiotherapist</option>
                    <option value='Ayurvedic Physician'>Ayurvedic Physician</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Experience (Years)
                  </label>
                  <input
                    type='number'
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    min='0'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Consultation Fees (₹)
                  </label>
                  <input
                    type='number'
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    min='0'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    About
                  </label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    rows='3'
                    placeholder='Tell us about your expertise and experience...'
                    required
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200 mt-6 ${
                activeTab === 'admin' 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {activeTab === 'admin' ? 'Admin Login' : (isRegistering ? 'Create Account' : 'Login')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login