# 🏥 RogNivaran - Your Trusted Healthcare Appointment Platform

<div align="center">

![RogNivaran Logo](https://img.shields.io/badge/RogNivaran-Healthcare%20Platform-blue?style=for-the-badge&logo=health)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**Revolutionizing Healthcare Access in India** 🚀

*Connecting patients with trusted doctors through innovative appointment booking*

[Live Demo](https://rognivaran.vercel.app) • [Backend API](https://rognivaran.onrender.com) • [Documentation](https://github.com/M-RajaBabu/RogNivaran)

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🖼️ Project Screenshots](#️-project-screenshots)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📱 Features Deep Dive](#-features-deep-dive)
- [🔧 API Endpoints](#-api-endpoints)
- [🎨 UI/UX Highlights](#-uiux-highlights)
- [🔒 Security Features](#-security-features)
- [📊 Performance Metrics](#-performance-metrics)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Overview

**RogNivaran** is a comprehensive healthcare appointment booking platform designed specifically for the Indian market. Our mission is to bridge the gap between patients and healthcare providers, making quality healthcare accessible to everyone.

### 🎯 **Our Vision**
- **Democratize Healthcare Access** - Make quality healthcare available to all
- **Digital Transformation** - Modernize the traditional appointment booking process
- **Patient-Centric Approach** - Focus on user experience and convenience
- **Trust & Transparency** - Verified doctors and secure payment systems

---

## ✨ Key Features

### 🏠 **Smart Home Experience**
- **Intuitive Navigation** - Seamless user journey from landing to booking
- **Specialty-Based Search** - Find doctors by medical specialties
- **Real-Time Availability** - Live slot booking with instant confirmation
- **Responsive Design** - Works perfectly on all devices

### 👨‍⚕️ **Doctor Management**
- **Verified Profiles** - All doctors are thoroughly vetted
- **Specialty Classification** - Organized by medical specialties
- **Detailed Profiles** - Experience, qualifications, and patient reviews
- **Availability Tracking** - Real-time slot management

### 💳 **Multi-Payment Integration**
- **UPI Payments** - Native Indian payment method with QR codes
- **Card Payments** - Stripe and Razorpay integration
- **Cash Payments** - Traditional payment option
- **Secure Transactions** - End-to-end encrypted payments

### 📱 **Patient Portal**
- **Appointment Management** - Book, reschedule, and cancel appointments
- **Payment History** - Complete transaction records
- **Profile Management** - Personal and medical information
- **Prescription Storage** - Digital medical records

### 🔧 **Admin Dashboard**
- **Doctor Management** - Add, edit, and manage doctor profiles
- **Patient Analytics** - Comprehensive patient data insights
- **Appointment Overview** - Real-time appointment tracking
- **Revenue Analytics** - Payment and earnings reports

---

## 🖼️ Project Screenshots

### 🏠 **Home Page Experience**

<div align="center">
<img src="https://rognivaran.vercel.app/Home%20Page%201.png" alt="RogNivaran Home Page" width="800" />

*Our welcoming homepage showcases the platform's core features with a modern, clean design that immediately builds trust with users.*

<img src="https://rognivaran.vercel.app/Home%20Page%202.png" alt="RogNivaran Home Page Features" width="800" />

*The second section highlights our key differentiators: verified doctors, instant booking, and secure payments.*
</div>

### 👨‍⚕️ **Doctor Discovery & Booking**

<div align="center">
<img src="https://rognivaran.vercel.app/All%20Doctors.png" alt="All Doctors Page" width="800" />

*Comprehensive doctor listing with specialty filters, ratings, and detailed information to help patients make informed decisions.*

<img src="https://rognivaran.vercel.app/Doctor%20Profile%20%20and%20Booking%20Appointment.png" alt="Doctor Profile and Booking" width="800" />

*Detailed doctor profiles with booking interface, showing available slots, fees, and appointment scheduling process.*
</div>

### 🔐 **Authentication System**

<div align="center">
<img src="https://rognivaran.vercel.app/Sign%20and%20Signup.png" alt="Login and Registration" width="800" />

*Secure authentication system with separate flows for patients, doctors, and administrators. Features include email verification, password strength validation, and role-based access control.*
</div>

### 💳 **Payment Processing**

<div align="center">
<img src="https://rognivaran.vercel.app/Payments.png" alt="Payment Methods" width="800" />

*Multi-payment gateway integration supporting UPI (with QR codes), credit/debit cards (Stripe & Razorpay), and cash payments. Real-time payment verification and confirmation.*
</div>

### 📱 **Patient Dashboard**

<div align="center">
<img src="https://rognivaran.vercel.app/My%20Appointments.png" alt="My Appointments" width="800" />

*Comprehensive appointment management interface showing upcoming appointments, payment status, and appointment history with easy cancellation options.*

<img src="https://rognivaran.vercel.app/User%20Profile.png" alt="User Profile" width="800" />

*Detailed user profile management with personal information, medical history, prescription storage, and account settings.*
</div>

### 🎛️ **Admin Control Panel**

<div align="center">
<img src="https://rognivaran.vercel.app/Admin%20Panel.png" alt="Admin Dashboard" width="800" />

*Powerful admin dashboard with real-time analytics, doctor management, patient overview, and comprehensive system monitoring capabilities.*
</div>

### 📖 **About & Information**

<div align="center">
<img src="https://rognivaran.vercel.app/About%201.png" alt="About Section 1" width="800" />

*Informative about section explaining our mission, values, and commitment to healthcare accessibility.*

<img src="https://rognivaran.vercel.app/About%202.png" alt="About Section 2" width="800" />

*Detailed information about our services, team, and the technology behind RogNivaran.*
</div>

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React.js)    │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • User Interface│    │ • API Endpoints │    │ • User Data     │
│ • State Mgmt    │    │ • Authentication│    │ • Doctor Data   │
│ • Routing       │    │ • Business Logic│    │ • Appointments  │
│ • Components    │    │ • File Upload   │    │ • Payments      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Payment       │    │   File Storage  │    │   Email Service │
│   Gateways      │    │   (Cloudinary)  │    │   (Nodemailer)  │
│                 │    │                 │    │                 │
│ • Stripe        │    │ • Image Upload  │    │ • Notifications │
│ • Razorpay      │    │ • File Mgmt     │    │ • Confirmations │
│ • UPI           │    │ • CDN Delivery  │    │ • Reminders     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🛠️ Tech Stack

### **Frontend Technologies**
- **React.js 18.2.0** - Modern UI framework with hooks and context
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS 3.3.0** - Utility-first CSS framework
- **React Router 6** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **React Toastify** - User notification system

### **Backend Technologies**
- **Node.js 18.0.0** - Server-side JavaScript runtime
- **Express.js 4.18.2** - Web application framework
- **MongoDB 6.0** - NoSQL database for flexible data storage
- **Mongoose 7.5.0** - MongoDB object modeling tool
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing and security

### **Payment Integration**
- **Stripe** - International payment processing
- **Razorpay** - Indian payment gateway
- **UPI** - Unified Payments Interface with QR codes

### **File Storage & CDN**
- **Cloudinary** - Cloud-based image and video management
- **Multer** - File upload middleware

### **Development & Deployment**
- **Git** - Version control system
- **Vercel** - Frontend deployment platform
- **Render** - Backend deployment platform
- **ESLint** - Code quality and consistency

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18.0.0 or higher
- MongoDB 6.0 or higher
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/M-RajaBabu/RogNivaran.git
   cd RogNivaran
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Frontend (.env)
   VITE_BACKEND_URL=http://localhost:5000

   # Backend (.env)
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ADMIN_EMAIL=admin@rognivaran.com
   ADMIN_PASSWORD=admin123456
   ```

4. **Start development servers**
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server (in new terminal)
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 📱 Features Deep Dive

### **🔍 Smart Doctor Discovery**
- **Specialty-Based Filtering** - Find doctors by medical specialties
- **Location-Based Search** - Filter by city and area
- **Rating & Review System** - Patient feedback and ratings
- **Availability Calendar** - Real-time slot availability
- **Detailed Profiles** - Experience, qualifications, and specializations

### **📅 Advanced Appointment System**
- **Real-Time Slot Booking** - Instant appointment confirmation
- **Flexible Scheduling** - 30-minute time slots throughout the day
- **Conflict Prevention** - Prevents double booking
- **Reminder System** - Email and SMS notifications
- **Cancellation Policy** - Easy appointment cancellation

### **💳 Secure Payment Processing**
- **Multi-Gateway Support** - Stripe, Razorpay, and UPI
- **QR Code Integration** - Native UPI QR code scanning
- **Payment Verification** - Real-time transaction verification
- **Refund Processing** - Automated refund handling
- **Transaction History** - Complete payment records

### **👤 User Management**
- **Role-Based Access** - Patient, Doctor, and Admin roles
- **Profile Management** - Personal and medical information
- **Prescription Storage** - Digital medical records
- **Appointment History** - Complete appointment tracking
- **Security Features** - Password protection and data encryption

### **🎛️ Admin Dashboard**
- **Doctor Management** - Add, edit, and manage doctor profiles
- **Patient Analytics** - Comprehensive patient insights
- **Revenue Tracking** - Payment and earnings analytics
- **System Monitoring** - Real-time system health checks
- **User Management** - Patient and doctor account management

---

## 🔧 API Endpoints

### **Authentication**
```
POST /api/user/register     - User registration
POST /api/user/login        - User login
POST /api/doctor/login      - Doctor login
POST /api/admin/login       - Admin login
```

### **User Management**
```
GET  /api/user/profile      - Get user profile
PUT  /api/user/profile      - Update user profile
GET  /api/user/appointments - Get user appointments
```

### **Doctor Management**
```
GET  /api/doctors           - Get all doctors
GET  /api/doctors/:id       - Get specific doctor
POST /api/doctors           - Add new doctor (admin)
PUT  /api/doctors/:id       - Update doctor (admin)
```

### **Appointment Management**
```
POST /api/user/book-appointment    - Book appointment
POST /api/user/cancel-appointment  - Cancel appointment
GET  /api/user/appointments        - Get appointments
```

### **Payment Processing**
```
POST /api/user/payment-stripe      - Stripe payment
POST /api/user/payment-razorpay    - Razorpay payment
POST /api/user/verify-upi          - UPI payment verification
```

### **Admin Endpoints**
```
GET  /api/admin/dashboard          - Admin dashboard data
GET  /api/admin/doctors            - All doctors (admin)
GET  /api/admin/patients           - All patients (admin)
GET  /api/admin/appointments       - All appointments (admin)
```

---

## 🎨 UI/UX Highlights

### **🎯 Design Philosophy**
- **Patient-Centric Design** - Every feature designed with patient needs in mind
- **Accessibility First** - WCAG compliant design for all users
- **Mobile-First Approach** - Optimized for mobile devices
- **Intuitive Navigation** - Easy-to-use interface for all age groups

### **🎨 Visual Design**
- **Modern Aesthetics** - Clean, professional medical platform design
- **Color Psychology** - Trust-building blue and green color scheme
- **Typography** - Readable fonts optimized for medical content
- **Iconography** - Medical-themed icons for better understanding

### **📱 Responsive Design**
- **Mobile Optimization** - Perfect experience on smartphones
- **Tablet Compatibility** - Optimized for tablet devices
- **Desktop Experience** - Full-featured desktop interface
- **Cross-Browser Support** - Works on all modern browsers

---

## 🔒 Security Features

### **🔐 Authentication & Authorization**
- **JWT Tokens** - Secure session management
- **Role-Based Access** - Different permissions for different user types
- **Password Hashing** - Bcrypt encryption for passwords
- **Token Expiration** - Automatic session timeout

### **🛡️ Data Protection**
- **Input Validation** - Server-side validation for all inputs
- **SQL Injection Prevention** - Parameterized queries
- **XSS Protection** - Content Security Policy
- **CSRF Protection** - Cross-Site Request Forgery prevention

### **💳 Payment Security**
- **PCI Compliance** - Payment Card Industry standards
- **Encrypted Transactions** - End-to-end payment encryption
- **Secure Gateways** - Trusted payment processors
- **Fraud Detection** - Transaction monitoring

---

## 📊 Performance Metrics

### **⚡ Speed Optimization**
- **Lazy Loading** - Images and components load on demand
- **Code Splitting** - Smaller bundle sizes for faster loading
- **CDN Delivery** - Global content delivery network
- **Caching Strategy** - Browser and server-side caching

### **📈 Scalability**
- **Microservices Ready** - Modular architecture for scaling
- **Database Optimization** - Indexed queries for faster performance
- **Load Balancing** - Ready for horizontal scaling
- **Monitoring** - Real-time performance monitoring

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **🐛 Bug Reports**
- Use the GitHub issue tracker
- Provide detailed reproduction steps
- Include browser and device information

### **💡 Feature Requests**
- Describe the feature in detail
- Explain the use case and benefits
- Consider implementation complexity

### **🔧 Code Contributions**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### **📚 Documentation**
- Improve README sections
- Add API documentation
- Create user guides

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React.js Team** - For the amazing frontend framework
- **Node.js Community** - For the robust backend ecosystem
- **MongoDB Team** - For the flexible database solution
- **Tailwind CSS** - For the utility-first CSS framework
- **All Contributors** - For making this project better

---

<div align="center">

**Made with ❤️ by [Raja Babu Meena](https://github.com/M-RajaBabu)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Raja%20Babu%20Meena-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/rajababumeena/)
[![Twitter](https://img.shields.io/badge/Twitter-@RBMRAJA-blue?style=flat-square&logo=twitter)](https://x.com/RBMRAJA)

**Project is done by Raja Babu Meena** 🚀

*Revolutionizing healthcare, one appointment at a time* 🏥

</div>
