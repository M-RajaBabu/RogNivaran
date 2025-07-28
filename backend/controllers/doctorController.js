import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary';

// API to register doctor
const registerDoctor = async (req, res) => {
    try {
        const { name, email, password, image, speciality, degree, experience, about, fees, address } = req.body;

        // checking for all data to register doctor
        if (!name || !email || !password || !image || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            date: Date.now(),
            available: true,
            slots_booked: {}
        }

        const newDoctor = new doctorModel(doctorData)
        const doctor = await newDoctor.save()
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login doctor
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: "Doctor does not exist" })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor profile data
const getDoctorProfile = async (req, res) => {
    try {
        const { doctorId } = req.body
        const doctorData = await doctorModel.findById(doctorId).select('-password')

        res.json({ success: true, doctorData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor appointments
const getDoctorAppointments = async (req, res) => {
    try {
        const { doctorId } = req.body

        const appointments = await appointmentModel.find({ docId: doctorId })
            .populate('userId', 'name email image')
            .populate('docId', 'name speciality degree experience image')

        const doctorInfo = await doctorModel.findById(doctorId).select('-password')

        res.json({ 
            success: true, 
            appointments,
            doctorInfo
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to complete appointment
const completeAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentId } = req.body

        const appointment = await appointmentModel.findById(appointmentId)

        if (!appointment) {
            return res.json({ success: false, message: 'Appointment not found' })
        }

        if (appointment.docId.toString() !== doctorId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })

        res.json({ success: true, message: 'Appointment completed successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment (by doctor)
const cancelAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentId } = req.body

        const appointment = await appointmentModel.findById(appointmentId)

        if (!appointment) {
            return res.json({ success: false, message: 'Appointment not found' })
        }

        if (appointment.docId.toString() !== doctorId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // Remove the slot from doctor's booked slots
        const doctor = await doctorModel.findById(doctorId)
        if (doctor.slots_booked[appointment.slotDate]) {
            const updatedSlots = doctor.slots_booked[appointment.slotDate].filter(
                slot => slot !== appointment.slotTime
            )
            doctor.slots_booked[appointment.slotDate] = updatedSlots
            await doctor.save()
        }

        res.json({ success: true, message: 'Appointment cancelled successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update doctor profile
const updateDoctorProfile = async (req, res) => {
    try {
        const { doctorId, name, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        if (!name || !speciality || !degree || !experience || !about || !fees) {
            return res.json({ success: false, message: "Required data missing" })
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
            speciality,
            degree,
            experience,
            about,
            fees: parseInt(fees),
            address: parsedAddress
        }

        await doctorModel.findByIdAndUpdate(doctorId, updateData)

        // Handle image upload if provided
        if (imageFile) {
            try {
                // upload image to cloudinary
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
                const imageURL = imageUpload.secure_url

                await doctorModel.findByIdAndUpdate(doctorId, { image: imageURL })
            } catch (uploadError) {
                console.log('Image upload error:', uploadError)
                // Continue without image update if upload fails
            }
        }

        res.json({ success: true, message: 'Profile updated successfully' })

    } catch (error) {
        console.log('Doctor profile update error:', error)
        res.json({ success: false, message: error.message || 'Failed to update profile' })
    }
}

// API to change doctor password
const changePassword = async (req, res) => {
    try {
        const { doctorId, currentPassword, newPassword } = req.body

        const doctor = await doctorModel.findById(doctorId)
        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' })
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, doctor.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Current password is incorrect' })
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        // Update password
        await doctorModel.findByIdAndUpdate(doctorId, { password: hashedPassword })

        res.json({ success: true, message: 'Password changed successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to change doctor availability
const changeAvailablity = async (req, res) => {
    try {
        const { doctorId, available } = req.body

        if (typeof available !== 'boolean') {
            return res.json({ success: false, message: 'Available must be true or false' })
        }

        const doctor = await doctorModel.findById(doctorId)
        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' })
        }

        await doctorModel.findByIdAndUpdate(doctorId, { available })

        res.json({ success: true, message: `Doctor availability updated to ${available}` })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    registerDoctor,
    loginDoctor,
    getDoctorProfile,
    getDoctorAppointments,
    completeAppointment,
    cancelAppointment,
    updateDoctorProfile,
    changePassword,
    changeAvailablity
}