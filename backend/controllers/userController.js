import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary'
import { getStripeInstance, getRazorpayInstance, isStripeConfigured, isRazorpayConfigured } from '../config/payment.js';

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" })
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists with this email" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.status(201).json({ success: true, token })

    } catch (error) {
        console.log('Registration error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.status(200).json({ success: true, token })
        }
        else {
            res.status(401).json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log('Login error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        // Parse address safely
        let parsedAddress = { line1: '', line2: '' }
        try {
            if (address && typeof address === 'string') {
                parsedAddress = JSON.parse(address)
            } else if (address && typeof address === 'object') {
                parsedAddress = address
            }
        } catch (parseError) {
            console.log('Address parse error:', parseError)
            // Use default address if parsing fails
        }

        const updateData = { 
            name, 
            phone, 
            address: parsedAddress, 
            dob, 
            gender 
        }

        await userModel.findByIdAndUpdate(userId, updateData)

        if (imageFile) {
            try {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
            } catch (uploadError) {
                console.log('Image upload error:', uploadError)
                // Continue without image update if upload fails
            }
        }

        res.json({ success: true, message: 'Profile Updated Successfully' })

    } catch (error) {
        console.log('Profile update error:', error)
        res.json({ success: false, message: error.message || 'Failed to update profile' })
    }
}

// API to book appointment 
const bookAppointment = async (req, res) => {

    try {

        const { userId, docId, slotDate, slotTime, paymentMethod, doctorImage } = req.body
        
        // Handle string doctor IDs from frontend static data
        let actualDocId = docId;
        let docData = null;
        
        // If it's a string ID like "doc1", "doc2", etc., we need to find the doctor by name
        if (typeof docId === 'string' && docId.startsWith('doc')) {
            // Mapping of string IDs to doctor names and their actual images from frontend assets
            const doctorMapping = {
                'doc1': {
                    name: 'Dr. Raja Babu Meena',
                    image: 'https://rognivaran.vercel.app/static/media/doc1.12345678.png', // This will be replaced with actual image URL
                    speciality: 'Neuro Surgeon',
                    degree: 'MBBS, MD from AIIMS Delhi',
                    experience: '8 Years',
                    about: 'Dr. Raja Babu Meena is a dedicated neuro surgeon with expertise in brain and spinal cord surgeries. He provides comprehensive neurological care services.',
                    fees: 600
                },
                'doc2': {
                    name: 'Dr. Harshad',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Harshad.12345678.png',
                    speciality: 'Gynecologist',
                    degree: 'MBBS, DGO, FICOG from King\'s College London',
                    experience: '12 Years',
                    about: 'Dr. Harshad is a senior gynecologist specializing in women\'s reproductive health, pregnancy care, and gynecological surgeries.',
                    fees: 1200
                },
                'doc3': {
                    name: 'Dr. Brajesh',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Brajesh.12345678.png',
                    speciality: 'Dermatologist',
                    degree: 'MBBS, MD (Dermatology) from AIIMS New Delhi',
                    experience: '6 Years',
                    about: 'Dr. Brajesh is a skilled dermatologist specializing in skin disorders, cosmetic dermatology, and laser treatments.',
                    fees: 800
                },
                'doc4': {
                    name: 'Dr. Preetham Gowda',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Preetham Gowda.12345678.png',
                    speciality: 'Pediatrician',
                    degree: 'MBBS, MD (Pediatrics) from Harvard Medical School',
                    experience: '10 Years',
                    about: 'Dr. Preetham Gowda specializes in child healthcare, vaccination, and developmental pediatrics with a gentle approach.',
                    fees: 700
                },
                'doc5': {
                    name: 'Dr. Maharana Ankit',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Maharana Ankit.12345678.png',
                    speciality: 'Neurologist',
                    degree: 'MBBS, MD (Neurology) from AIIMS Delhi',
                    experience: '9 Years',
                    about: 'Dr. Maharana Ankit is a specialized neurologist with expertise in treating complex neurological disorders and brain-related conditions.',
                    fees: 1000
                },
                'doc6': {
                    name: 'Dr. Shubham Patil',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Shubham Patil.12345678.png',
                    speciality: 'Cardiologist',
                    degree: 'MBBS, MD (Cardiology) from PGIMER Chandigarh',
                    experience: '11 Years',
                    about: 'Dr. Shubham Patil is a cardiologist specializing in heart diseases, cardiac procedures, and preventive cardiology.',
                    fees: 1500
                },
                'doc7': {
                    name: 'Dr. Deepak Meena',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Deepak Meena.12345678.png',
                    speciality: 'Orthopedic Surgeon',
                    degree: 'MBBS, MS (Orthopedics) from AIIMS Delhi',
                    experience: '7 Years',
                    about: 'Dr. Deepak Meena specializes in orthopedic surgery, joint replacements, and sports medicine.',
                    fees: 1300
                },
                'doc8': {
                    name: 'Dr. Suhas',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Suhas.12345678.png',
                    speciality: 'Psychiatrist',
                    degree: 'MBBS, MD (Psychiatry) from NIMHANS Bangalore',
                    experience: '8 Years',
                    about: 'Dr. Suhas is a psychiatrist specializing in mental health disorders, therapy, and psychiatric medications.',
                    fees: 900
                },
                'doc9': {
                    name: 'Dr. Homayra Erin',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Homayra Erin.12345678.png',
                    speciality: 'Gastroenterologist',
                    degree: 'MBBS, MD (Gastroenterology) from AIIMS Delhi',
                    experience: '10 Years',
                    about: 'Dr. Homayra Erin specializes in digestive system disorders, endoscopy, and gastrointestinal procedures.',
                    fees: 1100
                },
                'doc10': {
                    name: 'Dr. Ananya Meena',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Ananya Meena.12345678.png',
                    speciality: 'Ophthalmologist',
                    degree: 'MBBS, MS (Ophthalmology) from AIIMS Delhi',
                    experience: '6 Years',
                    about: 'Dr. Ananya Meena is an ophthalmologist specializing in eye care, vision correction, and eye surgeries.',
                    fees: 950
                },
                'doc11': {
                    name: 'Dr. Himanshu Meena',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Himanshu Meena.12345678.png',
                    speciality: 'ENT Specialist',
                    degree: 'MBBS, MS (ENT) from AIIMS Delhi',
                    experience: '7 Years',
                    about: 'Dr. Himanshu Meena specializes in ear, nose, and throat disorders and related surgeries.',
                    fees: 850
                },
                'doc12': {
                    name: 'Dr. Raghevendra',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Raghevendra.12345678.png',
                    speciality: 'Urologist',
                    degree: 'MBBS, MS (Urology) from AIIMS Delhi',
                    experience: '9 Years',
                    about: 'Dr. Raghevendra is a urologist specializing in urinary system disorders and urological surgeries.',
                    fees: 1200
                },
                'doc13': {
                    name: 'Dr. Test Doctor',
                    image: 'https://rognivaran.vercel.app/static/media/doc16.12345678.png',
                    speciality: 'General Physician',
                    degree: 'MBBS, MD from AIIMS Delhi',
                    experience: '6 Years',
                    about: 'Dr. Test Doctor is a general physician providing comprehensive primary healthcare services.',
                    fees: 550
                },
                'doc14': {
                    name: 'Dr. Gayatri',
                    image: 'https://rognivaran.vercel.app/static/media/doc11.12345678.png',
                    speciality: 'Physiotherapist',
                    degree: 'BPT, MPT (Sports) from University of Melbourne',
                    experience: '12 Years',
                    about: 'Dr. Gayatri specializes in sports physiotherapy, rehabilitation, and pain management techniques.',
                    fees: 400
                },
                'doc15': {
                    name: 'Dr. Radha Krishnan',
                    image: 'https://rognivaran.vercel.app/static/media/doc5.12345678.png',
                    speciality: 'Ayurvedic Physician',
                    degree: 'BAMS, MD (Ayurveda) from Banaras Hindu University',
                    experience: '18 Years',
                    about: 'Dr. Radha Krishnan is a traditional Ayurvedic physician offering holistic healing and wellness treatments.',
                    fees: 300
                },
                'doc16': {
                    name: 'Dr. Johnny Sins',
                    image: 'https://rognivaran.vercel.app/static/media/johny doctor.12345678.jpg',
                    speciality: 'Gynecologist',
                    degree: 'MBBS, DGO, FICOG from University of Toronto',
                    experience: '12 Years',
                    about: 'Dr. Johnny Sins is a senior gynecologist specializing in women\'s reproductive health, pregnancy care, and gynecological surgeries.',
                    fees: 1200
                },
                'doc17': {
                    name: 'Dr. Harsh',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Hash.12345678.png',
                    speciality: 'Gynecologist',
                    degree: 'MBBS, DGO from AIIMS Delhi',
                    experience: '15 Years',
                    about: 'Dr. Harsh is an experienced gynecologist specializing in women\'s health and pregnancy care.',
                    fees: 1100
                },
                'doc18': {
                    name: 'Dr. Mohan Mantri',
                    image: 'https://rognivaran.vercel.app/static/media/Dr. Mohan Mantri.12345678.png',
                    speciality: 'Gastroenterologist',
                    degree: 'MBBS, MD (Gastroenterology) from Mayo Clinic',
                    experience: '18 Years',
                    about: 'Dr. Mohan Mantri is a senior gastroenterologist with expertise in digestive and liver disorders.',
                    fees: 1300
                },
                'doc19': {
                    name: 'Dr. Saumya',
                    image: 'https://rognivaran.vercel.app/static/media/appointment_img.12345678.png',
                    speciality: 'General Physician',
                    degree: 'MBBS, MD from AIIMS Delhi',
                    experience: '10 Years',
                    about: 'Dr. Saumya provides comprehensive primary healthcare services and preventive medicine.',
                    fees: 450
                }
            };
            
            const doctorInfo = doctorMapping[docId];
            
            if (doctorInfo) {
                // Try to find doctor by name in database
                docData = await doctorModel.findOne({ name: doctorInfo.name });
                
                if (docData) {
                    actualDocId = docData._id;
                    // Update the doctor's image with the one passed from frontend
                    docData.image = doctorImage || doctorInfo.image;
                    await docData.save();
                } else {
                    // If doctor doesn't exist in database, create a new one with static data
                    const staticDoctorData = {
                        name: doctorInfo.name,
                        email: `${doctorInfo.name.toLowerCase().replace(/\s+/g, '.')}@rognivaran.com`,
                        password: await bcrypt.hash('password123', 10), // Default password
                        image: doctorImage || doctorInfo.image, // Use the image passed from frontend, fallback to mapping
                        speciality: doctorInfo.speciality,
                        degree: doctorInfo.degree,
                        experience: doctorInfo.experience,
                        about: doctorInfo.about,
                        fees: doctorInfo.fees,
                        address: { line1: 'India', line2: '' },
                        date: Date.now(),
                        available: true,
                        slots_booked: {}
                    };
                    
                    const newDoctor = new doctorModel(staticDoctorData);
                    docData = await newDoctor.save();
                    actualDocId = docData._id;
                }
            } else {
                return res.json({ success: false, message: 'Doctor not found' });
            }
        } else {
            // If it's already a MongoDB ObjectId, try to find the doctor
            try {
                docData = await doctorModel.findById(docId).select("-password");
            } catch (error) {
                return res.json({ success: false, message: 'Invalid doctor ID format' });
            }
        }

        if (!docData) {
            return res.json({ success: false, message: 'Doctor not found' })
        }

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor Not Available' })
        }

        let slots_booked = docData.slots_booked || {}

        // checking for slot availablity 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        if (!userData) {
            return res.json({ success: false, message: 'User not found' })
        }

        const docDataForAppointment = { ...docData.toObject() };
        delete docDataForAppointment.slots_booked;

        const appointmentData = {
            userId,
            docId: actualDocId, // Use the actual MongoDB ObjectId
            userData,
            docData: docDataForAppointment,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
            paymentMethod,
            payment: paymentMethod === 'upi' ? false : false, // UPI payments are marked as pending initially
            upiId: req.body.upiId || null, // Store UPI ID if provided
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(actualDocId, { slots_booked })

        if(paymentMethod === 'stripe'){
             // API to make payment of appointment using Stripe
            const { origin } = req.headers

            // Check if Stripe is configured
            if (!isStripeConfigured()) {
                return res.json({ 
                    success: false, 
                    message: 'Stripe payment is not configured. Please contact administrator.' 
                });
            }

            const stripe = getStripeInstance();
            if (!stripe) {
                return res.json({ 
                    success: false, 
                    message: 'Payment gateway initialization failed. Please try again.' 
                });
            }

            const currency = process.env.CURRENCY?.toLowerCase() || 'inr'
    
            const line_items = [{
                price_data: {
                    currency,
                    product_data: {
                        name: "Appointment Fees"
                    },
                    unit_amount: appointmentData.amount * 100
                },
                quantity: 1
            }]
    
            try {
                const session = await stripe.checkout.sessions.create({
                success_url: `${origin}/verify?success=true&appointmentId=${newAppointment._id}`,
                cancel_url: `${origin}/verify?success=false&appointmentId=${newAppointment._id}`,
                line_items: line_items,
                mode: 'payment',
            })

            res.json({ success: true, session_url: session.url });
            } catch (stripeError) {
                console.error('Stripe payment error:', stripeError);
                res.json({ 
                    success: false, 
                    message: 'Payment processing failed. Please try again or contact support.' 
                });
            }

        } else if(paymentMethod === 'upi') {
            // Handle UPI payment
            res.json({ 
                success: true, 
                message: 'Appointment booked! Please complete UPI payment.',
                appointmentId: newAppointment._id,
                upiId: appointmentData.upiId,
                amount: appointmentData.amount
            });
        } else {
            res.json({ success: true, message: 'Appointment Booked Successfully' })
        }

    } catch (error) {
        console.log('Appointment booking error:', error)
        res.json({ success: false, message: error.message || 'Booking failed' })
    }

}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user 
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot 
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify payment of stripe
const verifyStripe = async (req, res) => {
    try {

        const { appointmentId, success } = req.body

        if (success === "true") {
            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
            return res.json({ success: true, message: 'Payment Successful' })
        }

        res.json({ success: false, message: 'Payment Failed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change password
const changePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body

        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Current password is incorrect' })
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        // Update password
        await userModel.findByIdAndUpdate(userId, { password: hashedPassword })

        res.json({ success: true, message: 'Password changed successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to add prescription
const addPrescription = async (req, res) => {
    try {
        const { userId, prescription } = req.body

        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        // Add prescription to user's prescriptions array
        if (!user.prescriptions) {
            user.prescriptions = []
        }
        user.prescriptions.push({
            prescription,
            date: Date.now()
        })
        await user.save()

        res.json({ success: true, message: 'Prescription added successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get prescriptions
const getPrescriptions = async (req, res) => {
    try {
        const { userId } = req.body

        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        res.json({ success: true, prescriptions: user.prescriptions || [] })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to delete prescription
const deletePrescription = async (req, res) => {
    try {
        const { userId } = req.body
        const { prescriptionId } = req.params

        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        // Remove prescription from array
        user.prescriptions = user.prescriptions.filter(
            prescription => prescription._id.toString() !== prescriptionId
        )
        await user.save()

        res.json({ success: true, message: 'Prescription deleted successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify UPI payment
const verifyUpiPayment = async (req, res) => {
    try {
        const { appointmentId, transactionId, screenshot } = req.body;
        
        if (!appointmentId || !transactionId) {
            return res.json({ success: false, message: 'Missing required details' });
        }

        const appointment = await appointmentModel.findById(appointmentId);
        
        if (!appointment) {
            return res.json({ success: false, message: 'Appointment not found' });
        }

        // Update appointment with payment details
        await appointmentModel.findByIdAndUpdate(appointmentId, {
            payment: true,
            upiTransactionId: transactionId,
            paymentScreenshot: screenshot,
            paymentVerifiedAt: Date.now()
        });

        res.json({ 
            success: true, 
            message: 'UPI payment verified successfully! Your appointment is confirmed.' 
        });

    } catch (error) {
        console.log('UPI payment verification error:', error);
        res.json({ success: false, message: error.message || 'Payment verification failed' });
    }
}

// API to get UPI payment details
const getUpiPaymentDetails = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        
        const appointment = await appointmentModel.findById(appointmentId);
        
        if (!appointment) {
            return res.json({ success: false, message: 'Appointment not found' });
        }

        if (appointment.paymentMethod !== 'upi') {
            return res.json({ success: false, message: 'This appointment is not a UPI payment' });
        }

        res.json({
            success: true,
            data: {
                amount: appointment.amount,
                upiId: appointment.upiId,
                payment: appointment.payment,
                paymentMethod: appointment.paymentMethod
            }
        });

    } catch (error) {
        console.log('Get UPI payment details error:', error);
        res.json({ success: false, message: error.message || 'Failed to get payment details' });
    }
}

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    changePassword,
    addPrescription,
    getPrescriptions,
    deletePrescription,
    // paymentRazorpay,
    // verifyRazorpay,
    // paymentStripe,
    verifyStripe,
    verifyUpiPayment,
    getUpiPaymentDetails
}