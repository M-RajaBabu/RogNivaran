import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { specialityData } from '../assets/assets'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext)

  // Get specialities from assets.js
  const specialities = specialityData.map(item => item.speciality);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='py-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
          {speciality ? `${speciality} Doctors` : 'All Doctors'}
        </h1>
        <p className='text-lg text-gray-600'>
          Browse through our trusted doctors and specialists.
        </p>
      </div>

      <div className='flex flex-col lg:flex-row gap-6 sm:gap-8'>
        
        {/* Filters Sidebar */}
        <div className='lg:w-80 lg:flex-shrink-0'>
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowFilter(!showFilter)} 
            className={`lg:hidden w-full py-3 px-4 border rounded-xl text-sm font-medium transition-all mb-4 ${
              showFilter 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className='flex items-center justify-between'>
              <span>{showFilter ? 'Hide Filters' : 'Show Filters'}</span>
              <svg className={`w-5 h-5 transition-transform ${showFilter ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </div>
          </button>

          {/* Filter Sidebar */}
          <div className={`${showFilter ? 'block' : 'hidden'} lg:block`}>
            <div className='bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Specialities</h3>
              <div className='space-y-2'>
                <button
                  onClick={() => navigate('/doctors')}
                  className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm font-medium transition-all ${
                    !speciality 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Specialities
                </button>
                {specialities.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => navigate(`/doctors/${spec}`)}
                    className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm font-medium transition-all ${
                      speciality === spec 
                        ? 'bg-primary text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className='flex-1'>
          {filterDoc.length === 0 ? (
            <div className='text-center py-8 sm:py-12'>
              <div className='w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-10 h-10 sm:w-12 sm:h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
              <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-2'>No Doctors Found</h3>
              <p className='text-gray-600 text-sm sm:text-base'>Try selecting a different speciality or check back later.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
          {filterDoc.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => { 
                    navigate(`/appointment/${item._id}`); 
                    window.scrollTo(0, 0) 
                  }} 
                  className='group bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'
                >
                  {/* Doctor Image */}
                  <div className='relative h-64 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden'>
                    <img 
                      className='w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500' 
                      src={item.image} 
                      alt={item.name}
                      style={{ objectPosition: 'center 20%' }}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent'></div>
                    
                    {/* Availability Badge */}
                    <div className='absolute top-4 right-4'>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        item.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          item.available ? 'bg-green-500' : 'bg-gray-500'
                        }`}></span>
                        {item.available ? 'Available' : 'Not Available'}
                      </span>
                    </div>

                    {/* Speciality Badge */}
                    <div className='absolute bottom-4 left-4'>
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800'>
                        {item.speciality}
                      </span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className='p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300'>
                      {item.name}
                    </h3>
                    <p className='text-gray-600 mb-3'>{item.speciality}</p>
                    
                    <div className='flex items-center justify-between mb-4'>
                      <div className='flex items-center gap-2'>
                        <svg className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                        <span className='text-sm text-gray-600'>4.8 (120 reviews)</span>
                      </div>
                      <span className='text-lg font-bold text-primary'>₹{item.fees}</span>
                    </div>

                    <button className='w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-300'>
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors