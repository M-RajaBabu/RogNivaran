import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Login = () => {
  console.log('Login component is rendering!') // Debug log

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

  // Debug: Log the backendUrl to see if it's defined
  console.log('Backend URL:', backendUrl)
  console.log('Token:', token)
  console.log('AppContext loaded successfully')

  // Test backend connection
  useEffect(() => {
    console.log('Login useEffect running')
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
        endpoint = '/api/admin/login'
        data = { email, password }
      }

      console.log(`Attempting ${isRegistering ? 'registration' : 'login'} for ${activeTab}...`)
      const response = await axios.post(backendUrl + endpoint, data)
      console.log(`${activeTab} ${isRegistering ? 'registration' : 'login'} response:`, response.data)

      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        setToken(response.data.token)
        toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ${isRegistering ? 'registration' : 'login'} successful!`)
        
        // Navigate based on user type
        if (activeTab === 'patient') {
          navigate('/')
        } else if (activeTab === 'doctor') {
          navigate('/doctor/dashboard')
        } else if (activeTab === 'admin') {
          navigate('/admin/dashboard')
        }
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(`${activeTab} ${isRegistering ? 'registration' : 'login'} error:`, error)
      toast.error(error.response?.data?.message || error.message || `${activeTab} ${isRegistering ? 'registration' : 'login'} failed`)
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

  const tabs = [
    { id: 'patient', label: 'Patient/User', icon: '👤' },
    { id: 'doctor', label: 'Doctor', icon: '👨‍⚕️' },
    { id: 'admin', label: 'Admin', icon: '👨‍💼' }
  ]

  console.log('About to render login form') // Debug log

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
              onClick={() => setActiveTab('patient')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                activeTab === 'patient' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setActiveTab('doctor')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                activeTab === 'doctor' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Doctor
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                activeTab === 'admin' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Registration/Login Toggle */}
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

          {/* Form Fields */}
          <div className='space-y-4'>
            {/* Name field for registration */}
            {(isRegistering || activeTab === 'admin') && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  {activeTab === 'admin' ? 'Admin Name' : 'Full Name'}
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
        </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200 mt-6'
          >
            {isRegistering ? 'Create Account' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login