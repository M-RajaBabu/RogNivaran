import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import upiQrCode from '../assets/WhatsApp Image 2025-07-28 at 10.13.27_a94f4fb3.jpg'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')
    const [showUpiModal, setShowUpiModal] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState(null)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1]) -1] + " " + dateArray[2] // Corrected month index
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to show UPI payment modal
    const showUpiPayment = (appointment) => {
        setSelectedAppointment(appointment)
        setShowUpiModal(true)
    }

    // Function to verify UPI payment
    const verifyUpiPayment = async () => {
        if (!selectedAppointment) return

        try {
            const { data } = await axios.post(backendUrl + '/api/user/verify-upi', { 
                appointmentId: selectedAppointment._id,
                transactionId: `UPI_${Date.now()}` // You can modify this to accept actual transaction ID
            }, { headers: { token } })
            
            if (data.success) {
                toast.success(data.message)
                setShowUpiModal(false)
                setSelectedAppointment(null)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Payment verification failed')
        }
    }


    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* UPI Payment Modal */}
            {showUpiModal && selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Pay with UPI</h3>
                            <p className="text-gray-600 mb-6">Scan the QR code below to complete your payment</p>
                            
                            {/* QR Code Section */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-100">
                                <div className="bg-white rounded-lg p-4 inline-block">
                                    <img 
                                        src={upiQrCode} 
                                        alt="UPI QR Code" 
                                        className="mx-auto w-48 h-48 object-contain"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-3">
                                    📱 Open any UPI app and scan this QR code
                                </p>
                            </div>
                            
                            {/* Payment Details */}
                            <div className="space-y-4 mb-6">
                                {/* Amount Display */}
                                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                    <p className="text-sm text-green-700 mb-1">Amount to Pay:</p>
                                    <p className="text-2xl font-bold text-green-800">₹{selectedAppointment.amount}</p>
                                </div>
                                
                                {/* UPI ID Display */}
                                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                                    <p className="text-sm text-gray-600 mb-1">UPI ID:</p>
                                    <p className="font-mono text-lg font-bold text-primary">rajababumeena010-1@okicici</p>
                                    <p className="text-xs text-gray-500 mt-1">You can also pay directly using this UPI ID</p>
                        </div>
                        </div>
                            
                            {/* Instructions */}
                            <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-200">
                                <h4 className="font-semibold text-yellow-800 mb-2">📋 Payment Instructions:</h4>
                                <ul className="text-sm text-yellow-700 space-y-1 text-left">
                                    <li>• Scan the QR code with any UPI app (GPay, PhonePe, Paytm, etc.)</li>
                                    <li>• Verify the amount and UPI ID before paying</li>
                                    <li>• After payment, take a screenshot of the transaction</li>
                                    <li>• Click "Verify Payment" below to confirm</li>
                                </ul>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => {
                                        setShowUpiModal(false)
                                        setSelectedAppointment(null)
                                    }}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={verifyUpiPayment}
                                    className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Verify Payment
                                </button>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-4">
                                💡 Your appointment will be confirmed once payment is verified
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
                <p className="text-gray-600">Track and manage your healthcare appointments</p>
            </div>
            
            {appointments.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
                    <p className="text-gray-600 mb-6">Book your first appointment to get started</p>
                    <button 
                        onClick={() => navigate('/doctors')}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Find Doctors
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {appointments.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="p-6">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Doctor Image */}
                                    <div className="flex-shrink-0">
                                        <div className="w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                                            <img 
                                                className="w-full h-full object-cover" 
                                                src={item.docData.image} 
                                                alt={item.docData.name}
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face';
                                                }}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Appointment Details */}
                                    <div className="flex-1">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.docData.name}</h3>
                                                <p className="text-primary font-medium mb-1">{item.docData.speciality}</p>
                                                <p className="text-gray-600 text-sm mb-3">{item.docData.degree}</p>
                                                
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-500 mb-1">Date & Time</p>
                                                        <p className="font-medium text-gray-900">
                                                            {slotDateFormat(item.slotDate)} at {item.slotTime}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 mb-1">Payment Method</p>
                                                        <p className="font-medium text-gray-900">
                                                            {item.paymentMethod === 'cash' ? 'Cash at Clinic' : 
                                                             item.paymentMethod === 'upi' ? 'UPI Payment' : 
                                                             item.paymentMethod === 'stripe' ? 'Card Payment' : 'Online'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 mb-1">Amount</p>
                                                        <p className="font-medium text-gray-900">₹{item.amount}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 mb-1">Status</p>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            item.cancelled ? 'bg-red-100 text-red-800' :
                                                            item.isCompleted ? 'bg-green-100 text-green-800' :
                                                            item.payment ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {item.cancelled ? 'Cancelled' :
                                                             item.isCompleted ? 'Completed' :
                                                             item.payment ? 'Paid' : 'Pending Payment'}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-4">
                                                    <p className="text-gray-500 mb-1">Address</p>
                                                    <p className="text-sm text-gray-900">{item.docData.address?.line1 || 'Address not available'}</p>
                                                    {item.docData.address?.line2 && (
                                                        <p className="text-sm text-gray-900">{item.docData.address.line2}</p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Action Buttons */}
                                            <div className="flex flex-col gap-2 lg:items-end">
                                                {!item.cancelled && !item.payment && !item.isCompleted && item.paymentMethod !== 'cash' && payment !== item._id && (
                                                    <button 
                                                        onClick={() => setPayment(item._id)} 
                                                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                                                    >
                                                        Pay Online
                                                    </button>
                                                )}
                                                
                                                {!item.cancelled && !item.payment && !item.isCompleted && item.paymentMethod !== 'cash' && payment === item._id && item.paymentMethod === 'stripe' && (
                                                    <button 
                                                        onClick={() => appointmentStripe(item._id)} 
                                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                                                    >
                                                        <img className="w-4 h-4" src={assets.stripe_logo} alt="Stripe" />
                                                        Pay with Card
                                                    </button>
                                                )}
                                                
                                                {!item.cancelled && !item.payment && !item.isCompleted && item.paymentMethod !== 'cash' && payment === item._id && item.paymentMethod === 'upi' && (
                                                    <button 
                                                        onClick={() => showUpiPayment(item)} 
                                                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                                                    >
                                                        💳 Pay with UPI
                                                    </button>
                                                )}
                                                
                                                {!item.cancelled && !item.payment && !item.isCompleted && item.paymentMethod !== 'cash' && payment === item._id && item.paymentMethod === 'razorpay' && (
                                                    <button 
                                                        onClick={() => appointmentRazorpay(item._id)} 
                                                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
                                                    >
                                                        <img className="w-4 h-4" src={assets.razorpay_logo} alt="Razorpay" />
                                                        Pay with Razorpay
                                                    </button>
                                                )}
                                                
                                                {!item.cancelled && !item.isCompleted && (item.payment || item.paymentMethod === 'cash') && (
                                                    <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                                        item.payment ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {item.payment ? '✓ Payment Confirmed' : '⏳ Pending (Cash at Clinic)'}
                                                    </div>
                                                )}
                                                
                                                {item.isCompleted && (
                                                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
                                                        ✓ Appointment Completed
                                                    </div>
                                                )}
                                                
                                                {!item.cancelled && !item.isCompleted && (
                                                    <button 
                                                        onClick={() => cancelAppointment(item._id)} 
                                                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                                    >
                                                        Cancel Appointment
                                                    </button>
                                                )}
                                                
                                                {item.cancelled && !item.isCompleted && (
                                                    <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-medium">
                                                        Appointment Cancelled
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyAppointments