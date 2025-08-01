import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [appointments, setAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [dashData, setDashData] = useState(false)

    // Update aToken when localStorage changes
    useEffect(() => {
        const storedToken = localStorage.getItem('aToken')
        if (storedToken && storedToken !== aToken) {
            console.log('AdminContext - Updating aToken from localStorage:', storedToken)
            setAToken(storedToken)
        }
    }, [aToken])

    // Function to refresh token from localStorage
    const refreshToken = () => {
        const storedToken = localStorage.getItem('aToken')
        console.log('AdminContext - Refreshing token from localStorage:', storedToken)
        setAToken(storedToken || '')
        return storedToken
    }

    // Getting all Doctors data from Database using API
    const getAllDoctors = async () => {
        try {
            console.log('getAllDoctors - aToken:', aToken)
            console.log('getAllDoctors - Headers:', { aToken })
            
            const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log('getAllDoctors error:', error)
            toast.error(error.message)
        }
    }

    // Function to change doctor availablity using API
    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    // Getting all appointment data from Database using API
    const getAllAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting all Patients data from Database using API
    const getAllPatients = async () => {
        try {
            console.log('getAllPatients - aToken:', aToken)
            console.log('getAllPatients - Headers:', { aToken })
            
            const { data } = await axios.get(backendUrl + '/api/admin/patients', { headers: { aToken } })
            if (data.success) {
                setPatients(data.patients)
                return data.patients
            } else {
                toast.error(data.message)
                return []
            }
        } catch (error) {
            console.log('getAllPatients error:', error)
            toast.error(error.message)
            return []
        }
    }

    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {
            console.log('getDashData - aToken:', aToken)
            console.log('getDashData - Headers:', { aToken })
            
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

            if (data.success) {
                console.log('Dashboard data received:', data.dashData)
                setDashData(data.dashData)
            } else {
                console.log('Dashboard data error:', data.message)
                toast.error(data.message)
            }

        } catch (error) {
            console.log('getDashData error:', error)
            toast.error(error.message)
        }
    }

    const value = {
        aToken, setAToken, refreshToken,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        getAllAppointments,
        patients,
        getAllPatients,
        getDashData,
        cancelAppointment,
        dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider