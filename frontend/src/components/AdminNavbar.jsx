import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/admin/AdminContext'

const AdminNavbar = () => {
  const navigate = useNavigate()
  const { setAToken } = useContext(AdminContext)

  const handleLogout = () => {
    localStorage.removeItem('aToken')
    setAToken('')
    navigate('/login')
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: assets.home_icon },
    { name: 'Doctors', path: '/admin/doctors-list', icon: assets.doctor_icon },
    { name: 'Patients', path: '/admin/patients-list', icon: assets.patients_icon },
    { name: 'Appointments', path: '/admin/all-appointments', icon: assets.appointments_icon },
    { name: 'Add Doctor', path: '/admin/add-doctor', icon: assets.add_icon }
  ]

  return (
    <div className='bg-white shadow-md border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo and Brand */}
          <div className='flex items-center space-x-4'>
            <img src={assets.logo} alt="RogNivaran" className='h-10' />
            <h1 className='text-xl font-bold text-gray-800'>Admin Panel</h1>
          </div>

          {/* Navigation Links */}
          <nav className='hidden md:flex space-x-8'>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className='flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200'
              >
                <img src={item.icon} alt="" className='w-5 h-5' />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className='flex items-center space-x-4'>
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200'
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className='md:hidden py-4'>
          <div className='flex flex-wrap gap-2'>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className='flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary transition-colors duration-200'
              >
                <img src={item.icon} alt="" className='w-4 h-4' />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar 