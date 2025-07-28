import React, { useState } from 'react'
import headerImg from '../assets/header_img.png'

const Header = () => {
    const [showLearnMore, setShowLearnMore] = useState(false)

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about-section')
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <>
            <div className='relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-2xl mx-4 sm:mx-6 lg:mx-8 mb-8'>
                <div className='absolute inset-0 bg-black/10'></div>
                
                <div className='relative flex flex-col lg:flex-row items-center min-h-[350px] sm:min-h-[400px] lg:min-h-[500px] px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-16'>
                    
                    {/* Header Left Content */}
                    <div className='flex-1 text-center lg:text-left mb-6 sm:mb-8 lg:mb-0 lg:pr-8'>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6'>
                            Book Appointments <br className='hidden sm:block' />
                            <span className='text-blue-200'>With Trusted Doctors</span> <br className='hidden sm:block' />
                            in India
                        </h1>
                        
                        <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8'>
                            <div className='flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2'>
                                <div className='flex -space-x-2'>
                                    <div className='w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 rounded-full border-2 border-white'></div>
                                    <div className='w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full border-2 border-white'></div>
                                    <div className='w-6 h-6 sm:w-8 sm:h-8 bg-purple-400 rounded-full border-2 border-white'></div>
                                </div>
                                <span className='text-white text-xs sm:text-sm font-medium'>10,000+ Patients</span>
                            </div>
                            <p className='text-white/90 text-xs sm:text-sm md:text-base max-w-md'>
                                Easily find and book appointments with trusted doctors near you. 
                                Streamlining your healthcare journey.
                            </p>
                        </div>
                        
                        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start'>
                            <a 
                                href='#speciality' 
                                className='inline-flex items-center justify-center gap-2 bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                            >
                                Find Doctors 
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                </svg>
                            </a>
                            <button 
                                onClick={() => setShowLearnMore(true)}
                                className='inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-white/10 transition-all duration-300'
                            >
                                Learn More
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Header Right Image - Original Header Image */}
                    <div className='flex-1 relative w-full max-w-lg lg:max-w-none'>
                        <div className='relative'>
                            <img 
                                className='w-full h-auto rounded-2xl shadow-2xl' 
                                src={headerImg} 
                                alt="Healthcare professionals" 
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl'></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learn More Modal */}
            {showLearnMore && (
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
                    <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={() => setShowLearnMore(false)}></div>
                    <div className='relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
                        <div className='p-8'>
                            {/* Header */}
                            <div className='flex items-center justify-between mb-8'>
                                <h2 className='text-3xl font-bold text-gray-900'>About RogNivaran</h2>
                                <button 
                                    onClick={() => setShowLearnMore(false)}
                                    className='p-2 rounded-full hover:bg-gray-100 transition-colors'
                                >
                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className='space-y-8'>
                                {/* Mission */}
                                <div className='bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl p-6'>
                                    <h3 className='text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3'>
                                        <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center'>
                                            <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                                            </svg>
                                        </div>
                                        Our Mission
                                    </h3>
                                    <p className='text-gray-700 leading-relaxed'>
                                        RogNivaran is dedicated to revolutionizing healthcare access in India by connecting patients with trusted doctors through our innovative appointment booking platform. We believe everyone deserves easy access to quality healthcare.
                                    </p>
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 className='text-xl font-semibold text-gray-900 mb-6'>Why Choose RogNivaran?</h3>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        <div className='flex items-start gap-4'>
                                            <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                                                <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className='font-semibold text-gray-900 mb-2'>Verified Doctors</h4>
                                                <p className='text-gray-600 text-sm'>All doctors are thoroughly verified with proper credentials and experience.</p>
                                            </div>
                                        </div>

                                        <div className='flex items-start gap-4'>
                                            <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                                                <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className='font-semibold text-gray-900 mb-2'>Instant Booking</h4>
                                                <p className='text-gray-600 text-sm'>Book appointments instantly with real-time availability and confirmation.</p>
                                            </div>
                                        </div>

                                        <div className='flex items-start gap-4'>
                                            <div className='w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                                                <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className='font-semibold text-gray-900 mb-2'>Patient Support</h4>
                                                <p className='text-gray-600 text-sm'>24/7 customer support to help you with any questions or concerns.</p>
                                            </div>
                                        </div>

                                        <div className='flex items-start gap-4'>
                                            <div className='w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                                                <svg className='w-6 h-6 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className='font-semibold text-gray-900 mb-2'>Secure Platform</h4>
                                                <p className='text-gray-600 text-sm'>Your data is protected with industry-standard security measures.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Statistics */}
                                <div className='bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white'>
                                    <h3 className='text-2xl font-bold mb-6 text-center'>Our Impact</h3>
                                    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
                                        <div>
                                            <div className='text-3xl font-bold mb-2'>100+</div>
                                            <div className='text-sm opacity-90'>Verified Doctors</div>
                                        </div>
                                        <div>
                                            <div className='text-3xl font-bold mb-2'>10K+</div>
                                            <div className='text-sm opacity-90'>Happy Patients</div>
                                        </div>
                                        <div>
                                            <div className='text-3xl font-bold mb-2'>50K+</div>
                                            <div className='text-sm opacity-90'>Appointments</div>
                                        </div>
                                        <div>
                                            <div className='text-3xl font-bold mb-2'>4.8★</div>
                                            <div className='text-sm opacity-90'>Patient Rating</div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className='text-center'>
                                    <p className='text-gray-600 mb-6'>
                                        Ready to experience hassle-free healthcare booking?
                                    </p>
                                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                                        <button 
                                            onClick={() => {
                                                setShowLearnMore(false)
                                                document.getElementById('speciality')?.scrollIntoView({ behavior: 'smooth' })
                                            }}
                                            className='bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors'
                                        >
                                            Find Doctors Now
                                        </button>
                                        <button 
                                            onClick={() => setShowLearnMore(false)}
                                            className='border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors'
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
            )}
        </>
    )
}

export default Header