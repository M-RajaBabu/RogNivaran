import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const DoctorProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [showPasswordChange, setShowPasswordChange] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [doctorInfo, setDoctorInfo] = useState(null)

    const { token, backendUrl } = useContext(AppContext)

    // Load doctor profile data
    const loadDoctorProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { token } })
            if (data.success) {
                setDoctorInfo(data.doctorData)
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to load profile')
        }
    }

    // Function to update doctor profile data
    const updateDoctorProfile = async () => {
        try {
            // Validate required fields
            if (!doctorInfo.name || !doctorInfo.speciality || !doctorInfo.degree || !doctorInfo.experience || !doctorInfo.about || !doctorInfo.fees) {
                toast.error('Please fill in all required fields')
                return
            }

            console.log('Updating doctor profile with data:', doctorInfo)
            
            const formData = new FormData();

            formData.append('name', doctorInfo.name)
            formData.append('speciality', doctorInfo.speciality)
            formData.append('degree', doctorInfo.degree)
            formData.append('experience', doctorInfo.experience)
            formData.append('about', doctorInfo.about)
            formData.append('fees', doctorInfo.fees)
            formData.append('address', JSON.stringify(doctorInfo.address))

            if (image) {
                formData.append('image', image)
                console.log('Image file added:', image.name)
            }

            console.log('Sending request to:', backendUrl + '/api/doctor/update-profile')
            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', formData, { headers: { token } })

            console.log('Response received:', data)

            if (data.success) {
                toast.success(data.message)
                await loadDoctorProfile()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log('Doctor profile update error:', error)
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
            const { data } = await axios.post(backendUrl + '/api/doctor/change-password', {
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

    useEffect(() => {
        if (token) {
            loadDoctorProfile()
        }
    }, [token])

    if (!doctorInfo) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <div className='max-w-4xl mx-auto p-6'>
            <div className='bg-white rounded-lg shadow-lg p-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>Doctor Profile</h1>

                {/* Profile Header */}
                <div className='flex flex-col md:flex-row gap-8 mb-8'>
                    {/* Profile Image */}
                    <div className='flex-shrink-0'>
                        {isEdit ? (
                            <label htmlFor='image' className='cursor-pointer'>
                                <div className='relative'>
                                    <img 
                                        className='w-40 h-40 rounded-full object-cover border-4 border-primary/20 hover:border-primary transition-colors' 
                                        src={image ? URL.createObjectURL(image) : doctorInfo.image} 
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
                                src={doctorInfo.image} 
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
                                    onChange={(e) => setDoctorInfo(prev => ({ ...prev, name: e.target.value }))} 
                                    value={doctorInfo.name} 
                                />
                            ) : (
                                <h2 className='text-3xl font-bold text-gray-800'>{doctorInfo.name}</h2>
                            )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                            <div>
                                <span className='font-medium text-gray-600'>Speciality:</span>
                                <span className='ml-2 text-gray-800'>{doctorInfo.speciality}</span>
                            </div>
                            <div>
                                <span className='font-medium text-gray-600'>Experience:</span>
                                <span className='ml-2 text-gray-800'>{doctorInfo.experience}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional Information */}
                <div className='mb-8'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b pb-2'>Professional Information</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>Email</label>
                            <p className='text-blue-600 font-medium'>{doctorInfo.email}</p>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>Speciality</label>
                            {isEdit ? (
                                <input 
                                    className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                    type="text" 
                                    onChange={(e) => setDoctorInfo(prev => ({ ...prev, speciality: e.target.value }))} 
                                    value={doctorInfo.speciality} 
                                />
                            ) : (
                                <p className='text-gray-800'>{doctorInfo.speciality}</p>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>Degree</label>
                            {isEdit ? (
                                <input 
                                    className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                    type="text" 
                                    onChange={(e) => setDoctorInfo(prev => ({ ...prev, degree: e.target.value }))} 
                                    value={doctorInfo.degree} 
                                />
                            ) : (
                                <p className='text-gray-800'>{doctorInfo.degree}</p>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>Experience</label>
                            {isEdit ? (
                                <input 
                                    className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                    type="text" 
                                    onChange={(e) => setDoctorInfo(prev => ({ ...prev, experience: e.target.value }))} 
                                    value={doctorInfo.experience} 
                                />
                            ) : (
                                <p className='text-gray-800'>{doctorInfo.experience}</p>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>Consultation Fee</label>
                            {isEdit ? (
                                <input 
                                    className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                    type="number" 
                                    onChange={(e) => setDoctorInfo(prev => ({ ...prev, fees: parseInt(e.target.value) }))} 
                                    value={doctorInfo.fees} 
                                />
                            ) : (
                                <p className='text-gray-800'>₹{doctorInfo.fees}</p>
                            )}
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>Availability</label>
                            <p className='text-gray-800'>
                                <span className={`inline-block px-2 py-1 rounded text-xs ${doctorInfo.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {doctorInfo.available ? 'Available' : 'Not Available'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className='mb-8'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b pb-2'>About</h3>
                    <div>
                        {isEdit ? (
                            <textarea 
                                className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary h-32 resize-none' 
                                onChange={(e) => setDoctorInfo(prev => ({ ...prev, about: e.target.value }))} 
                                value={doctorInfo.about}
                                placeholder="Tell patients about your expertise and experience..."
                            />
                        ) : (
                            <p className='text-gray-800 leading-relaxed'>{doctorInfo.about}</p>
                        )}
                    </div>
                </div>

                {/* Address Information */}
                <div className='mb-8'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b pb-2'>Clinic Address</h3>
                    <div className='md:col-span-2'>
                        {isEdit ? (
                            <div className='space-y-2'>
                                <input 
                                    className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                    type="text" 
                                    placeholder="Address Line 1"
                                    onChange={(e) => setDoctorInfo(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                    value={doctorInfo.address.line1} 
                                />
                                <input 
                                    className='w-full bg-gray-50 px-3 py-2 rounded border focus:outline-none focus:border-primary' 
                                    type="text" 
                                    placeholder="Address Line 2"
                                    onChange={(e) => setDoctorInfo(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                    value={doctorInfo.address.line2} 
                                />
                            </div>
                        ) : (
                            <p className='text-gray-800'>
                                {doctorInfo.address.line1}<br />
                                {doctorInfo.address.line2}
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-wrap gap-4'>
                    {isEdit ? (
                        <>
                            <button 
                                onClick={updateDoctorProfile} 
                                className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                            >
                                Save Changes
                            </button>
                            <button 
                                onClick={() => {
                                    setIsEdit(false)
                                    setImage(false)
                                    loadDoctorProfile()
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
    )
}

export default DoctorProfile 