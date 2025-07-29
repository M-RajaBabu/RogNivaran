import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/admin/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    console.log('Admin Dashboard - aToken:', aToken)
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  console.log('Admin Dashboard - dashData:', dashData)

  if (!aToken) {
    return (
      <div className='bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Admin Access Required</h2>
        <p className='text-gray-600'>Please login as admin to access the dashboard.</p>
      </div>
    )
  }

  if (!dashData) {
    return (
      <div className='bg-white rounded-lg shadow-md p-8'>
        <div className='flex items-center justify-center'>
          <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
          <span className='ml-3 text-gray-600'>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-blue-100'>
              <img className='w-8 h-8' src={assets.doctor_icon} alt="" />
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>Total Doctors</p>
              <p className='text-2xl font-bold text-gray-900'>{dashData.doctors}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-green-100'>
              <img className='w-8 h-8' src={assets.appointments_icon} alt="" />
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>Total Appointments</p>
              <p className='text-2xl font-bold text-gray-900'>{dashData.appointments}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-purple-100'>
              <img className='w-8 h-8' src={assets.patients_icon} alt="" />
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>Total Patients</p>
              <p className='text-2xl font-bold text-gray-900'>{dashData.patients}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500'>
          <div className='flex items-center'>
            <div className='p-3 rounded-full bg-yellow-100'>
              <svg className='w-8 h-8 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-600'>Today's Appointments</p>
              <p className='text-2xl font-bold text-gray-900'>
                {dashData.latestAppointments?.filter(apt => {
                  const today = new Date().toDateString()
                  const aptDate = new Date(apt.slotDate).toDateString()
                  return aptDate === today
                }).length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className='bg-white rounded-lg shadow-md'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <div className='flex items-center space-x-3'>
            <img src={assets.list_icon} alt="" className='w-6 h-6' />
            <h3 className='text-lg font-semibold text-gray-900'>Latest Appointments</h3>
          </div>
          <span className='text-sm text-gray-500'>
            Showing {Math.min(dashData.latestAppointments?.length || 0, 5)} of {dashData.latestAppointments?.length || 0}
          </span>
        </div>

        <div className='divide-y divide-gray-200'>
          {dashData.latestAppointments?.slice(0, 5).map((item, index) => (
            <div className='flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200' key={index}>
              <div className='flex items-center space-x-4'>
                <img 
                  className='w-12 h-12 rounded-full object-cover' 
                  src={item.docData?.image || assets.doc1} 
                  alt={item.docData?.name} 
                />
                <div>
                  <p className='font-medium text-gray-900'>{item.docData?.name || 'Unknown Doctor'}</p>
                  <p className='text-sm text-gray-600'>
                    {item.userData?.name || 'Unknown Patient'} • {slotDateFormat(item.slotDate)}
                  </p>
                </div>
              </div>
              
              <div className='flex items-center space-x-3'>
                {item.cancelled ? (
                  <span className='px-3 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full'>Cancelled</span>
                ) : item.isCompleted ? (
                  <span className='px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full'>Completed</span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200'
                    title='Cancel Appointment'
                  >
                    <img className='w-5 h-5' src={assets.cancel_icon} alt="Cancel" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard