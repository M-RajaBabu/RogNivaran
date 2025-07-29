import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/admin/AdminContext'
import { assets } from '../../assets/assets'

const PatientsList = () => {
  const { aToken, getAllPatients } = useContext(AdminContext)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log('PatientsList - aToken:', aToken)
    if (aToken) {
      fetchPatients()
    }
  }, [aToken])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      console.log('Fetching patients...')
      const response = await getAllPatients()
      console.log('Patients fetched:', response)
      setPatients(response || [])
    } catch (error) {
      console.error('Error fetching patients:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!aToken) {
    return (
      <div className='bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Admin Access Required</h2>
        <p className='text-gray-600'>Please login as admin to access patient data.</p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0'>
          <div className='flex items-center space-x-3'>
            <img src={assets.patients_icon} alt="" className='w-8 h-8' />
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>All Patients</h1>
              <p className='text-gray-600'>{patients.length} patients registered</p>
            </div>
          </div>
          
          {/* Search */}
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search patients...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64'
              />
              <svg className='absolute left-3 top-2.5 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            <button
              onClick={fetchPatients}
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
            <span className='ml-3 text-gray-600'>Loading patients...</span>
          </div>
        </div>
      )}

      {/* Patients List */}
      {!loading && (
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Patient</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Phone</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Joined Date</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredPatients.map((patient, index) => (
                  <tr key={patient._id || index} className='hover:bg-gray-50 transition-colors duration-200'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-10 w-10'>
                          <img
                            className='h-10 w-10 rounded-full object-cover'
                            src={patient.profilePic || assets.profile_pic}
                            alt={patient.name}
                          />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>{patient.name || 'N/A'}</div>
                          <div className='text-sm text-gray-500'>ID: {patient._id?.slice(-8) || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {patient.email || 'N/A'}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {patient.phone || 'N/A'}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {patient.date ? new Date(patient.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'>
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredPatients.length === 0 && (
        <div className='bg-white rounded-lg shadow-md p-8'>
          <div className='text-center'>
            <img src={assets.patients_icon} alt="" className='w-16 h-16 mx-auto mb-4 opacity-50' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No patients found</h3>
            <p className='text-gray-500'>
              {searchTerm ? 'Try adjusting your search terms.' : 'No patients have registered yet.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientsList 