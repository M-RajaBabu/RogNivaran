import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config() // Use default loading
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// CORS configuration
const allowedOrigins = [
  'https://rog-nivaran-emqa.vercel.app', // your frontend Vercel URL
  'http://localhost:5173' // for local development
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

// middlewares
app.use(express.json())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  console.log("✅ Backend is running with CORS enabled")
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))