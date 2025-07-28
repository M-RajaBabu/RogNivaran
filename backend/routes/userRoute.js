import express from 'express';
import { loginUser, registerUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, verifyStripe, changePassword, addPrescription, getPrescriptions, deletePrescription, verifyUpiPayment, getUpiPaymentDetails } from '../controllers/userController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';
const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)
userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.get("/appointments", authUser, listAppointment)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)

// Password management
userRouter.post("/change-password", authUser, changePassword)

// Prescription management
userRouter.post("/add-prescription", authUser, addPrescription)
userRouter.get("/prescriptions", authUser, getPrescriptions)
userRouter.delete("/prescription/:prescriptionId", authUser, deletePrescription)

// Payment routes
userRouter.post("/verifyStripe", authUser, verifyStripe)
userRouter.post("/verify-upi", authUser, verifyUpiPayment)
userRouter.get("/upi-payment/:appointmentId", authUser, getUpiPaymentDetails)

export default userRouter;