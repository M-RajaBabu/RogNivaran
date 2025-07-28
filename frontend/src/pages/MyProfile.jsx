import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [showPasswordChange, setShowPasswordChange] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [prescriptions, setPrescriptions] = useState([])
    const [newPrescription, setNewPrescription] = useState('')

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Calculate age from DOB
    const calculateAge = (dob) => {
        if (!dob || dob === 'Not Selected') return 'Not Set'
        const today = new Date()
        const birthDate = new Date(dob)
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        try {
            // Validate required fields
            if (!userData.name || !userData.phone || !userData.dob || !userData.gender) {
                toast.error('Please fill in all required fields')
                return
            }

            console.log('Updating user profile with data:', userData)

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            if (image) {
                formData.append('image', image)
                console.log('Image file added:', image.name)
            }

            console.log('Sending request to:', backendUrl + '/api/user/update-profile')
            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            console.log('Response received:', data)

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log('Profile update error:', error)
            console.log('Error response:', error.response?.data)
            toast.error(error.response?.data?.message || 'Update failed')
        }
    }

    // Function to change password
    const changePassword = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const currentPassword = formData.get('currentPassword')
        const newPassword = formData.get('newPassword')
        const confirmPassword = formData.get('confirmPassword')

        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match')
            return
        }

        if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters long')
            return
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/user/change-password', {
                currentPassword,
                newPassword
            }, { headers: { token } })

            if (data.success) {
                toast.success('Password changed successfully')
                setShowPasswordChange(false)
                e.target.reset()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Password change failed')
        }
    }

    // Function to add prescription
    const addPrescription = async () => {
        if (!newPrescription.trim()) {
            toast.error('Please enter prescription details')
            return
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/user/add-prescription', {
                prescription: newPrescription
            }, { headers: { token } })

            if (data.success) {
                toast.success('Prescription added successfully')
                setNewPrescription('')
                loadPrescriptions()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Failed to add prescription')
        }
    }

    // Function to load prescriptions
    const loadPrescriptions = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/prescriptions', { headers: { token } })
            if (data.success) {
                setPrescriptions(data.prescriptions)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Function to delete prescription
    const deletePrescription = async (prescriptionId) => {
        try {
            const { data } = await axios.delete(backendUrl + `/api/user/prescription/${prescriptionId}`, { headers: { token } })
            if (data.success) {
                toast.success('Prescription deleted successfully')
                loadPrescriptions()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to delete prescription')
        }
    }

    useEffect(() => {
        if (token) {
            loadPrescriptions()
        }
    }, [token])

    return userData ? (
        <div className='max-w-4xl mx-auto p-6'>
            <div className='bg-white rounded-lg shadow-lg p-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>My Profile</h1>

                {/* Profile Header */}
                <div className='flex flex-col md:flex-row gap-8 mb-8'>
                    {/* Profile Image */}
                    <div className='flex-shrink-0'>
                        {isEdit ? (
                            <label htmlFor='image' className='cursor-pointer'>
                                <div className='relative'>
                                    <img 
                                        className='w-40 h-40 rounded-full object-cover border-4 border-primary/20 hover:border-primary transition-colors' 
                                        src={image ? URL.createObjectURL(image) : userData.image} 
                                        alt="Profile" 
                                    />
                                    <div className='absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                                        <img className='w-8 h-8' src={assets.upload_icon} alt="Upload" />
                                    </div>
                                </div>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
                            </label>
                        ) : (
                            <img 
                                className='w-40 h-40 rounded-full object-cover border-4 border-primary/20' 
                                src={userData.image} 
                                alt="Profile" 
                            />
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className='flex-1'>
                        <div className='mb-4'>
                            {isEdit ? (
                                <input 
                                    className='text-3xl font-bold text-gray-800 bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                    type="text" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                    value={userData.name} 
                                />
                            ) : (
                                <h2 className='text-3xl font-bold text-gray-800'>{userData.name}</h2>
                            )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                            <div>
                                <span className='font-medium text-gray-600'>Age:</span>
                                <span className='ml-2 text-gray-800'>{calculateAge(userData.dob)} years</span>
                            </div>
                            <div>
                                <span className='font-medium text-gray-600'>Gender:</span>
                                <span className='ml-2 text-gray-800'>{userData.gender}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className='mb-8'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b pb-2'>Contact Information</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>Email</label>
                            <p className='text-blue-600 font-medium'>{userData.email}</p>
            </div>
            <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>Phone</label>
                            {isEdit ? (
                                <input 
                                    className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                    type="tel" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                    value={userData.phone} 
                                />
                            ) : (
                                <p className='text-blue-600 font-medium'>{userData.phone}</p>
                            )}
                        </div>
                        <div className='md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>Address</label>
                            {isEdit ? (
                                <div className='space-y-2'>
                                    <input 
                                        className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                        type="text" 
                                        placeholder="Address Line 1"
                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                        value={userData.address.line1} 
                                    />
                                    <input 
                                        className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                        type="text" 
                                        placeholder="Address Line 2"
                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                        value={userData.address.line2} 
                                    />
                                </div>
                            ) : (
                                <p className='text-gray-800'>
                                    {userData.address.line1}<br />
                                    {userData.address.line2}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Basic Information */}
                <div className='mb-8'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b pb-2'>Basic Information</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>Gender</label>
                            {isEdit ? (
                                <select 
                                    className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                    value={userData.gender}
                                >
                                    <option value="Not Selected">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                        </select>
                            ) : (
                                <p className='text-gray-800'>{userData.gender}</p>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>Date of Birth</label>
                            {isEdit ? (
                                <input 
                                    className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                    type='date' 
                                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                    value={userData.dob} 
                                />
                            ) : (
                                <p className='text-gray-800'>{userData.dob}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Prescriptions Section */}
                <div className='mb-8'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b pb-2'>Medical Prescriptions</h3>
                    
                    {/* Add New Prescription */}
                    <div className='mb-4 p-4 bg-gray-50 rounded-lg'>
                        <div className='flex gap-2'>
                            <input 
                                type="text" 
                                placeholder="Add new prescription..."
                                value={newPrescription}
                                onChange={(e) => setNewPrescription(e.target.value)}
                                className='flex-1 px-3 py-2 rounded border focus:outline-none focus:border-primary'
                            />
                            <button 
                                onClick={addPrescription}
                                className='px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors'
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Prescriptions List */}
                    <div className='space-y-3'>
                        {prescriptions.map((prescription, index) => (
                            <div key={index} className='flex items-center justify-between p-3 bg-white border rounded-lg'>
                                <div className='flex-1'>
                                    <p className='text-gray-800'>{prescription.prescription}</p>
                                    <p className='text-sm text-gray-500 mt-1'>
                                        Added on: {new Date(prescription.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => deletePrescription(prescription._id)}
                                    className='ml-4 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors'
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                        {prescriptions.length === 0 && (
                            <p className='text-gray-500 text-center py-4'>No prescriptions added yet</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-wrap gap-4'>
                    {isEdit ? (
                        <>
                            <button 
                                onClick={updateUserProfileData} 
                                className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                            >
                                Save Changes
                            </button>
                            <button 
                                onClick={() => {
                                    setIsEdit(false)
                                    setImage(false)
                                    loadUserProfileData()
                                }} 
                                className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={() => setIsEdit(true)} 
                                className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                            >
                                Edit Profile
                            </button>
                            <button 
                                onClick={() => setShowPasswordChange(true)} 
                                className='px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors'
                            >
                                Change Password
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Password Change Modal */}
            {showPasswordChange && (
                <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg p-8 max-w-md w-full mx-4'>
                        <h3 className='text-xl font-semibold text-gray-800 mb-4'>Change Password</h3>
                        <form onSubmit={changePassword} className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-2'>Current Password</label>
                                <div className='relative'>
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        name='currentPassword'
                                        required
                                        className='w-full px-3 py-2 border rounded focus:outline-none focus:border-primary'
                                    />
                                    <button 
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute right-3 top-2.5 text-gray-500 hover:text-gray-700'
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-2'>New Password</label>
                                <input 
                                    type='password'
                                    name='newPassword'
                                    required
                                    minLength={8}
                                    className='w-full px-3 py-2 border rounded focus:outline-none focus:border-primary'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-600 mb-2'>Confirm New Password</label>
                                <input 
                                    type='password'
                                    name='confirmPassword'
                                    required
                                    minLength={8}
                                    className='w-full px-3 py-2 border rounded focus:outline-none focus:border-primary'
                                />
                            </div>
                            <div className='flex gap-3 pt-4'>
                                <button 
                                    type='submit'
                                    className='flex-1 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors'
                                >
                                    Change Password
                                </button>
                                <button 
                                    type='button'
                                    onClick={() => setShowPasswordChange(false)}
                                    className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors'
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
            </div>
            )}
        </div>
    ) : null
}

export default MyProfile