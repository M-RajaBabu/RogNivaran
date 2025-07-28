# 🔧 Backend Setup Guide

## 📋 Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Stripe Account (for payments)
- Razorpay Account (for payments)
- Cloudinary Account (for image uploads)

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/rognivaran

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret

# Payment Gateway Configuration
RAZORPAY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Admin Configuration
ADMIN_EMAIL=admin@rognivaran.com
ADMIN_PASSWORD=admin123

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. Payment Gateway Setup

#### Stripe Configuration
1. Sign up at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add your secret key to `STRIPE_SECRET_KEY`

#### Razorpay Configuration
1. Sign up at [razorpay.com](https://razorpay.com)
2. Get your API keys from the Razorpay Dashboard
3. Add your keys to `RAZORPAY_ID` and `RAZORPAY_SECRET`

### 4. Cloudinary Setup
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the Cloudinary Dashboard
3. Add them to the Cloudinary environment variables

### 5. Start the Server
```bash
npm start
```

## 🔍 Troubleshooting

### Stripe API Key Error
If you see the error: "You did not provide an API key", follow these steps:

1. **Check Environment Variables**
   ```bash
   # Make sure your .env file exists and has the correct key
   cat .env | grep STRIPE
   ```

2. **Verify Stripe Key Format**
   - Stripe secret keys start with `sk_`
   - Test keys start with `sk_test_`
   - Live keys start with `sk_live_`

3. **Restart the Server**
   ```bash
   npm start
   ```

### Common Issues

1. **"Stripe payment is not configured"**
   - Add your Stripe secret key to the `.env` file
   - Restart the server

2. **"Payment gateway initialization failed"**
   - Check if your API keys are correct
   - Verify internet connectivity
   - Check Stripe/Razorpay account status

3. **Database Connection Error**
   - Ensure MongoDB is running
   - Check your `MONGODB_URI` in `.env`

## 🛡️ Security Notes

- **Never commit your `.env` file** to version control
- Use different API keys for development and production
- Regularly rotate your JWT secret
- Use strong passwords for admin accounts

## 📞 Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure all payment gateway accounts are active
4. Test with Stripe test keys first before going live

## 🚀 Production Deployment

For production deployment:
1. Use production API keys from Stripe/Razorpay
2. Set up proper MongoDB connection (Atlas recommended)
3. Configure proper CORS settings
4. Use environment-specific JWT secrets
5. Set up proper logging and monitoring 