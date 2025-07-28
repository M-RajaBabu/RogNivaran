import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  
  const handleEmailClick = () => {
    window.location.href = 'mailto:support@rognivaran.com'
  }

  const handlePhoneClick = () => {
    window.location.href = 'tel:+91-XXXX-XXXXXX'
  }

  return (
    <footer className='bg-white border-t border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
          
          {/* Company Info */}
          <div className='sm:col-span-2 lg:col-span-2'>
            <div className='flex items-center mb-4 sm:mb-6'>
              <img 
                src={assets.logo} 
                alt="RogNivaran" 
                className='h-20 sm:h-24 lg:h-32 w-auto object-contain'
              />
            </div>
            <p className='text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 max-w-md'>
              RogNivaran is a doctor appointment web app tailored for the Indian healthcare ecosystem. 
              Under the leadership of Dr. Raja Babu Meena, Director, we streamline hospital and clinic 
              appointment bookings for Indian patients, doctors, and administrators.
            </p>
            <div className='flex space-x-4'>
              <a href='https://x.com/RBMRAJA' target='_blank' rel='noopener noreferrer' className='text-gray-400 hover:text-primary transition-colors'>
                <img src={assets.twitterXIcon} alt="Twitter/X" className='w-5 h-5 sm:w-6 sm:h-6 object-contain' />
              </a>
              <a href='https://www.linkedin.com/in/rajababumeena/' target='_blank' rel='noopener noreferrer' className='text-gray-400 hover:text-primary transition-colors'>
                <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
                </svg>
              </a>
            </div>
        </div>

          {/* Quick Links */}
        <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-6'>Quick Links</h3>
            <ul className='space-y-3'>
              <li>
                <NavLink 
                  to='/' 
                  className='text-gray-600 hover:text-primary transition-colors duration-200 flex items-center'
                >
                  <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                  </svg>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/doctors' 
                  className='text-gray-600 hover:text-primary transition-colors duration-200 flex items-center'
                >
                  <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                  Find Doctors
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/about' 
                  className='text-gray-600 hover:text-primary transition-colors duration-200 flex items-center'
                >
                  <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to='/contact' 
                  className='text-gray-600 hover:text-primary transition-colors duration-200 flex items-center'
                >
                  <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                  </svg>
                  Contact
                </NavLink>
              </li>
          </ul>
        </div>

          {/* Contact Info */}
        <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-6'>Get In Touch</h3>
            <ul className='space-y-4'>
              <li>
                <button 
                  onClick={handlePhoneClick}
                  className='text-gray-600 hover:text-primary transition-colors duration-200 flex items-center group'
                >
                  <svg className='w-5 h-5 mr-3 text-gray-400 group-hover:text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                  </svg>
                  +91-XXXX-XXXXXX
                </button>
              </li>
              <li>
                <button 
                  onClick={handleEmailClick}
                  className='text-gray-600 hover:text-primary transition-colors duration-200 flex items-center group'
                >
                  <svg className='w-5 h-5 mr-3 text-gray-400 group-hover:text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                  </svg>
                  support@rognivaran.com
                </button>
              </li>
              <li className='flex items-center text-gray-600'>
                <svg className='w-5 h-5 mr-3 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                India
              </li>
          </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-200 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='text-center md:text-left'>
              <p className='text-gray-600 text-sm'>
                © 2025 RogNivaran.com - All Rights Reserved.
              </p>
              <p className='text-gray-500 text-xs mt-1'>
                Project is done by Raja Babu Meena
              </p>
            </div>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <NavLink to='/privacy-policy' className='text-gray-600 hover:text-primary text-sm transition-colors'>
                Privacy Policy
              </NavLink>
              <NavLink to='/terms-of-service' className='text-gray-600 hover:text-primary text-sm transition-colors'>
                Terms of Service
              </NavLink>
            </div>
          </div>
      </div>
      </div>
    </footer>
  )
}

export default Footer
