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
        timeout: 10000 // 10 second timeout
      })
      
      console.log(`${activeTab} ${activeTab === 'admin' ? 'login' : (isRegistering ? 'registration' : 'login')} response:`, response.data)

      if (response.data.success) {
        localStorage.setItem('token', response.data.token)
        setToken(response.data.token)
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
      
      if (error.response) {
        // Server responded with error status
        console.error('Error response:', error.response.data)
        toast.error(error.response.data?.message || `Server error: ${error.response.status}`)
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request)
        toast.error('No response from server. Please check your connection.')
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

  const tabs = [
    { id: 'patient', label: 'Patient/User', icon: '👤' },
    { id: 'doctor', label: 'Doctor', icon: '👨‍⚕️' },
    { id: 'admin', label: 'Admin', icon: '👨‍💼' }
  ]

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
              type='button'
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
              type='button'
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

          {/* Registration/Login Toggle - Only for patient and doctor */}
          {activeTab !== 'admin' && (
            <div className='flex bg-gray-50 rounded-lg p-1 mb-6'>
              <button
                type='button'
                onClick={() => setIsRegistering(false)}
                className={`