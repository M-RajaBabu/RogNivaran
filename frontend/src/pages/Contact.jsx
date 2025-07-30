import React from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Contact = () => {
  
  const handleExploreJobs = () => {
    toast.info('Careers page coming soon! We\'re currently hiring for various positions across all our branches.')
  }

  const handleEmailClick = () => {
    window.location.href = 'mailto:support@rognivaran.com'
  }

  const handlePhoneClick = () => {
    window.location.href = 'tel:+911234567890'
  }

  return (
    <div>

      <div className='text-center text-xl sm:text-2xl pt-8 sm:pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-8 sm:my-10 flex flex-col lg:flex-row gap-8 sm:gap-10 mb-20 sm:mb-28 text-sm sm:text-base'>
        <img className='w-full lg:w-1/2 lg:max-w-[360px] rounded-lg shadow-md' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-4 sm:gap-6 lg:w-1/2'>
          <p className='font-semibold text-lg sm:text-xl text-gray-600'>OUR OFFICE</p>
          <div className='space-y-2 text-gray-500'>
            <p>123 Healthcare Avenue</p>
            <p>Medical District, New Delhi - 110001</p>
            <p>India</p>
          </div>
          <div className='space-y-2 text-gray-500'>
            <p 
              onClick={handlePhoneClick}
              className='cursor-pointer hover:text-primary transition-colors duration-300 hover:underline'
            >
              Tel: +91-1234567890
            </p>
            <p 
              onClick={handleEmailClick}
              className='cursor-pointer hover:text-primary transition-colors duration-300 hover:underline'
            >
              Email: support@rognivaran.com
            </p>
          </div>
          
          {/* Leadership Contact */}
          <div className='mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-primary'>
            <p className='font-semibold text-lg sm:text-xl text-gray-600 mb-2'>Leadership</p>
            <p className='text-gray-700 font-medium'>Dr. Raja Babu Meena</p>
            <p className='text-sm text-gray-600'>Director, RogNivaran</p>
            <p className='text-sm text-gray-600'>MBBS, MD from AIIMS Delhi</p>
          </div>
          
          <p className='font-semibold text-lg sm:text-xl text-gray-600 mt-4'>CAREERS AT RogNivaran</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button 
            onClick={handleExploreJobs}
            className='border border-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base hover:bg-black hover:text-white transition-all duration-500 rounded-lg mt-2 w-full sm:w-auto'
          >
            Explore Jobs
          </button>
        </div>
      </div>

    </div>
  )
}

export default Contact
