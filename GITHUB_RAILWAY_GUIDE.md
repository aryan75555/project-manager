# 🚀 ProjectHub - GitHub & Railway Deployment Guide

## ✅ What's Done Locally

Your entire project is ready and committed to local git:
- ✅ 41 files committed (2586 insertions)
- ✅ All backend code (Express + PostgreSQL API)
- ✅ All frontend code (React + Vite + Tailwind)
- ✅ Complete documentation (README, QUICKSTART, DEPLOYMENT)
- ✅ Configuration files ready

**Current Status:** Code is on your computer, ready to push to GitHub

---

## 📋 Step-by-Step GitHub Push Instructions

### **STEP 1: Create GitHub Repository**

1. Go to https://github.com/new
2. Fill in the form:
   ```
   Repository name: project-manager
   Description: Full-stack project management application
   Visibility: Public
   Initialize repo: NO (don't add README, .gitignore, or license)
   ```
3. Click "Create repository"

### **STEP 2: Copy Your Repository URL**

After creating, you'll see a page with options. Look for HTTPS URL like:
```
https://github.com/YOUR-USERNAME/project-manager.git
```

Copy this URL - you'll need it in next step.

### **STEP 3: Connect Local Repo to GitHub**

Open PowerShell in your project folder and run these commands:

```powershell
cd c:\Users\Aryan\Desktop\project-manager

git remote add origin https://github.com/YOUR-USERNAME/project-manager.git

git branch -M main

git push -u origin main
```

**Replace** `YOUR-USERNAME` with your actual GitHub username.

When prompted for authentication:
- If you use password: Enter your GitHub password
- If you use 2FA: Generate a [Personal Access Token](https://github.com/settings/tokens) and use that instead

### **STEP 4: Verify on GitHub**

After push completes:
1. Go to https://github.com/YOUR-USERNAME/project-manager
2. You should see all your files displayed
3. Check that you have both `backend/` and `frontend/` folders

---

## 🚢 Step-by-Step Railway Deployment

### **STEP 1: Create Railway Account**

1. Go to https://railway.app
2. Click "Create Account"
3. Choose "Continue with GitHub"
4. Authorize Railway to access your GitHub

### **STEP 2: Create New Project**

1. On Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Find and select `project-manager` repository
4. Railway will auto-detect and create services

### **STEP 3: Add PostgreSQL Database**

1. In Railway dashboard, click the "+" button
2. Select "PostgreSQL" from the add-ons
3. Wait for it to provision (shows green checkmark)
4. It automatically provides `DATABASE_URL` environment variable

### **STEP 4: Configure Backend Service**

1. Click on the Backend service card
2. Go to "Settings" tab
3. Set **Start Command:**
   ```
   npm start --prefix backend
   ```

4. Add **Environment Variables:**
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = Generate a random string (example: `super_secret_key_12345_abc`)
   - `CLIENT_URL` = Will get this later from frontend

5. Click "Deploy"

### **STEP 5: Configure Frontend Service**

1. Click on the Frontend service card
2. Go to "Settings" tab
3. Set **Build Command:**
   ```
   npm run build --prefix frontend
   ```

4. Set **Start Command:**
   ```
   npm run preview --prefix frontend
   ```

5. Add **Environment Variable:**
   - `VITE_API_URL` = Will get this later from backend

6. Click "Deploy"

### **STEP 6: Get Service URLs**

1. After both services deploy:
   - Backend gets a URL like: `https://projecthub-api-prod.railway.app`
   - Frontend gets a URL like: `https://projecthub-app-prod.railway.app`

2. Copy these URLs

### **STEP 7: Update Environment Variables**

1. Go to Backend service → Settings → Environment
   - Update `CLIENT_URL` = Your frontend URL

2. Go to Frontend service → Settings → Environment
   - Update `VITE_API_URL` = Your backend URL + `/api`

3. Both services will auto-redeploy with new variables

### **STEP 8: Test Live Application**

1. Visit your frontend URL: `https://projecthub-app-prod.railway.app`
2. Sign up with a test account
3. Create a project, add tasks, etc.
4. Verify everything works

---

## ✅ Verification Checklist

- [ ] Code pushed to GitHub (all 41 files visible)
- [ ] Railway PostgreSQL service running (green checkmark)
- [ ] Backend service deployed (green checkmark)
- [ ] Frontend service deployed (green checkmark)
- [ ] Environment variables set (JWT_SECRET, URLs, NODE_ENV)
- [ ] Frontend can access backend (test signup)
- [ ] Dashboard loads and shows stats
- [ ] Can create projects and tasks
- [ ] Database is persisting data

---

## 🔗 Useful Links

| Service | URL |
|---------|-----|
| GitHub | https://github.com/YOUR-USERNAME/project-manager |
| Railway Dashboard | https://railway.app |
| Frontend App | https://projecthub-app-prod.railway.app |
| Backend API | https://projecthub-api-prod.railway.app/api/health |

---

## ⚡ Troubleshooting

### GitHub Push Issues

**Error: "fatal: unable to access... SSL certificate problem"**
```powershell
git config --global http.sslVerify false
git push -u origin main
```

**Error: "Authentication failed"**
- Use Personal Access Token instead of password
- Get token: https://github.com/settings/tokens
- Generate token with `repo` scope

### Railway Deployment Issues

**Database not connecting:**
- Check PostgreSQL service is running (green checkmark)
- Verify DATABASE_URL environment variable is set
- Check backend logs for connection errors

**Frontend can't reach backend:**
- Verify `VITE_API_URL` includes `/api` at the end
- Check CORS is configured correctly
- Verify `CLIENT_URL` matches frontend domain

**Services failing to build:**
- Check build logs in Railway dashboard
- Ensure `package.json` has correct scripts
- Run locally to test: `npm install && npm start --prefix backend`

---

## 📝 Commands Quick Reference

### Push to GitHub
```powershell
git remote add origin https://github.com/YOUR-USERNAME/project-manager.git
git branch -M main
git push -u origin main
```

### After Making Changes (for future updates)
```powershell
git add .
git commit -m "Your message"
git push
```

### Check Git Status
```powershell
git status
git log --oneline
```

---

## 🎉 Final Checklist for Submission

- [ ] Project deployed on Railway (live URL working)
- [ ] GitHub repo public with all code
- [ ] README.md visible in repo
- [ ] Backend API responding (`/api/health` endpoint)
- [ ] Frontend loads without errors
- [ ] Can signup and login
- [ ] Can create projects and tasks
- [ ] Dashboard shows statistics
- [ ] Demo video recorded (2-5 minutes)
- [ ] Submitted to selection panel:
  - [ ] Live URL
  - [ ] GitHub repo link
  - [ ] Demo video link

---

## 📞 Need Help?

1. Check `DEPLOYMENT.md` for detailed deployment guide
2. Check `QUICKSTART.md` for local development
3. Check `README.md` for full documentation
4. Check `BUILD_SUMMARY.md` for project overview

---

**You're ready! Your application is production-ready!** 🚀
