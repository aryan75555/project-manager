# Project Manager - Quick Start Guide

## Prerequisites
- Node.js 16+
- PostgreSQL installed and running
- Git

## Installation & Setup

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd project-manager
npm install
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npm start
```

Backend runs on http://localhost:5000

### 3. Frontend Setup (new terminal)
```bash
cd frontend
npm run dev
```

Frontend runs on http://localhost:3000

## Features to Test

### 1. Authentication
- Sign up with email/password
- Login
- Logout

### 2. Projects
- Create new project (Admin only)
- View all projects
- Add team members to project

### 3. Tasks
- Create tasks in projects
- Assign tasks to team members
- Change task status (To Do → In Progress → Completed)
- Set priority (Low/Medium/High)
- Set due dates

### 4. Dashboard
- View all assigned tasks
- See task statistics
- Track completion status
- View overdue tasks

### 5. Team Management
- Add members by email
- View team members
- Remove members (Admin only)

## Default Test Accounts

After signup, you can create test accounts:
- Admin: email@admin.com / password123
- Member: member@email.com / password123

## Deployment (Railway)

1. Create .env file for production
2. Push to GitHub
3. Connect GitHub to Railway
4. Add PostgreSQL plugin
5. Set environment variables
6. Deploy!

## API Docs

### Auth
- POST /api/auth/signup
- POST /api/auth/login

### Projects
- POST /api/projects
- GET /api/projects
- GET /api/projects/:id
- PUT /api/projects/:id
- POST /api/projects/:id/members
- GET /api/projects/:id/members

### Tasks
- POST /api/tasks/:projectId
- GET /api/tasks/:projectId
- PUT /api/tasks/:projectId/:taskId
- DELETE /api/tasks/:projectId/:taskId
- GET /api/tasks/my-tasks
- GET /api/tasks/dashboard/stats

## Troubleshooting

**Database Error**: Ensure PostgreSQL is running and DATABASE_URL is correct
**Port in Use**: Change PORT in backend .env
**CORS Error**: Verify CLIENT_URL matches frontend URL
**Module Not Found**: Run npm install in both frontend and backend

---
Happy Project Managing! 🚀
