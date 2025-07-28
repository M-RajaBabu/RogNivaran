import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-xl sm:text-2xl pt-8 sm:pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>RogNivaran</span></p>
      </div>

      <div className='my-8 sm:my-10 flex flex-col lg:flex-row gap-8 sm:gap-12'>
        <img className='w-full lg:w-1/3 lg:max-w-[380px] rounded-lg shadow-md' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-4 sm:gap-6 lg:w-2/4 text-sm sm:text-base text-gray-600'>
          <p>Welcome to RogNivaran, your trusted platform for managing healthcare appointments across India. At RogNivaran, we understand the importance of easily connecting with doctors and managing your health journey.</p>
          <p>RogNivaran is committed to building a seamless healthcare experience tailored for the Indian context. We are continuously enhancing our platform with features that resonate with the needs of patients, doctors, and clinics in India.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at RogNivaran is to be India's leading health appointment platform, making healthcare accessible and convenient for everyone. We aim to simplify the process of finding and booking appointments with trusted healthcare providers across the country.</p>
          
          {/* Leadership Section */}
          <div className='mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-primary'>
            <b className='text-gray-800 text-base'>Leadership</b>
            <p className='mt-2'>Under the visionary leadership of <span className='font-semibold text-primary'>Dr. Raja Babu Meena</span>, Director of RogNivaran, our platform has grown to become a trusted name in healthcare technology. Dr. Meena brings his extensive medical expertise and innovative vision to revolutionize healthcare accessibility in India.</p>
          </div>
        </div>
        <img className='w-full lg:w-1/3 lg:max-w-[380px] rounded-lg shadow-md' src={assets.about_image2} alt="" />
      </div>

      <div className='text-lg sm:text-xl my-6 sm:my-8'>
        <p>WHY CHOOSE <span className='text-gray-700 font-semibold'>RogNivaran</span></p>
      </div>

      <div className='flex flex-col lg:flex-row mb-16 sm:mb-20 gap-4 sm:gap-6'>
        <div className='border px-6 sm:px-10 lg:px-16 py-6 sm:py-8 lg:py-16 flex flex-col gap-4 sm:gap-5 text-sm sm:text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg'>
          <b>EFFICIENT BOOKING:</b>
          <p>Streamlined appointment scheduling designed for your convenience.</p>
        </div>
        <div className='border px-6 sm:px-10 lg:px-16 py-6 sm:py-8 lg:py-16 flex flex-col gap-4 sm:gap-5 text-sm sm:text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg'>
          <b>WIDE NETWORK: </b>
          <p>Access to a growing network of trusted doctors and clinics across Indian cities.</p>
        </div>
        <div className='border px-6 sm:px-10 lg:px-16 py-6 sm:py-8 lg:py-16 flex flex-col gap-4 sm:gap-5 text-sm sm:text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg'>
          <b>LOCALIZED EXPERIENCE:</b>
          <p>A platform designed with the needs and context of Indian users in mind.</p>
        </div>
      </div>

      {/* Branches Section */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
          Our <span className='text-primary'>Branches</span>
        </h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          We're expanding across India to bring quality healthcare closer to you. 
          Find our branches in major cities across the country.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-16'>
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.mumbaiBranch} alt="Mumbai Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Mumbai</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Bandra West, Mumbai - 400050
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Andheri East, Mumbai - 400069
              </p>
            </div>
          </div>
        </div>
        
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.delhiBranch} alt="Delhi Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Delhi</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Connaught Place, New Delhi - 110001
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Dwarka Sector 12, Delhi - 110078
              </p>
            </div>
          </div>
        </div>
        
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.bangaloreBranch} alt="Bangalore Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Bangalore</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Koramangala, Bangalore - 560034
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Indiranagar, Bangalore - 560038
              </p>
            </div>
          </div>
        </div>
        
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.hyderabadBranch} alt="Hyderabad Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Hyderabad</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Banjara Hills, Hyderabad - 500034
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Gachibowli, Hyderabad - 500032
              </p>
            </div>
          </div>
        </div>
        
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.chennaiBranch} alt="Chennai Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Chennai</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                T Nagar, Chennai - 600017
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Anna Nagar, Chennai - 600040
              </p>
            </div>
          </div>
        </div>
        
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.kolkataBranch} alt="Kolkata Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Kolkata</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Park Street, Kolkata - 700016
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Salt Lake City, Kolkata - 700091
              </p>
            </div>
          </div>
        </div>
        
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.puneBranch} alt="Pune Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Pune</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Koregaon Park, Pune - 411001
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Hinjewadi, Pune - 411057
              </p>
            </div>
          </div>
        </div>
        
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.ahmedabadBranch} alt="Ahmedabad Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Ahmedabad</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Satellite, Ahmedabad - 380015
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Vastrapur, Ahmedabad - 380054
              </p>
            </div>
          </div>
        </div>
        
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.jaipurBranch} alt="Jaipur Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Jaipur</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                C-Scheme, Jaipur - 302001
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Malviya Nagar, Jaipur - 302017
              </p>
            </div>
          </div>
        </div>
        
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.lucknowBranch} alt="Lucknow Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Lucknow</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Gomti Nagar, Lucknow - 226010
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Hazratganj, Lucknow - 226001
              </p>
            </div>
          </div>
        </div>
        
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.chandigarhBranch} alt="Chandigarh Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Chandigarh</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Sector 17, Chandigarh - 160017
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Sector 22, Chandigarh - 160022
              </p>
            </div>
          </div>
        </div>
        
        <div className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'>
          <div className='relative h-48 overflow-hidden'>
            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={assets.indoreBranch} alt="Indore Branch" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
            <div className='absolute bottom-4 left-4'>
              <h3 className='text-white text-xl font-bold'>Indore</h3>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-2'>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Vijay Nagar, Indore - 452010
              </p>
              <p className='text-sm text-gray-600 flex items-center gap-2'>
                <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                Palasia, Indore - 452001
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About
