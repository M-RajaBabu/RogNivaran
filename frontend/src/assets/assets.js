import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo_rog.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import patient_icon from './patient_icon.png'
import doctor_icon from './doctor icon.png'
import twitterXIcon from './twitter-x icon.jpeg'

// Available doctor images
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc5 from './doc5.png'
import doc9 from './doc9.png'
import doc11 from './doc11.png'
import doc13 from './doc13.png'
import doc16 from './doc16.png'
import johnyDoctor from './johny doctor.jpg'

// New doctor images
import drRaghevendra from './dr/Dr. Raghevendra.png'
import drHarshad from './dr/Dr. Harshad.png'
import drBrajesh from './dr/Dr. Brajesh.png'
import drPreetham from './dr/Dr. Preetham Gowda.png'
import drMaharana from './dr/Dr. Maharana Ankit.png'
import drShubham from './dr/Dr. Shubham Patil.png'
import drDeepak from './dr/Dr. Deepak Meena.png'
import drSuhas from './dr/Dr. Suhas.png'
import drHomayra from './dr/Dr. Homayra Erin.png'
import drAnanya from './dr/Dr. Ananya Meena.png'
import drHimanshu from './dr/Dr. Himanshu Meena.png'
import drHash from './dr/Dr. Hash.png'
import drMohanMantri from './dr/Dr. Mohan Mantri.png'

// Branch images
import mumbaiBranch from './branches/Mumbai.webp'
import delhiBranch from './branches/Delhi.webp'
import bangaloreBranch from './branches/Banglore.jpg'
import hyderabadBranch from './branches/Hyderabad.jpg'
import chennaiBranch from './branches/Chennai.webp'
import kolkataBranch from './branches/Kolkata.jpeg'
import puneBranch from './branches/Pune.webp'
import ahmedabadBranch from './branches/AHMEDABAD.jpg'
import jaipurBranch from './branches/jaipur.jpeg'
import lucknowBranch from './branches/Lucknow.jpg'
import chandigarhBranch from './branches/chandigarh.jpg'
import indoreBranch from './branches/indore.jpg'

import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import NeuroSurgeon from './NeuroSurgeon.svg'
import Pediatricians from './Pediatricians.svg'
// Import SVGs for new specialties
// import Ayurveda from './Ayurveda.svg'
// import Homeopathy from './Homeopathy.svg'


export const assets = {
    appointment_img,
    header_img,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    about_image2: doc16, // new image for About section
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    patient_icon,
    doctor_icon,
    twitterXIcon,
    mumbaiBranch,
    delhiBranch,
    bangaloreBranch,
    hyderabadBranch,
    chennaiBranch,
    kolkataBranch,
    puneBranch,
    ahmedabadBranch,
    jaipurBranch,
    lucknowBranch,
    chandigarhBranch,
    indoreBranch
}

export const specialityData = [
    {
        speciality: 'Neuro Surgeon',
        image: NeuroSurgeon
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatrician',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
    {
        speciality: 'Cardiologist',
        image: General_physician // Using existing icon
    },
    {
        speciality: 'Orthopedic Surgeon',
        image: General_physician // Using existing icon
    },
    {
        speciality: 'Psychiatrist',
        image: General_physician // Using existing icon
    },
    {
        speciality: 'Urologist',
        image: General_physician // Using existing icon
    },
    {
        speciality: 'Ophthalmologist',
        image: General_physician // Using existing icon
    },
    {
        speciality: 'ENT Specialist',
        image: General_physician // Using existing icon
    },
    {
        speciality: 'Dentist',
        image: General_physician // Using existing icon
    },
    {
        speciality: 'Physiotherapist',
        image: General_physician // Using existing icon
    },
    {
        speciality: 'Ayurvedic Physician',
        image: General_physician // Using existing icon
    },
    {
        speciality: 'General Physician',
        image: General_physician
    }
]

// Indian doctor data
export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Raja Babu Meena',
        image: doc1,
        speciality: 'Neuro Surgeon',
        degree: 'MBBS, MD from AIIMS Delhi',
        experience: '8 Years',
        about: 'Dr. Raja Babu Meena is a dedicated neuro surgeon with expertise in brain and spinal cord surgeries. He provides comprehensive neurological care services.',
        fees: 600,
        available: true,
        slots_booked: {},
        address: {
            line1: '123, Defence Colony',
            line2: 'New Delhi - 110024'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Harshad',
        image: drHarshad,
        speciality: 'Gynecologist',
        degree: 'MBBS, DGO, FICOG from King\'s College London',
        experience: '12 Years',
        about: 'Dr. Harshad is a senior gynecologist specializing in women\'s reproductive health, pregnancy care, and gynecological surgeries.',
        fees: 1200,
        available: true,
        slots_booked: {},
        address: {
            line1: '45, Koramangala 8th Block',
            line2: 'Bangalore - 560034'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Brajesh',
        image: drBrajesh,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology) from AIIMS New Delhi',
        experience: '6 Years',
        about: 'Dr. Brajesh is a skilled dermatologist specializing in skin disorders, cosmetic dermatology, and laser treatments.',
        fees: 800,
        available: true,
        slots_booked: {},
        address: {
            line1: '789, Anna Salai',
            line2: 'Chennai - 600002'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Preetham Gowda',
        image: drPreetham,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD (Pediatrics) from Harvard Medical School',
        experience: '10 Years',
        about: 'Dr. Preetham Gowda specializes in child healthcare, vaccination, and developmental pediatrics with a gentle approach.',
        fees: 700,
        available: true,
        slots_booked: {},
        address: {
            line1: '567, Satellite',
            line2: 'Ahmedabad - 380015'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Maharana Ankit',
        image: drMaharana,
        speciality: 'Neurologist',
        degree: 'MBBS, MD (Neurology), DM from Johns Hopkins University',
        experience: '11 Years',
        about: 'Dr. Maharana Ankit is a specialist in neurological disorders, stroke treatment, and brain-related conditions.',
        fees: 1300,
        available: true,
        slots_booked: {},
        address: {
            line1: '345, Banjara Hills',
            line2: 'Hyderabad - 500034'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Shubham Patil',
        image: drShubham,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD (Gastroenterology) from AIIMS Delhi',
        experience: '9 Years',
        about: 'Dr. Shubham Patil specializes in digestive system disorders, endoscopy, and liver disease treatment.',
        fees: 1000,
        available: true,
        slots_booked: {},
        address: {
            line1: '456, Vasant Vihar',
            line2: 'Pune - 411057'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Deepak Meena',
        image: drDeepak,
        speciality: 'Cardiologist',
        degree: 'MBBS, MD (Cardiology), DM from Stanford University',
        experience: '15 Years',
        about: 'Dr. Deepak Meena is a renowned cardiologist with expertise in interventional cardiology and heart disease treatment.',
        fees: 1500,
        available: true,
        slots_booked: {},
        address: {
            line1: '234, Marine Drive',
            line2: 'Mumbai - 400002'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Suhas',
        image: drSuhas,
        speciality: 'Orthopedic Surgeon',
        degree: 'MBBS, MS (Orthopedics) from AIIMS Delhi',
        experience: '14 Years',
        about: 'Dr. Suhas is an expert orthopedic surgeon specializing in joint replacement and sports injuries.',
        fees: 1800,
        available: true,
        slots_booked: {},
        address: {
            line1: '890, Salt Lake City',
            line2: 'Kolkata - 700091'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Homayra Erin',
        image: drHomayra,
        speciality: 'Psychiatrist',
        degree: 'MBBS, MD (Psychiatry) from Oxford University',
        experience: '13 Years',
        about: 'Dr. Homayra Erin provides mental health care, counseling, and treatment for various psychological conditions.',
        fees: 900,
        available: true,
        slots_booked: {},
        address: {
            line1: '678, Indiranagar',
            line2: 'Bangalore - 560038'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Ananya Meena',
        image: drAnanya,
        speciality: 'Urologist',
        degree: 'MBBS, MS (Urology) from AIIMS New Delhi',
        experience: '16 Years',
        about: 'Dr. Ananya Meena is a senior urologist specializing in kidney stones, prostate treatment, and urological surgeries.',
        fees: 1400,
        available: true,
        slots_booked: {},
        address: {
            line1: '789, Sector 15',
            line2: 'Chandigarh - 160015'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Himanshu Meena',
        image: drHimanshu,
        speciality: 'Ophthalmologist',
        degree: 'MBBS, MS (Ophthalmology) from Cambridge University',
        experience: '7 Years',
        about: 'Dr. Himanshu Meena specializes in eye care, cataract surgery, and treatment of various eye disorders.',
        fees: 800,
        available: true,
        slots_booked: {},
        address: {
            line1: '234, MG Road',
            line2: 'Jaipur - 302001'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Raghevendra',
        image: drRaghevendra,
        speciality: 'ENT Specialist',
        degree: 'MBBS, MS (ENT) from AIIMS Delhi',
        experience: '8 Years',
        about: 'Dr. Raghevendra is an ENT specialist treating ear, nose, and throat disorders with modern techniques.',
        fees: 600,
        available: true,
        slots_booked: {},
        address: {
            line1: '567, Civil Lines',
            line2: 'Lucknow - 226001'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Akansha',
        image: doc13,
        speciality: 'Dentist',
        degree: 'BDS, MDS (Orthodontics) from Manipal University',
        experience: '5 Years',
        about: 'Dr. Akansha is a cosmetic dentist specializing in braces, dental implants, and smile makeovers.',
        fees: 500,
        available: true,
        slots_booked: {},
        address: {
            line1: '890, Model Town',
            line2: 'Delhi - 110009'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Gayatri',
        image: doc11,
        speciality: 'Physiotherapist',
        degree: 'BPT, MPT (Sports) from University of Melbourne',
        experience: '12 Years',
        about: 'Dr. Gayatri specializes in sports physiotherapy, rehabilitation, and pain management techniques.',
        fees: 400,
        available: true,
        slots_booked: {},
        address: {
            line1: '345, Adyar',
            line2: 'Chennai - 600020'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Radha Krishnan',
        image: doc5,
        speciality: 'Ayurvedic Physician',
        degree: 'BAMS, MD (Ayurveda) from Banaras Hindu University',
        experience: '18 Years',
        about: 'Dr. Radha Krishnan is a traditional Ayurvedic physician offering holistic healing and wellness treatments.',
        fees: 300,
        available: true,
        slots_booked: {},
        address: {
            line1: '678, Trivandrum',
            line2: 'Kerala - 695001'
        }
    },
    {
        _id: 'doc16',
        name: 'Dr. Johnny Sins',
        image: johnyDoctor,
        speciality: 'Gynecologist',
        degree: 'MBBS, DGO, FICOG from University of Toronto',
        experience: '12 Years',
        about: 'Dr. Johnny Sins is a senior gynecologist specializing in women\'s reproductive health, pregnancy care, and gynecological surgeries.',
        fees: 1200,
        available: true,
        slots_booked: {},
        address: {
            line1: '789, Women\'s Health Center',
            line2: 'Delhi - 110001'
        }
    },
    {
        _id: 'doc17',
        name: 'Dr. Harsh',
        image: drHash,
        speciality: 'Gynecologist',
        degree: 'MBBS, DGO from AIIMS Delhi',
        experience: '15 Years',
        about: 'Dr. Harsh is an experienced gynecologist specializing in women\'s health and pregnancy care.',
        fees: 1100,
        available: true,
        slots_booked: {},
        address: {
            line1: '123, Women\'s Clinic',
            line2: 'Jaipur - 302001'
        }
    },
    {
        _id: 'doc18',
        name: 'Dr. Mohan Mantri',
        image: drMohanMantri,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, MD (Gastroenterology) from Mayo Clinic',
        experience: '18 Years',
        about: 'Dr. Mohan Mantri is a senior gastroenterologist with expertise in digestive and liver disorders.',
        fees: 1300,
        available: true,
        slots_booked: {},
        address: {
            line1: '456, Health Avenue',
            line2: 'Mumbai - 400003'
        }
    },
    {
        _id: 'doc19',
        name: 'Dr. Saumya',
        image: appointment_img,
        speciality: 'General Physician',
        degree: 'MBBS, MD from AIIMS Delhi',
        experience: '10 Years',
        about: 'Dr. Saumya provides comprehensive primary healthcare services and preventive medicine.',
        fees: 450,
        available: true,
        slots_booked: {},
        address: {
            line1: '789, Health Plaza',
            line2: 'Delhi - 110001'
        }
    }
]
