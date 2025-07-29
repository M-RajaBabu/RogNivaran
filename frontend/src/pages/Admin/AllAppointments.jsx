import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/admin/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    if (aToken) {
      fetchAppointments()
    }
  }, [aToken])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      await getAllAppointments()
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId)
      await fetchAppointments() // Refresh the list
    } catch (error) {
      console.error('Error cancelling appointment:', error)
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.docData?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.userData?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.userData?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'cancelled' && appointment.cancelled) ||
      (filterStatus === 'completed' && appointment.isCompleted) ||
      (filterStatus === 'pending' && !appointment.cancelled && !appointment.isCompleted)
    
    return matchesSearch && matchesStatus
  })

  if (!aToken) {
    return (
      <div className='bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Admin Access Required</h2>
        <p className='text-gray-600'>Please login as admin to access appointment data.</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0'>
          <div className='flex items-center space-x-3'>
            <img src={assets.appointments_icon} alt="" className='w-8 h-8' />
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>All Appointments</h1>
              <p className='text-gray-600'>{appointments.length} appointments total</p>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search appointments...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64'
              />
              <svg className='absolute left-3 top-2.5 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            >
              <option value='all'>All Status</option>
              <option value='pending'>Pending</option>
              <option value='completed'>Completed</option>
              <option value='cancelled'>Cancelled</option>
            </select>
            
            <button
              onClick={fetchAppointments}
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
            <span className='ml-3 text-gray-600'>Loading appointments...</span>
          </div>
        </div>
      )}

      {/* Appointments List */}
      {!loading && (
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Appointment</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Patient</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date & Time</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredAppointments.map((appointment, index) => (
                  <tr key={appointment._id || index} className='hover:bg-gray-50 transition-colors duration-200'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <img 
                          className='w-10 h-10 rounded-full object-cover' 
                          src={appointment.docData?.image || assets.doc1} 
                          alt={appointment.docData?.name} 
                        />
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>{appointment.docData?.name || 'Unknown Doctor'}</div>
                          <div className='text-sm text-gray-500'>{appointment.docData?.speciality || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>{appointment.userData?.name || 'Unknown Patient'}</div>
                      <div className='text-sm text-gray-500'>{appointment.userData?.email || 'N/A'}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {slotDateFormat(appointment.slotDate)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {appointment.cancelled ? (
                        <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800'>
                          Cancelled
                        </span>
                      ) : appointment.isCompleted ? (
                        <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'>
                          Completed
                        </span>
                      ) : (
                        <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                          Pending
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      {!appointment.cancelled && !appointment.isCompleted && (
                        <button
                          onClick={() => handleCancelAppointment(appointment._id)}
                          className='text-red-600 hover:text-red-900 transition-colors duration-200'
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredAppointments.length === 0 && (
        <div className='bg-white rounded-lg shadow-md p-8'>
          <div className='text-center'>
            <img src={assets.appointments_icon} alt="" className='w-16 h-16 mx-auto mb-4 opacity-50' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No appointments found</h3>
            <p className='text-gray-500'>
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'No appointments have been booked yet.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllAppointments