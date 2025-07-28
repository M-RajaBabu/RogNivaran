# RogNivaran – Your Digital Healthcare Companion

Welcome to **RogNivaran**, a next-generation doctor appointment platform designed to revolutionize healthcare access in India. Whether you’re a patient seeking trusted care, a doctor managing appointments, or an admin streamlining operations, RogNivaran brings everyone together in a seamless, secure, and modern digital experience.

---

## 🌟 Project Vision

Imagine a world where booking a doctor’s appointment is as easy as ordering food online. No more long queues, endless phone calls, or confusion about payment. RogNivaran empowers patients, doctors, and clinics with a unified platform that’s fast, transparent, and built for the Indian healthcare ecosystem.

---

## 🚀 Features

- **Patient Portal:** Effortlessly search for doctors by specialty, book appointments, pay online (or at the clinic), and manage your health journey—all from your phone or computer.
- **Doctor Portal:** Doctors can view and manage their appointments, update their profiles, and access patient details in a secure environment.
- **Admin Dashboard:** Admins oversee the entire platform, add or manage doctors, and monitor all appointments for smooth operations.
- **Flexible Payments:** Pay your way—**UPI (QR code)**, **credit/debit card** (Stripe, Razorpay), or **cash** at the clinic.
- **Mobile-First Design:** Enjoy a beautiful, responsive UI that works perfectly on any device.
- **Secure Authentication:** Your data is protected with JWT-based login for all users.
- **Cloudinary Integration:** Doctors can upload profile images securely and easily.
- **Environment Variable Security:** All sensitive keys and URLs are managed via environment variables—no secrets in the code!

---

## 💡 Why RogNivaran?

- **Made for India:** Localized for Indian users, with UPI and cash payment options.
- **All-in-One:** Patients, doctors, and admins—all on one platform.
- **Modern Tech:** Built with the latest web technologies for speed, security, and scalability.
- **Open Source:** Transparent, community-driven, and ready for your contributions!

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

## 🧑‍💻 User Journey

1. **Sign Up & Login:** Patients, doctors, and admins each have their own secure login.
2. **Browse & Book:** Patients browse doctors by specialty, view profiles, and book appointments in seconds.
3. **Pay Your Way:** Choose UPI, card, or cash—get instant confirmation.
4. **Manage & Track:** Doctors and patients can view, update, or cancel appointments anytime.
5. **Admin Control:** Admins keep everything running smoothly from a powerful dashboard.

---

## 📸 Screenshots

> _Add screenshots of the frontend UI here (Home, Booking, Doctor Profile, etc.)_
> _Example:_
> ![Home Page Screenshot](./screenshots/home.png)

---

## ⚡ Quick Start

### 1. **Clone the Repository**
```bash
git clone https://github.com/M-RajaBabu/RogNivaran.git
cd RogNivaran
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
  - Register/login, browse doctors, book appointments, pay online (UPI, card) or at the clinic (cash), view/manage appointments, update profile.
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

## 🤔 FAQ

**Q: Can I use this for my own clinic or hospital?**  
A: Absolutely! Fork the repo, customize the branding, and deploy it for your own use.

**Q: Is it free?**  
A: Yes, RogNivaran is open source and free to use under the MIT License.

**Q: How do I add more payment methods?**  
A: The backend is modular—add new payment integrations in `backend/config/payment.js` and update the frontend as needed.

**Q: Is my data safe?**  
A: Yes! All sensitive data is protected with JWT authentication and never exposed in the codebase.

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
