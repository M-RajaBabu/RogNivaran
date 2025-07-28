import React, { useContext, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  // Check if user is on doctor routes
  const isDoctorRoute = location.pathname.startsWith('/doctor/')

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='sticky top-0 z-50 bg-white md:bg-white/95 md:backdrop-blur-md shadow-lg border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          
          {/* Logo */}
          <div className='flex-shrink-0'>
            <div 
              onClick={() => navigate('/')} 
              className='cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center'
            >
              <img 
                src={assets.logo} 
                alt="RogNivaran" 
                className='h-24 w-auto object-contain'
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            <NavLink 
              to='/' 
              className={({ isActive }) => 
                `relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:text-primary group ${
                  isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
                }`
              }
            >
              HOME
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-400 transition-all duration-300 group-hover:w-full'></span>
        </NavLink>
            
            <NavLink 
              to='/doctors' 
              className={({ isActive }) => 
                `relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:text-primary group ${
                  isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
                }`
              }
            >
              ALL DOCTORS
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-400 transition-all duration-300 group-hover:w-full'></span>
        </NavLink>
            
            <NavLink 
              to='/about' 
              className={({ isActive }) => 
                `relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:text-primary group ${
                  isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
                }`
              }
            >
              ABOUT
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-400 transition-all duration-300 group-hover:w-full'></span>
        </NavLink>
            
            <NavLink 
              to='/contact' 
              className={({ isActive }) => 
                `relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:text-primary group ${
                  isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
                }`
              }
            >
              CONTACT
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-400 transition-all duration-300 group-hover:w-full'></span>
        </NavLink>
          </nav>

          {/* Right Side */}
          <div className='flex items-center space-x-4'>
            {token ? (
              <div className='flex items-center gap-3 cursor-pointer group relative'>
                <div className='relative'>
                  {userData && userData.image ? (
                    <img 
                      className='w-10 h-10 rounded-full border-2 border-primary/20 hover:border-primary transition-colors duration-300 object-cover' 
                      src={userData.image} 
                      alt="Profile" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {(!userData || !userData.image) && (
                    <div className='w-10 h-10 rounded-full border-2 border-primary/20 hover:border-primary transition-colors duration-300 bg-white flex items-center justify-center overflow-hidden'>
                      <img 
                        src={isDoctorRoute ? assets.doctor_icon : assets.patient_icon} 
                        alt={isDoctorRoute ? "Doctor" : "Patient"} 
                        className='w-8 h-8 object-contain'
                      />
                    </div>
                  )}
                  <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
                </div>
                <svg className='w-4 h-4 sm:w-3 sm:h-3 text-gray-600 transition-transform duration-300 group-hover:rotate-180' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
                </svg>
                
                {/* Dropdown Menu */}
                <div className='absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right'>
                  <div className='py-2'>
                    <div className='px-4 py-3 border-b border-gray-100'>
                      <p className='text-sm font-medium text-gray-900'>{userData ? userData.name : 'User'}</p>
                      <p className='text-xs text-gray-500'>{userData ? userData.email : 'Loading...'}</p>
                    </div>
                    <div className='py-1'>
                      <button 
                        onClick={() => navigate('/my-profile')} 
                        className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-200'
                      >
                        My Profile
                      </button>
                      <button 
                        onClick={() => navigate('/my-appointments')} 
                        className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-200'
                      >
                        My Appointments
                      </button>
                      <button 
                        onClick={logout} 
                        className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200'
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex items-center gap-3'>
                <button 
                  onClick={() => navigate('/login')} 
                  className='bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-2.5 rounded-full font-medium hidden md:block hover:shadow-lg hover:scale-105 transition-all duration-300'
                >
                  Login / Sign Up
                </button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMenu(true)} 
              className='md:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200'
            >
              <svg className='w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-50 ${showMenu ? 'block' : 'hidden'}`}>
        <div className='fixed inset-0 bg-black/50' onClick={() => setShowMenu(false)}></div>
        <div className='fixed right-0 top-0 h-full w-full sm:w-80 bg-white shadow-xl transform transition-transform duration-300'>
          <div className='flex items-center justify-between p-4 sm:p-6 border-b border-gray-100'>
            <div className='flex items-center'>
              <img 
                src={assets.logo} 
                alt="RogNivaran" 
                className='h-16 sm:h-20 w-auto object-contain'
              />
            </div>
            <button 
              onClick={() => setShowMenu(false)} 
              className='p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200'
            >
              <svg className='w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          
          <nav className='p-6'>
            <div className='space-y-4'>
              {token && (
                <div className='px-4 py-3 border-b border-gray-100 mb-4'>
                  <div className='flex items-center gap-3'>
                    <div className='relative'>
                      {userData && userData.image ? (
                        <img 
                          className='w-12 h-12 rounded-full border-2 border-primary/20 object-cover' 
                          src={userData.image} 
                          alt="Profile" 
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      {(!userData || !userData.image) && (
                        <div className='w-12 h-12 rounded-full border-2 border-primary/20 bg-white flex items-center justify-center overflow-hidden'>
                          <img 
                            src={isDoctorRoute ? assets.doctor_icon : assets.patient_icon} 
                            alt={isDoctorRoute ? "Doctor" : "Patient"} 
                            className='w-10 h-10 object-contain'
                          />
                        </div>
                      )}
                      <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>{userData ? userData.name : 'User'}</p>
                      <p className='text-xs text-gray-500'>{userData ? userData.email : 'Loading...'}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/' 
                className={({ isActive }) => 
                  `block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`
                }
              >
                HOME
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/doctors' 
                className={({ isActive }) => 
                  `block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`
                }
              >
                ALL DOCTORS
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/about' 
                className={({ isActive }) => 
                  `block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`
                }
              >
                ABOUT
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/contact' 
                className={({ isActive }) => 
                  `block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`
                }
              >
                CONTACT
              </NavLink>
              
              {token && (
                <>
                  <button 
                    onClick={() => {
                      setShowMenu(false)
                      navigate('/my-profile')
                    }} 
                    className='w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200'
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => {
                      setShowMenu(false)
                      navigate('/my-appointments')
                    }} 
                    className='w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200'
                  >
                    My Appointments
                  </button>
                  <button 
                    onClick={() => {
                      setShowMenu(false)
                      logout()
                    }} 
                    className='w-full text-left px-4 py-3 text-lg font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200'
                  >
                    Logout
                  </button>
                </>
              )}
              
              {!token && (
                <button 
                  onClick={() => {
                    setShowMenu(false)
                    navigate('/login')
                  }} 
                  className='w-full bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200'
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar