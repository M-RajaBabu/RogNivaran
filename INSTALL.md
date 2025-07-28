Backend: Node.js, Express.js, Mongoose
Frontend (Admin): React, Tailwind CSS, Vite
Frontend (User): React, Tailwind CSS, Vite
Database: MongoDB
Cloudinary for image uploads
Razorpay and Stripe for payment gateway integration

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <project_folder>
   ```

2. **Install dependencies:**
   Install dependencies for the backend, admin, and frontend projects:
   ```bash
   cd backend
   npm install
   cd ../admin
   npm install
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `backend` directory and add the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=<your_mongodb_connection_string>
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   RAZORPAY_ID=<your_razorpay_key_id>
   RAZORPAY_SECRET=<your_razorpay_key_secret>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   JWT_SECRET=<your_jwt_secret>
   ADMIN_SECRET=<your_admin_secret>
   ```

4. **Run the development servers:**
   Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   Start the admin development server:
   ```bash
   cd admin
   npm run dev
   ```
   Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

The application should now be running on `http://localhost:5173/` for the frontend, `http://localhost:5174/` for the admin panel, and the backend server on `http://localhost:5000/`.