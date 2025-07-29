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

// CORS configuration for deployment
const allowedOrigins = [
  'https://rog-nivaran-emqa.vercel.app', // old frontend URL
  'https://rognivaran-frontend.vercel.app', // new frontend URL
  'https://rognivaran.vercel.app', // alternative URL
  'http://localhost:5173', // for local development
  'http://localhost:3000'  // for local development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all Vercel domains
    if (origin && origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}))

// middlewares
app.use(express.json())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString()
  })
})

app.get("/", (req, res) => {
  console.log("✅ Backend is running with CORS enabled")
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))