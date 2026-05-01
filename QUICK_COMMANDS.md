# Deployment Command Cheat Sheet

## 🚀 30 SECOND QUICK START

```bash
# Terminal 1: Backend
cd C:\Users\Aryan\Desktop\project-manager\backend
npm install
npm start

# Terminal 2: Frontend
cd C:\Users\Aryan\Desktop\project-manager\frontend
npm install
npm start
```

Browser open hoga automatically:
```
http://localhost:3000
```

---

## 📋 MongoDB Connection String

Go to: https://www.mongodb.com/cloud/atlas
Copy this format:
```
mongodb+srv://username:password@cluster0.mongodb.net/project-manager?retryWrites=true&w=majority
```

---

## 📝 Environment Files

### Backend (.env)
Location: `backend/.env`
```
PORT=5000
MONGODB_URI=YOUR_CONNECTION_STRING_HERE
JWT_SECRET=secret_key_12345
NODE_ENV=development
```

### Frontend (.env)
Location: `frontend/.env`
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🌐 Railway Deployment

### Login to Railway
https://railway.app

### Backend
- New Project → Deploy from GitHub
- Select: project-manager
- Root: `backend`
- Variables:
  ```
  PORT=5000
  MONGODB_URI=YOUR_CONNECTION_STRING
  JWT_SECRET=secret_key
  NODE_ENV=production
  ```

### Frontend
- New Project → Deploy from GitHub
- Select: project-manager
- Root: `frontend`
- Variables:
  ```
  REACT_APP_API_URL=https://YOUR_BACKEND_URL/api
  CI=false
  ```

---

## ✅ Testing URLs

### Local
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

### Live (after Railway deploy)
- Frontend: https://your-frontend.up.railway.app
- Backend: https://your-backend.up.railway.app
- API Health: https://your-backend.up.railway.app/api/health

---

## 🧪 Test Features

1. **Signup** → Email & password
2. **Create Project** → Name & description
3. **Add Task** → Title, priority, due date
4. **Change Status** → Pending → In Progress → Completed
5. **View Dashboard** → Check statistics

---

## 📹 Video Recording

Windows:
- Press `Windows + G` to start recording

Mac:
- Cmd + Shift + 5

---

## 🆘 Quick Fixes

**Port already in use?**
```
Change PORT=5000 to PORT=5001 in backend/.env
```

**Module not found?**
```
rm -r node_modules
npm install
```

**MongoDB connection failed?**
- Check connection string
- Check IP whitelist (Allow All)

**Frontend can't connect to backend?**
- Verify REACT_APP_API_URL is correct
- Make sure backend is running

---

## 📊 API Endpoints to Test

### Signup
```
POST http://localhost:5000/api/auth/signup
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
```
POST http://localhost:5000/api/auth/login
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Get Projects
```
GET http://localhost:5000/api/projects
Header: Authorization: Bearer YOUR_TOKEN
```

---

## 🎬 Recording Checklist

- [ ] Record in 1080p (at least 720p)
- [ ] Show all features (signup, projects, tasks, dashboard)
- [ ] Speak clearly about what you're showing
- [ ] 2-5 minutes total
- [ ] Upload to YouTube
- [ ] Share link in submission

---

**Yeh sab commands use karke 30 minutes main live hoga!** ✨
