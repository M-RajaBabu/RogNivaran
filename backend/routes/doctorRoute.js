import express from 'express'
import { registerDoctor, loginDoctor, getDoctorProfile, getDoctorAppointments, completeAppointment, cancelAppointment, updateDoctorProfile, changePassword } from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'
import upload from '../middleware/multer.js'

const router = express.Router()

// Public routes
router.post('/register', registerDoctor)
router.post('/login', loginDoctor)

// Protected routes (require doctor authentication)
router.post('/profile', authDoctor, getDoctorProfile)
router.get('/appointments', authDoctor, getDoctorAppointments)
router.post('/complete-appointment', authDoctor, completeAppointment)
router.post('/cancel-appointment', authDoctor, cancelAppointment)
router.post('/update-profile', upload.single('image'), authDoctor, updateDoctorProfile)
router.post('/change-password', authDoctor, changePassword)

export default router