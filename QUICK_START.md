# Quick Start Guide - 5 Minutes to Running App

## Fastest Way to Get Started

### Step 1: Clone & Setup (2 minutes)
```bash
# Windows
setup.bat

# macOS/Linux  
chmod +x setup.sh
./setup.sh
```

### Step 2: Start Backend (1 minute)
```bash
cd backend
npm start
```
Backend will be running at: `http://localhost:5000`

### Step 3: Start Frontend (1 minute - in new terminal)
```bash
cd frontend
npm start
```
Frontend will open at: `http://localhost:3000`

### Step 4: Test It! (1 minute)
1. Click "Sign Up"
2. Enter:
   - Name: Test User
   - Email: test@test.com
   - Password: test123456
3. Click Sign Up
4. Click "Projects" → "+ New Project"
5. Click "Dashboard" to see stats

That's it! You have a fully functional project manager running locally.

## MongoDB Setup (First Time Only)

### Option A: MongoDB Atlas (Easiest - Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a cluster
4. Get connection string
5. In `backend/.env`, update:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-manager
   ```
6. Restart backend (it will connect automatically)

### Option B: Local MongoDB
1. Install from https://docs.mongodb.com/manual/installation/
2. Run MongoDB server
3. Backend uses local connection by default
4. Done!

## Features to Try

### 1. Create Multiple Projects
- Go to Projects page
- Create 3-4 test projects
- View each one

### 2. Manage Tasks
- Open a project
- Create tasks with different priorities
- Change task status
- Due dates work too

### 3. Dashboard
- View statistics
- See completed vs pending
- Track overdue items

### 4. Team Management
- Add members to projects (project owners only)
- Members can view but not delete

## Deployment in 10 Minutes

Follow DEPLOYMENT.md for Railway setup:
1. Push to GitHub (2 min)
2. Connect to Railway (3 min)
3. Set environment variables (2 min)
4. Deploy (3 min)
5. Live! 🎉

## Troubleshooting

**Port 3000 or 5000 already in use?**
```bash
# Change in backend/.env
PORT=5001
```

**Can't connect to MongoDB?**
- Check connection string in `.env`
- Use MongoDB Atlas for cloud alternative
- Install MongoDB locally

**npm install fails?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Still having issues?**
- Check README.md
- Check LOCAL_SETUP.md
- Review error messages carefully

---

## You're Ready! 🚀

Enjoy your project manager!
