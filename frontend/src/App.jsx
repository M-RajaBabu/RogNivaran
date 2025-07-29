import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/Admin/Dashboard'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import AllAppointments from './pages/Admin/AllAppointments'
import PatientsList from './pages/Admin/PatientsList'
import AdminNavbar from './components/AdminNavbar'
import DoctorDashboard from './pages/DoctorDashboard'
import DoctorProfile from './pages/DoctorProfile'

const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-1'>
      <ToastContainer />
      <Navbar />
        <main>
      <Routes>
            {/* Full-width pages (no padding) */}
        <Route path='/login' element={<Login />} />
            <Route path='/admin/login' element={<AdminLogin />} />
            
            {/* Pages with padding */}
            <Route path='/' element={<div className="main-content"><Home /></div>} />
            <Route path='/doctors' element={<div className="main-content"><Doctors /></div>} />
            <Route path='/doctors/:speciality' element={<div className="main-content"><Doctors /></div>} />
            <Route path='/about' element={<div className="main-content"><About /></div>} />
            <Route path='/contact' element={<div className="main-content"><Contact /></div>} />
            <Route path='/privacy-policy' element={<div className="main-content"><PrivacyPolicy /></div>} />
            <Route path='/terms-of-service' element={<div className="main-content"><TermsOfService /></div>} />
            <Route path='/appointment/:docId' element={<div className="main-content"><Appointment /></div>} />
            <Route path='/my-appointments' element={<div className="main-content"><MyAppointments /></div>} />
            <Route path='/my-profile' element={<div className="main-content"><MyProfile /></div>} />
            <Route path='/verify' element={<div className="main-content"><Verify /></div>} />
            
            {/* Admin routes */}
            <Route path='/admin/dashboard' element={<div className="main-content"><AdminNavbar /><AdminDashboard /></div>} />
            <Route path='/admin/add-doctor' element={<div className="main-content"><AdminNavbar /><AddDoctor /></div>} />
            <Route path='/admin/doctors-list' element={<div className="main-content"><AdminNavbar /><DoctorsList /></div>} />
            <Route path='/admin/patients-list' element={<div className="main-content"><AdminNavbar /><PatientsList /></div>} />
            <Route path='/admin/all-appointments' element={<div className="main-content"><AdminNavbar /><AllAppointments /></div>} />
            
            {/* Doctor routes */}
            <Route path='/doctor/dashboard' element={<div className="main-content"><DoctorDashboard /></div>} />
            <Route path='/doctor/profile' element={<div className="main-content"><DoctorProfile /></div>} />
      </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default App