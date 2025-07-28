import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <section className='py-16 sm:py-20 lg:py-24'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='relative overflow-hidden bg-gradient-to-r from-primary via-blue-600 to-purple-600 rounded-3xl'>
                    <div className='absolute inset-0 bg-black/10'></div>
                    
                    <div className='relative flex flex-col lg:flex-row items-center px-6 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-16 xl:py-20'>
                        
                        {/* Left Content */}
                        <div className='flex-1 text-center lg:text-left mb-8 lg:mb-0 lg:pr-8'>
                            <h2 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight'>
                                Book Appointment <br className='hidden sm:block' />
                                With <span className='text-blue-200'>100+ Trusted Doctors</span>
                            </h2>
                            
                            <p className='text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0'>
                                Join thousands of patients who trust us for their healthcare needs. 
                                Get started today and experience seamless appointment booking.
                            </p>
                            
                            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                                <button 
                                    onClick={() => { 
                                        navigate('/login'); 
                                        window.scrollTo(0, 0) 
                                    }} 
                                    className='inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                                >
                                    Create Account
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                    </svg>
                                </button>
                                
                                <button className='inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300'>
                                    Learn More
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className='flex-1 relative w-full max-w-lg lg:max-w-none'>
                            <div className='relative'>
                                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl'></div>
                                <div className='bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 text-center'>
                                    <div className='w-24 h-24 lg:w-32 lg:h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                                        <svg className='w-12 h-12 lg:w-16 lg:h-16 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                        </svg>
                                    </div>
                                    <h3 className='text-white text-2xl lg:text-3xl font-bold mb-4'>Easy Booking</h3>
                                    <p className='text-white/80 text-lg'>Book appointments with just a few clicks. No more waiting in long queues.</p>
                                    
                                    <div className='mt-8 grid grid-cols-3 gap-4'>
                                        <div className='text-center'>
                                            <div className='text-2xl font-bold text-white'>100+</div>
                                            <div className='text-white/80 text-sm'>Doctors</div>
                                        </div>
                                        <div className='text-center'>
                                            <div className='text-2xl font-bold text-white'>10K+</div>
                                            <div className='text-white/80 text-sm'>Patients</div>
                                        </div>
                                        <div className='text-center'>
                                            <div className='text-2xl font-bold text-white'>24/7</div>
                                            <div className='text-white/80 text-sm'>Support</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner