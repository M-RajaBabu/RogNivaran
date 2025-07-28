import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <section className='py-16 sm:py-20 lg:py-24'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='text-center mb-12 lg:mb-16'>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
                        Top Doctors to Book
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Simply browse through our extensive list of trusted doctors.
                    </p>
                </div>

                {/* Doctors Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12'>
                    {doctors.slice(0, 8).map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => { 
                                navigate(`/appointment/${item._id}`); 
                                window.scrollTo(0, 0) 
                            }} 
                            className='group bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/20'
                        >
                            {/* Doctor Image */}
                            <div className='relative h-64 sm:h-72 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden'>
                                <img 
                                    className='w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500' 
                                    src={item.image} 
                                    alt={item.name}
                                    style={{ objectPosition: 'center 20%' }}
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent'></div>
                                
                                {/* Availability Badge */}
                                <div className='absolute top-4 right-4'>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                        item.available 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        <span className={`w-2 h-2 rounded-full mr-2 ${
                                            item.available ? 'bg-green-500' : 'bg-gray-500'
                                        }`}></span>
                                        {item.available ? 'Available' : 'Not Available'}
                                    </span>
                                </div>

                                {/* Speciality Badge */}
                                <div className='absolute bottom-4 left-4'>
                                    <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800'>
                                        {item.speciality}
                                    </span>
                                </div>
                            </div>

                            {/* Doctor Info */}
                            <div className='p-6'>
                                <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300'>
                                    {item.name}
                                </h3>
                                <p className='text-gray-600 mb-3'>{item.speciality}</p>
                                
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <svg className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                        </svg>
                                        <span className='text-sm text-gray-600'>4.8 (120 reviews)</span>
                                    </div>
                                    <span className='text-lg font-bold text-primary'>₹{item.fees}</span>
                                </div>

                                <button className='w-full mt-4 bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-300'>
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className='text-center'>
                    <button 
                        onClick={() => { 
                            navigate('/doctors'); 
                            window.scrollTo(0, 0) 
                        }} 
                        className='inline-flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300'
                    >
                        View All Doctors
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                        </svg>
                    </button>
                    </div>
            </div>
        </section>
    )
}

export default TopDoctors