import React, { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AdminContext } from '../context/admin/AdminContext'
import { assets } from '../assets/assets'

const AdminLayout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setAToken } = useContext(AdminContext)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('aToken')
    setAToken('')
    navigate('/login')
  }

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: assets.home_icon,
      description: 'Overview & Statistics'
    },
    { 
      name: 'Doctors', 
      path: '/admin/doctors-list', 
      icon: assets.doctor_icon,
      description: 'Manage Doctors'
    },
    { 
      name: 'Patients', 
      path: '/admin/patients-list', 
      icon: assets.patients_icon,
      description: 'View All Patients'
    },
    { 
      name: 'Appointments', 
      path: '/admin/all-appointments', 
      icon: assets.appointments_icon,
      description: 'Manage Bookings'
    },
    { 
      name: 'Add Doctor', 
      path: '/admin/add-doctor', 
      icon: assets.add_icon,
      description: 'Add New Doctor'
    }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary to-blue-600'>
            <div className='flex items-center space-x-3'>
              <img src={assets.logo} alt="RogNivaran" className='h-10 w-auto' />
              <div>
                <h1 className='text-lg font-bold text-white'>Admin Panel</h1>
                <p className='text-xs text-white/80'>Healthcare Management</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className='lg:hidden p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-4 py-6 space-y-2 overflow-y-auto'>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                }`}
              >
                <img src={item.icon} alt="" className='w-5 h-5 flex-shrink-0' />
                <div className='flex-1 min-w-0'>
                  <div className='font-medium truncate'>{item.name}</div>
                  <div className='text-xs opacity-75 truncate'>{item.description}</div>
                </div>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className='p-4 border-t border-gray-200 bg-gray-50'>
            <button
              onClick={handleLogout}
              className='w-full flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className='lg:pl-72'>
        {/* Top bar */}
        <div className='bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30'>
          <div className='flex items-center justify-between px-4 py-4 lg:px-8'>
            <div className='flex items-center space-x-4'>
              <button
                onClick={() => setSidebarOpen(true)}
                className='lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              </button>
              <div>
                <h2 className='text-xl font-semibold text-gray-900'>
                  {navItems.find(item => isActive(item.path))?.name || 'Admin Panel'}
                </h2>
                <p className='text-sm text-gray-500'>
                  {navItems.find(item => isActive(item.path))?.description || 'Healthcare Management System'}
                </p>
              </div>
            </div>
            
            <div className='flex items-center space-x-4'>
              <div className='hidden md:flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className='p-4 lg:p-8 bg-gray-50 min-h-screen'>
          <div className='max-w-7xl mx-auto'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout 