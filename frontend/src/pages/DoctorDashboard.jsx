import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const DoctorDashboard = () => {
    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [doctorInfo, setDoctorInfo] = useState(null)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    }

    // Get doctor's appointments
    const getDoctorAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { token } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
                setDoctorInfo(data.doctorInfo)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Complete appointment
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success('Appointment marked as completed')
                getDoctorAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Cancel appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success('Appointment cancelled')
                getDoctorAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getDoctorAppointments()
        }
    }, [token])

    if (!doctorInfo) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Doctor Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <img 
                            src={doctorInfo.image} 
                            alt={doctorInfo.name} 
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{doctorInfo.name}</h1>
                            <p className="text-gray-600">{doctorInfo.speciality}</p>
                            <p className="text-sm text-gray-500">{doctorInfo.degree}</p>
                            <p className="text-sm text-gray-500">Experience: {doctorInfo.experience}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => navigate('/doctor/profile')}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Appointments Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">My Appointments</h2>
                
                {appointments.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No appointments found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {appointments.map((appointment, index) => (
                            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img 
                                            src={appointment.userData.image || assets.profile_pic} 
                                            alt="Patient" 
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{appointment.userData.name}</h3>
                                            <p className="text-sm text-gray-600">{appointment.userData.email}</p>
                                            <p className="text-sm text-gray-500">
                                                Date: {slotDateFormat(appointment.slotDate)} | Time: {appointment.slotTime}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Payment: {appointment.paymentMethod === 'cash' ? 'Cash at Clinic' : 'Online'} - 
                                                {appointment.payment ? ' Paid' : ' Pending'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        {!appointment.cancelled && !appointment.isCompleted && (
                                            <>
                                                <button 
                                                    onClick={() => completeAppointment(appointment._id)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                                >
                                                    Complete
                                                </button>
                                                <button 
                                                    onClick={() => cancelAppointment(appointment._id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                        
                                        {appointment.isCompleted && (
                                            <span className="px-4 py-2 bg-green-100 text-green-700 rounded">
                                                Completed
                                            </span>
                                        )}
                                        
                                        {appointment.cancelled && (
                                            <span className="px-4 py-2 bg-red-100 text-red-700 rounded">
                                                Cancelled
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoctorDashboard 