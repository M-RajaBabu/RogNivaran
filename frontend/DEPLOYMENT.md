# 🚀 Frontend Deployment Guide - Vercel

## Prerequisites
- GitHub repository connected
- Vercel account (https://vercel.com)

## Step-by-Step Deployment

### 1. Create Vercel Account
- Go to https://vercel.com
- Sign up with GitHub
- Connect your repository

### 2. Import Project
1. Click "New Project"
2. Import your GitHub repository: `M-RajaBabu/RogNivaran`
3. Select the repository

### 3. Configure the Project
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Environment Variables
Add this environment variable in Vercel dashboard:

```
VITE_BACKEND_URL=https://your-backend-service-name.onrender.com
```

**Important**: Replace with your actual backend URL from Render deployment.

### 5. Deploy
- Click "Deploy"
- Wait for build to complete
- Your frontend will be available at: `https://your-project-name.vercel.app`

### 6. Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain
- Update CORS in backend if needed

## Troubleshooting

### Common Issues:
1. **Build fails**: Check if all dependencies are in package.json
2. **Environment variables**: Make sure VITE_BACKEND_URL is set
3. **API calls fail**: Verify backend URL is correct
4. **Images not loading**: Check if all assets are in the correct location

### Health Check:
- Visit your frontend URL
- Should see the RogNivaran homepage
- Test navigation and features

## Performance Optimization
- ✅ Vite build optimization
- ✅ Tailwind CSS purged
- ✅ Images optimized
- ✅ Responsive design implemented

## Security Notes
- ✅ No hardcoded secrets in code
- ✅ Environment variables properly configured
- ✅ HTTPS enabled by default
- ✅ CORS handled by backend

---
**Next**: Test the complete application 