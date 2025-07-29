import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/admin/AdminContext'
import { assets } from '../../assets/assets'

const DoctorsList = () => {
  const { aToken, doctors, getAllDoctors, changeAvailability } = useContext(AdminContext)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpeciality, setFilterSpeciality] = useState('all')

  useEffect(() => {
    console.log('DoctorsList - aToken:', aToken)
    if (aToken) {
      fetchDoctors()
    }
  }, [aToken])

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      console.log('Fetching doctors...')
      await getAllDoctors()
      console.log('Doctors fetched:', doctors)
    } catch (error) {
      console.error('Error fetching doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAvailabilityChange = async (docId) => {
    try {
      await changeAvailability(docId)
      await fetchDoctors() // Refresh the list
    } catch (error) {
      console.error('Error changing availability:', error)
    }
  }

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.speciality?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpeciality = filterSpeciality === 'all' || doctor.speciality === filterSpeciality
    return matchesSearch && matchesSpeciality
  })

  const specialities = [...new Set(doctors.map(doctor => doctor.speciality).filter(Boolean))]

  if (!aToken) {
    return (
      <div className='bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Admin Access Required</h2>
        <p className='text-gray-600'>Please login as admin to access doctor data.</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0'>
          <div className='flex items-center space-x-3'>
            <img src={assets.doctor_icon} alt="" className='w-8 h-8' />
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>All Doctors</h1>
              <p className='text-gray-600'>{doctors.length} doctors registered</p>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search doctors...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64'
              />
              <svg className='absolute left-3 top-2.5 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            
            <select
              value={filterSpeciality}
              onChange={(e) => setFilterSpeciality(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            >
              <option value='all'>All Specialities</option>
              {specialities.map(speciality => (
                <option key={speciality} value={speciality}>{speciality}</option>
              ))}
            </select>
            
            <button
              onClick={fetchDoctors}
              className='bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200'
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className='bg-white rounded-lg shadow-md p-8'>
          <div className='flex items-center justify-center'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            <span className='ml-3 text-gray-600'>Loading doctors...</span>
          </div>
        </div>
      )}

      {/* Doctors Grid */}
      {!loading && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredDoctors.map((doctor, index) => (
            <div key={doctor._id || index} className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden'>
              <div className='p-6'>
                <div className='flex items-start space-x-4'>
                  <img
                    src={doctor.image || assets.doc1}
                    alt={doctor.name}
                    className='w-16 h-16 rounded-full object-cover flex-shrink-0'
                  />
                  <div className='flex-1 min-w-0'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-1 truncate'>{doctor.name}</h3>
                    <p className='text-sm text-gray-600 mb-2'>{doctor.speciality}</p>
                    <p className='text-sm text-gray-500 mb-2'>{doctor.degree}</p>
                    <p className='text-sm text-gray-500 mb-3'>{doctor.experience} years experience</p>
                    
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <span className='text-lg font-bold text-primary'>₹{doctor.fees}</span>
                        <span className='text-sm text-gray-500'>consultation</span>
                      </div>
                      
                      <button
                        onClick={() => handleAvailabilityChange(doctor._id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                          doctor.isAvailable 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {doctor.isAvailable ? 'Available' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {doctor.about && (
                  <div className='mt-4 pt-4 border-t border-gray-200'>
                    <p className='text-sm text-gray-600 line-clamp-2'>{doctor.about}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredDoctors.length === 0 && (
        <div className='bg-white rounded-lg shadow-md p-8'>
          <div className='text-center'>
            <img src={assets.doctor_icon} alt="" className='w-16 h-16 mx-auto mb-4 opacity-50' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No doctors found</h3>
            <p className='text-gray-500'>
              {searchTerm || filterSpeciality !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'No doctors have been added yet.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorsList