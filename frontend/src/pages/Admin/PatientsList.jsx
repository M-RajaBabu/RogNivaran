import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/admin/AdminContext'
import { assets } from '../../assets/assets'

const PatientsList = () => {
  const { aToken, getAllPatients } = useContext(AdminContext)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (aToken) {
      fetchPatients()
    }
  }, [aToken])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const response = await getAllPatients()
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
      <div className='m-5'>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>Admin Access Required</h2>
          <p className='text-gray-600'>Please login as admin to access patient data.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='m-5'>
      <div className='bg-white rounded-lg shadow-md'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b'>
          <div className='flex items-center space-x-3'>
            <img src={assets.patients_icon} alt="" className='w-8 h-8' />
            <h1 className='text-2xl font-bold text-gray-800'>All Patients</h1>
            <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
              {patients.length} Patients
            </span>
          </div>
          
          {/* Search */}
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search patients...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              />
              <svg className='absolute left-3 top-2.5 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            <button
              onClick={fetchPatients}
              className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200'
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className='p-8 text-center'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
            <p className='mt-2 text-gray-600'>Loading patients...</p>
          </div>
        )}

        {/* Patients List */}
        {!loading && (
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
                  <tr key={patient._id || index} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-10 w-10'>
                          <img
                            className='h-10 w-10 rounded-full'
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
        )}

        {/* Empty State */}
        {!loading && filteredPatients.length === 0 && (
          <div className='p-8 text-center'>
            <img src={assets.patients_icon} alt="" className='w-16 h-16 mx-auto mb-4 opacity-50' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No patients found</h3>
            <p className='text-gray-500'>
              {searchTerm ? 'Try adjusting your search terms.' : 'No patients have registered yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientsList 