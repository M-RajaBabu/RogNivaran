# RogNivaran – Doctor Appointment Booking Platform

RogNivaran is a modern, full-stack web application for booking doctor appointments, tailored for the Indian healthcare ecosystem. It streamlines hospital and clinic appointment bookings for patients, doctors, and administrators, with secure payment integration and a responsive, user-friendly interface.

---

## 🚀 Features

- **Patient Portal:** Book appointments, view doctors, manage your profile, and see your appointment history.
- **Doctor Portal:** Manage appointments, update profile, and view patient details.
- **Admin Portal:** Add/manage doctors, view all appointments, and oversee platform activity.
- **Secure Payments:** Pay via **UPI (QR code)**, **credit/debit card** (Stripe, Razorpay), or **cash** at the clinic.
- **Responsive Design:** Fully mobile-friendly and modern UI using React, Tailwind CSS, and Vite.
- **Authentication:** JWT-based login for patients, doctors, and admins.
- **Cloudinary Integration:** Secure image uploads for doctor profiles.
- **Environment Variable Security:** All sensitive keys and URLs are managed via environment variables.

---

## 🏗️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Payments:** UPI (QR), Credit/Debit Card (Stripe, Razorpay), Cash
- **Image Hosting:** Cloudinary
- **Deployment:** Vercel (recommended), Railway/Render (optional for backend)

---

## 📦 Project Structure

```
RogNivaran/
  ├── frontend/      # React + Vite frontend
  ├── backend/       # Node.js + Express backend
  ├── admin/         # (Optional) Admin panel
  ├── README.md      # This file
  └── INSTALL.md     # Step-by-step installation guide
```

---

## 📸 Screenshots

> _Add screenshots of the frontend UI here (Home, Booking, Doctor Profile, etc.)_
> _Example:_
> ![Home Page Screenshot](./screenshots/home.png)

---

## ⚡ Quick Start

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/rognivaran.git
cd rognivaran
```

### 2. **Setup Backend**
```bash
cd backend
npm install
# Create a .env file (see below for required variables)
npm start
```

### 3. **Setup Frontend**
```bash
cd ../frontend
npm install
# Create a .env file (see below for required variables)
npm run dev
```

---

## 🔑 Environment Variables

### **Backend (`backend/.env`):**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
RAZORPAY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
ADMIN_EMAIL=admin@rognivaran.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
```

### **Frontend (`frontend/.env`):**
```
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🌐 Deployment

- **Recommended:** Deploy both frontend and backend to [Vercel](https://vercel.com)
- **Alternative:** Deploy backend to [Railway](https://railway.app) or [Render](https://render.com), frontend to Vercel or Netlify

**Set all environment variables in your deployment platform’s dashboard.**

### **Deployment Steps**
1. Deploy backend first (set all backend env vars)
2. Deploy frontend (set `VITE_BACKEND_URL` to your backend's deployed URL)
3. Update DNS/custom domains as needed

---

## 🛠️ Usage & Functionality

- **Patients:**
  - Register/login, browse doctors, book appointments, pay online (Stripe, Razorpay, UPI), view/manage appointments, update profile.
- **Doctors:**
  - Login, view/manage appointments, update profile, add prescriptions.
- **Admins:**
  - Login, add/edit/remove doctors, view all appointments, manage platform data.

---

## 🛡️ Security

- No sensitive keys or secrets are committed to the repository.
- All API keys, database URIs, and secrets are managed via environment variables.
- Never share your `.env` files publicly.
- Use strong passwords and rotate secrets regularly.

---

## 👨‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Credits

Project by **Raja Babu Meena**  
[LinkedIn](https://www.linkedin.com/in/rajababumeena/) | [Twitter/X](https://x.com/RBMRAJA)

---
