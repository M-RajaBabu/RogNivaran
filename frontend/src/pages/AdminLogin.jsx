import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { backendUrl, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setToken(data.token)
          localStorage.setItem('token', data.token)
          toast.success('Admin login successful!')
          navigate('/admin/dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setToken(data.token)
          localStorage.setItem('token', data.token)
          toast.success('Doctor login successful!')
          navigate('/doctor/dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className='mx-auto h-12 w-12 bg-primary rounded-full flex items-center justify-center'>
            <span className='text-white text-xl font-bold'>R</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {state} Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your dashboard
          </p>
        </div>
        
        <form onSubmit={onSubmitHandler} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input 
                id="email"
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent' 
                type="email" 
                required 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input 
                id="password"
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent' 
                type="password" 
                required 
              />
            </div>
          </div>
          
          <button className='w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200'>
            Login
          </button>
          
          <div className="text-center">
            {state === 'Admin' ? (
              <p className="text-sm text-gray-600">
                Doctor Login?{' '}
                <button
                  type="button"
                  onClick={() => setState('Doctor')}
                  className="font-medium text-primary hover:text-primary/80 underline"
                >
                  Click here
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Admin Login?{' '}
                <button
                  type="button"
                  onClick={() => setState('Admin')}
                  className="font-medium text-primary hover:text-primary/80 underline"
                >
                  Click here
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin