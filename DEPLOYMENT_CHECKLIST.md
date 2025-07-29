# 🚀 RogNivaran Deployment Checklist

## ✅ Code Cleanup Completed
- [x] Removed unnecessary `src` folder from backend
- [x] Updated CORS configuration for production
- [x] Fixed all import errors
- [x] Verified all components are working
- [x] Checked for hardcoded secrets (none found)

## 🔧 Backend Deployment (Render)

### Pre-Deployment Checklist
- [ ] MongoDB Atlas database created
- [ ] Cloudinary account set up
- [ ] Stripe account configured (optional)
- [ ] Razorpay account configured (optional)
- [ ] Environment variables ready

### Environment Variables Needed
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rognivaran
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=sk_test_... (optional)
RAZORPAY_KEY_ID=rzp_test_... (optional)
RAZORPAY_KEY_SECRET=your_razorpay_secret (optional)
```

### Deployment Steps
1. [ ] Go to https://render.com
2. [ ] Sign up with GitHub
3. [ ] Create new Web Service
4. [ ] Connect repository: `M-RajaBabu/RogNivaran`
5. [ ] Set Root Directory: `backend`
6. [ ] Set Build Command: `npm install`
7. [ ] Set Start Command: `npm start`
8. [ ] Add all environment variables
9. [ ] Deploy and get backend URL

## 🎨 Frontend Deployment (Vercel)

### Pre-Deployment Checklist
- [ ] Backend deployed and URL available
- [ ] Environment variable ready

### Environment Variables Needed
```
VITE_BACKEND_URL=https://your-backend-service-name.onrender.com
```

### Deployment Steps
1. [ ] Go to https://vercel.com
2. [ ] Sign up with GitHub
3. [ ] Import repository: `M-RajaBabu/RogNivaran`
4. [ ] Set Root Directory: `frontend`
5. [ ] Set Framework Preset: Vite
6. [ ] Add environment variable
7. [ ] Deploy and get frontend URL

## 🧪 Post-Deployment Testing

### Backend Tests
- [ ] Visit backend URL → Should show "API Working"
- [ ] Test user registration
- [ ] Test user login
- [ ] Test doctor listing
- [ ] Test appointment booking
- [ ] Test UPI payment flow

### Frontend Tests
- [ ] Visit frontend URL → Should show homepage
- [ ] Test navigation
- [ ] Test responsive design
- [ ] Test user registration/login
- [ ] Test doctor browsing
- [ ] Test appointment booking
- [ ] Test UPI payment modal
- [ ] Test admin panel (if needed)

### Integration Tests
- [ ] Frontend can connect to backend
- [ ] CORS working properly
- [ ] Images loading correctly
- [ ] Payment flows working
- [ ] Email verification working

## 🔒 Security Verification
- [ ] No hardcoded secrets in code
- [ ] Environment variables properly set
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] JWT tokens working
- [ ] File uploads secure

## 📱 Responsive Design Check
- [ ] Mobile (320px-768px)
- [ ] Tablet (768px-1024px)
- [ ] Desktop (1024px+)
- [ ] Navigation working on all devices
- [ ] Forms usable on mobile

## 🎯 Final Checklist
- [ ] Both services deployed
- [ ] All features working
- [ ] Payment integration tested
- [ ] Admin panel accessible
- [ ] Doctor panel accessible
- [ ] User flows complete
- [ ] Performance acceptable
- [ ] Security verified

## 🚨 Emergency Contacts
- **MongoDB Issues**: Check connection string and network access
- **Cloudinary Issues**: Verify API keys and cloud name
- **CORS Issues**: Check allowed origins in backend
- **Build Issues**: Check package.json and dependencies

---
**Ready to deploy!** 🚀 