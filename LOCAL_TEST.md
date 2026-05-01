# Local Testing - Complete Step by Step

## 1️⃣ Setup Dependencies (5 minutes)

### Terminal 1 - Backend
```bash
cd C:\Users\Aryan\Desktop\project-manager\backend
npm install
```

### Terminal 2 - Frontend  
```bash
cd C:\Users\Aryan\Desktop\project-manager\frontend
npm install
```

## 2️⃣ MongoDB Connection String Update (2 minutes)

### File: `backend/.env`

```
PORT=5000
MONGODB_URI=mongodb+srv://aryan:yourpassword123@cluster0.mongodb.net/project-manager?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_12345
NODE_ENV=development
```

⚠️ **ZAROORI: `MONGODB_URI` main apna connection string dal**

## 3️⃣ Start Backend (Terminal 1)

```bash
cd backend
npm start
```

Output dikhega:
```
Server is running on port 5000
MongoDB Connected: cluster0.mongodb.net
```

✅ Backend running: http://localhost:5000

## 4️⃣ Start Frontend (Terminal 2)

```bash
cd frontend
npm start
```

Automatically browser khul jayega:
```
http://localhost:3000
```

✅ Frontend running!

## 5️⃣ Test Features (5 minutes)

### Test Signup
1. "Sign Up" click karo
2. Fill karo:
   ```
   Name: Test User
   Email: test@test.com
   Password: test123456
   ```
3. Click "Sign Up"
4. Redirect hone chahiye Dashboard pe

### Test Projects
1. Click "Projects" (navbar main)
2. Click "+ New Project"
3. Fill karo:
   ```
   Name: My First Project
   Description: Testing the app
   ```
4. Create karo

### Test Tasks
1. Click "View" on project
2. Click "+ New Task"
3. Fill karo:
   ```
   Title: Setup Database
   Description: Configure MongoDB
   Priority: High
   Due Date: Pick tomorrow
   ```
4. Create karo
5. Try changing status (Pending → In Progress → Completed)

### Test Dashboard
1. Click "Dashboard" (navbar main)
2. Stats dikhne chahiye:
   - 1 Project
   - 1 Task
   - 0 Completed
   - 1 In Progress
   - 0 Overdue

### Test Video Demo
1. Repeat karo same steps
2. Screen recording on karo (Windows: Win + G)
3. 2-3 minutes recording
4. **Perfect video ready!**

## ✅ All Working?

✔️ Signup/Login kaham
✔️ Project create ho raha hai
✔️ Tasks create ho raha hai
✔️ Status change ho raha hai
✔️ Dashboard numbers match kar raha hai

Then STOP! Ab **Railway Deploy** karne ka time!

---

**Issues?**
- Port error? → Change PORT in `.env`
- MongoDB error? → Check connection string
- Module error? → Delete `node_modules`, re-run `npm install`
