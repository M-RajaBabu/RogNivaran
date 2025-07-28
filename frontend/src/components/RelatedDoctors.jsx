import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-12 sm:my-16 text-[#262626]'>
            <h1 className='text-2xl sm:text-3xl font-medium text-center'>Related Doctors</h1>
            <p className='w-full sm:w-2/3 lg:w-1/3 text-center text-sm text-gray-600'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-5'>
                {relDoc.map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                        className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 shadow-sm hover:shadow-lg bg-white' 
                        key={index}
                    >
                        <div className='relative w-full h-64 sm:h-72 bg-gradient-to-br from-blue-50 to-indigo-50'>
                            <img 
                                className='w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500' 
                                src={item.image} 
                                alt={item.name}
                                style={{ objectPosition: 'center 20%' }}
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent'></div>
                        </div>
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm text-center mb-2 ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p>
                                <p className='font-medium'>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            <p className='text-[#262626] text-lg font-medium mb-1'>{item.name}</p>
                            <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors