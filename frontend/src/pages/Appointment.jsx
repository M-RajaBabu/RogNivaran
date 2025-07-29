import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'
// Your actual UPI QR code image
import upiQrCode from '../assets/upi-qr-code.jpg'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('upi') // 'upi', 'stripe', or 'cash'
    const [showUpiModal, setShowUpiModal] = useState(false)
    const [upiId, setUpiId] = useState('rajababumeena010-1@okicici')
    const [amount, setAmount] = useState(0)

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
        if (docInfo) {
            setAmount(docInfo.fees)
        }
    }

    const getAvailableSolts = async () => {
        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                // Check if slot is available (not booked)
                const isSlotAvailable = !docInfo.slots_booked[slotDate] || 
                    !docInfo.slots_booked[slotDate].includes(slotTime)

                if (isSlotAvailable) {
                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            toast.warning('Please select a time slot')
            return
        }

        if (paymentMethod === 'upi') {
            setShowUpiModal(true)
            return
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { 
                docId, 
                slotDate, 
                slotTime, 
                paymentMethod,
                doctorImage: docInfo.image // Pass the doctor's image URL
            }, { headers: { token } })
            
            if (data.success) {
                toast.success(data.message)
                getDoctosData()

                if(paymentMethod === 'stripe'){
                     // Redirect to Stripe payment URL
                     window.location.href = data.session_url;
                } else {
                    // Redirect to my appointments page for cash payment
                    navigate('/my-appointments')
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Booking failed')
        }
    }

    const handleUpiPayment = async () => {
        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { 
                docId, 
                slotDate, 
                slotTime, 
                paymentMethod: 'upi',
                upiId: upiId,
                doctorImage: docInfo.image // Pass the doctor's image URL
            }, { headers: { token } })
            
            if (data.success) {
                toast.success('Appointment booked! Please complete UPI payment.')
                getDoctosData()
                setShowUpiModal(false)
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Booking failed')
        }
        }

    // Using the actual QR code image instead of generating one
    const getUpiQrCode = () => {
        return upiQrCode
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='py-6 sm:py-8'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8'>
                    
                    {/* Doctor Info Card */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100'>
                            <div className='text-center lg:text-left'>
                                <img 
                                    src={docInfo.image} 
                                    alt={docInfo.name} 
                                    className='w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto lg:mx-0 rounded-full object-cover border-4 border-primary/20 mb-4 sm:mb-6'
                                />
                                <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2'>{docInfo.name}</h2>
                                <p className='text-primary font-semibold mb-2'>{docInfo.speciality}</p>
                                <p className='text-gray-600 text-sm sm:text-base mb-4'>{docInfo.degree}</p>
                                <div className='flex items-center justify-center lg:justify-start gap-4 mb-4'>
                                    <div className='flex items-center gap-2'>
                                        <svg className='w-4 h-4 text-green-500' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                        </svg>
                                        <span className='text-sm sm:text-base text-gray-600'>{docInfo.experience} Experience</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <svg className='w-4 h-4 text-blue-500' fill='currentColor' viewBox='0 0 20 20'>
                                            <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                        </svg>
                                        <span className='text-sm sm:text-base text-gray-600'>Available</span>
                                    </div>
                                </div>
                                <div className='bg-primary/10 rounded-xl p-4 mb-4'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm sm:text-base font-medium text-gray-700'>Consultation Fee</span>
                                        <span className='text-lg sm:text-xl font-bold text-primary'>{currencySymbol}{docInfo.fees}</span>
                                    </div>
                                </div>
                                <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>{docInfo.about}</p>
                </div>
                    </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className='lg:col-span-2'>
                        <div className='bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-6'>Select Payment Method</h3>
                            <div className='space-y-4'>
                                <label className='flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50 transition-colors'>
                                    <input
                                        type='radio'
                                        name='paymentMethod'
                                        value='upi'
                                        checked={paymentMethod === 'upi'}
                                        onChange={() => setPaymentMethod('upi')}
                                        className='text-primary'
                                    />
                                    <div className='flex items-center gap-2'>
                                        <svg className='w-5 h-5 text-green-600' fill='currentColor' viewBox='0 0 24 24'>
                                            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/>
                                        </svg>
                                        <span className='font-medium'>UPI Payment</span>
                                    </div>
                                </label>
                                
                                <label className='flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50 transition-colors'>
                                <input
                                    type='radio'
                                    name='paymentMethod'
                                    value='stripe'
                                    checked={paymentMethod === 'stripe'}
                                    onChange={() => setPaymentMethod('stripe')}
                                        className='text-primary'
                                    />
                                    <div className='flex items-center gap-2'>
                                        <svg className='w-5 h-5 text-blue-600' fill='currentColor' viewBox='0 0 24 24'>
                                            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/>
                                        </svg>
                                        <span className='font-medium'>Credit/Debit Card</span>
                                    </div>
                            </label>
                                
                                <label className='flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50 transition-colors'>
                                <input
                                    type='radio'
                                    name='paymentMethod'
                                    value='cash'
                                    checked={paymentMethod === 'cash'}
                                    onChange={() => setPaymentMethod('cash')}
                                        className='text-primary'
                                    />
                                    <div className='flex items-center gap-2'>
                                        <svg className='w-5 h-5 text-gray-600' fill='currentColor' viewBox='0 0 24 24'>
                                            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/>
                                        </svg>
                                        <span className='font-medium'>Cash at Clinic</span>
                                    </div>
                            </label>
                </div>
            </div>

            {/* Booking slots */}
                        <div className='mt-8'>
                            <p className='text-lg font-medium text-[#565656] mb-4'>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                                {docSlots.length > 0 && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                                {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => (
                                    <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>
                                        {item.time.toLowerCase()}
                                    </p>
                                ))}
                            </div>

                            <button 
                                onClick={bookAppointment} 
                                disabled={!slotTime}
                                className={`text-sm font-light px-20 py-3 rounded-full my-6 ${slotTime ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            >
                                Book an appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* UPI Payment Modal */}
            {showUpiModal && (
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
                                    <p className="text-2xl font-bold text-green-800">₹{amount}</p>
                                </div>
                                
                                {/* UPI ID Display */}
                                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                                    <p className="text-sm text-gray-600 mb-1">UPI ID:</p>
                                    <p className="font-mono text-lg font-bold text-primary">{upiId}</p>
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
                                    <li>• Share the screenshot with us for confirmation</li>
                                </ul>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setShowUpiModal(false)}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleUpiPayment}
                                    className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Book Appointment
                                </button>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-4">
                                💡 Your appointment will be confirmed once payment is verified
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Listing Related Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null;
}

export default Appointment