# Railway Deployment Guide

This guide will help you deploy the Project Manager application on Railway.

## Prerequisites

- GitHub account with this repository
- Railway account (https://railway.app)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)

## Step 1: Set Up MongoDB Atlas

1. Go to MongoDB Atlas and create a free account
2. Create a new cluster
3. Create a database user with username and password
4. Whitelist your IP or allow all IPs (0.0.0.0/0)
5. Get your connection string and save it

Connection string format:
```
mongodb+srv://username:password@cluster.mongodb.net/project-manager?retryWrites=true&w=majority
```

## Step 2: Push Code to GitHub

```bash
cd project-manager

# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Full-stack project manager application"

# Push to GitHub
git push origin main
```

## Step 3: Deploy Backend on Railway

1. Go to https://railway.app and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Choose the "backend" directory as the root
6. Click "Deploy"

## Step 4: Add Environment Variables to Backend

In Railway dashboard for your backend service:

1. Click on your backend service
2. Go to "Variables" tab
3. Add the following variables:
   - `PORT`: `5000`
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate a strong secret (e.g., use `openssl rand -hex 32`)
   - `NODE_ENV`: `production`

4. Click "Save" and Railway will redeploy automatically

## Step 5: Get Backend URL

After deployment:
1. Go to your backend service in Railway
2. Under "Networking", copy the public URL
3. It will look like: `https://project-manager-backend.up.railway.app`

## Step 6: Deploy Frontend on Railway

1. In Railway, click "New" → "New Project"
2. Select "Deploy from GitHub repo"
3. Select your repository
4. Choose the "frontend" directory as root
5. Add environment variables:
   - `REACT_APP_API_URL`: Your backend URL (e.g., `https://project-manager-backend.up.railway.app/api`)
   - `CI`: `false` (to prevent build failures on warnings)

6. Click "Deploy"

## Step 7: Update Backend CORS

In `backend/server.js`, update CORS to allow your frontend domain:

```javascript
const cors = require('cors');
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend-railway-url.up.railway.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

## Step 8: Verify Deployment

1. Visit your frontend Railway URL
2. Sign up for a new account
3. Create a project
4. Create a task
5. Check the dashboard

## Troubleshooting

### Backend not connecting to MongoDB
- Verify `MONGODB_URI` is correct
- Check if IP is whitelisted in MongoDB Atlas

### Frontend not connecting to backend
- Verify `REACT_APP_API_URL` is correct
- Check CORS settings in backend
- Make sure backend is running

### Build failures
- Set `CI=false` in frontend environment variables
- Check logs in Railway dashboard

## Live Application

- **Frontend URL**: https://your-frontend.up.railway.app
- **Backend URL**: https://your-backend.up.railway.app
- **API Health Check**: https://your-backend.up.railway.app/api/health

## Cost

Railroad provides a free tier with:
- 512MB RAM
- 1 CPU shared core
- Enough for development/testing

Perfect for this project!

---

For more help, visit: https://docs.railway.app
