import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/admin/AdminContext'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const { aToken } = useContext(AdminContext)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    speciality: '',
    degree: '',
    experience: '',
    about: '',
    fees: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!aToken) {
      toast.error('Admin access required')
      return
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'password', 'speciality', 'degree', 'experience', 'about', 'fees']
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`)
        return
      }
    }

    if (!image) {
      toast.error('Please select a profile image')
      return
    }

    try {
      setLoading(true)
      
      const data = new FormData()
      data.append('name', formData.name)
      data.append('email', formData.email)
      data.append('password', formData.password)
      data.append('speciality', formData.speciality)
      data.append('degree', formData.degree)
      data.append('experience', formData.experience)
      data.append('about', formData.about)
      data.append('fees', formData.fees)
      data.append('address', JSON.stringify(formData.address))
      data.append('image', image)

      const response = await axios.post(`${backendUrl}/api/admin/add-doctor`, data, {
        headers: { aToken }
      })

      if (response.data.success) {
        toast.success('Doctor added successfully!')
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          speciality: '',
          degree: '',
          experience: '',
          about: '',
          fees: '',
          address: {
            street: '',
            city: '',
            state: '',
            pincode: ''
          }
        })
        setImage(null)
        document.getElementById('image-input').value = ''
      } else {
        toast.error(response.data.message || 'Failed to add doctor')
      }
    } catch (error) {
      console.error('Error adding doctor:', error)
      toast.error(error.response?.data?.message || 'Failed to add doctor')
    } finally {
      setLoading(false)
    }
  }

  if (!aToken) {
    return (
      <div className='bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Admin Access Required</h2>
        <p className='text-gray-600'>Please login as admin to add doctors.</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex items-center space-x-3'>
          <img src={assets.add_icon} alt="" className='w-8 h-8' />
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Add New Doctor</h1>
            <p className='text-gray-600'>Register a new doctor to the platform</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Basic Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>Basic Information</h3>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name *</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email *</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password *</label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                  minLength={8}
                />
                <p className='text-xs text-gray-500 mt-1'>Minimum 8 characters</p>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Profile Image *</label>
                <input
                  id='image-input'
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-gray-900 border-b pb-2'>Professional Information</h3>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Speciality *</label>
                <select
                  name='speciality'
                  value={formData.speciality}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  required
                >
                  <option value=''>Select Speciality</option>
                  <option value='Cardiologist'>Cardiologist</option>
                  <option value='Dermatologist'>Dermatologist</option>
                  <option value='Gastroenterologist'>Gastroenterologist</option>
                  <option value='General Physician'>General Physician</option>
                  <option value='Gynecologist'>Gynecologist</option>
                  <option value='Neurologist'>Neurologist</option>
                  <option value='Pediatrician'>Pediatrician</option>
                  <option value='Psychiatrist'>Psychiatrist</option>
                  <option value='Orthopedic'>Orthopedic</option>
                  <option value='Ophthalmologist'>Ophthalmologist</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Degree *</label>
                <input
                  type='text'
                  name='degree'
                  value={formData.degree}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  placeholder='e.g., MBBS, MD, MS'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Experience (Years) *</label>
                <input
                  type='number'
                  name='experience'
                  value={formData.experience}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  min='0'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Consultation Fees (₹) *</label>
                <input
                  type='number'
                  name='fees'
                  value={formData.fees}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  min='0'
                  required
                />
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>About Doctor *</label>
            <textarea
              name='about'
              value={formData.about}
              onChange={handleInputChange}
              rows={4}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              placeholder='Brief description about the doctor...'
              required
            />
          </div>

          {/* Address */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 border-b pb-2 mb-4'>Address</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Street</label>
                <input
                  type='text'
                  name='address.street'
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                <input
                  type='text'
                  name='address.city'
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
                <input
                  type='text'
                  name='address.state'
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Pincode</label>
                <input
                  type='text'
                  name='address.pincode'
                  value={formData.address.pincode}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={loading}
              className='bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2'
            >
              {loading ? (
                <>
                  <div className='inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                  <span>Adding Doctor...</span>
                </>
              ) : (
                <>
                  <img src={assets.add_icon} alt="" className='w-5 h-5' />
                  <span>Add Doctor</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDoctor