import React from 'react'
import { Link } from 'react-router-dom'
import { specialityData } from '../assets/assets'

const SpecialityMenu = () => {
    // Map specialities to emoji icons
    const getSpecialityIcon = (speciality) => {
        const iconMap = {
            'Neuro Surgeon': '🧠⚕️',
            'Gynecologist': '👩‍⚕️',
            'Dermatologist': '🔬',
            'Pediatrician': '👶',
            'Neurologist': '🧠',
            'Gastroenterologist': '🩺',
            'Cardiologist': '❤️',
            'Orthopedic Surgeon': '🦴',
            'Psychiatrist': '🧠',
            'Urologist': '🔬',
            'Ophthalmologist': '👁️',
            'ENT Specialist': '👂',
            'Dentist': '🦷',
            'Physiotherapist': '💪',
            'Ayurvedic Physician': '🌿',
            'General Physician': '👨‍⚕️'
        };
        return iconMap[speciality] || '👨‍⚕️';
    };

    return (
        <section id='speciality' className='py-16 sm:py-20 lg:py-24'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='text-center mb-12 lg:mb-16'>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
                        Find by Speciality
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
                    </p>
                </div>

                {/* Specialities Grid */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6 lg:gap-8'>
                    {specialityData.map((item, index) => (
                        <Link 
                            key={index}
                            to={`/doctors/${item.speciality}`} 
                            onClick={() => window.scrollTo(0, 0)} 
                            className='group flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-white hover:bg-gradient-to-br hover:from-primary/5 hover:to-blue-50 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
                        >
                            <div className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary/10 to-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                                <span className='text-2xl sm:text-3xl lg:text-4xl'>{getSpecialityIcon(item.speciality)}</span>
                            </div>
                            <p className='text-sm sm:text-base font-semibold text-gray-800 text-center leading-tight group-hover:text-primary transition-colors duration-300'>
                                {item.speciality}
                            </p>
                        </Link>
                    ))}
                    
                    {/* More Specialities Card */}
                    <Link 
                        to='/doctors' 
                        className='group flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/5 hover:to-blue-50 border-2 border-dashed border-gray-300 hover:border-primary/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
                    >
                        <div className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary/20 to-blue-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                            <svg className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                            </svg>
                        </div>
                        <p className='text-sm sm:text-base font-semibold text-primary text-center leading-tight'>
                            More Specialities
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default SpecialityMenu