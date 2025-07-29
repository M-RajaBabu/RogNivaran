# 🚀 Backend Deployment Guide - Render

## Prerequisites
- GitHub repository connected
- Render account (https://render.com)

## Step-by-Step Deployment

### 1. Create Render Account
- Go to https://render.com
- Sign up with GitHub
- Connect your repository

### 2. Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select the repository: `M-RajaBabu/RogNivaran`

### 3. Configure the Service
- **Name**: `rognivaran-backend`
- **Root Directory**: `backend` (important!)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free (or paid if needed)

### 4. Environment Variables
Add these environment variables in Render dashboard:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

### 5. Deploy
- Click "Create Web Service"
- Wait for build to complete
- Your backend will be available at: `https://your-service-name.onrender.com`

### 6. Update Frontend
After deployment, update your frontend's environment variable:
```
VITE_BACKEND_URL=https://your-service-name.onrender.com
```

## Troubleshooting

### Common Issues:
1. **Build fails**: Check if all dependencies are in package.json
2. **Environment variables**: Make sure all required variables are set
3. **CORS errors**: Backend is configured to allow your frontend domain
4. **MongoDB connection**: Ensure your MongoDB URI is correct

### Health Check:
- Visit your backend URL
- Should see: "API Working"

## Security Notes
- ✅ No hardcoded secrets in code
- ✅ Environment variables properly configured
- ✅ CORS configured for production
- ✅ JWT authentication implemented

---
**Next**: Deploy frontend to Vercel 