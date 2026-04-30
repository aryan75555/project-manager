# ProjectHub - Project Management Web App

A full-stack project management application with role-based access control, built with Node.js, Express, React, and PostgreSQL.

## 🚀 Features

- **Authentication**: Secure signup/login with JWT tokens
- **Project Management**: Create, manage, and organize projects
- **Team Management**: Add members to projects with role-based access (Admin/Member)
- **Task Tracking**: Create, assign, and track tasks with status and priority
- **Dashboard**: Real-time overview of tasks, projects, and progress
- **RBAC (Role-Based Access Control)**: Admin and Member roles with different permissions
- **Responsive UI**: Modern, mobile-friendly interface with Tailwind CSS

## 📋 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios

## 📁 Project Structure

```
project-manager/
├── backend/
│   ├── server.js                 # Express server setup
│   ├── package.json              # Backend dependencies
│   ├── .env.example              # Environment variables template
│   ├── db/
│   │   ├── pool.js              # Database connection pool
│   │   └── init.js              # Database initialization
│   ├── middleware/
│   │   └── auth.js              # Authentication & authorization
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   ├── projectController.js # Project logic
│   │   └── taskController.js    # Task logic
│   └── routes/
│       ├── auth.js              # Auth routes
│       ├── projects.js          # Project routes
│       └── tasks.js             # Task routes
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx             # React entry point
│   │   ├── App.jsx              # Main component
│   │   ├── index.css            # Global styles
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   └── hooks/               # Custom hooks
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind configuration
│   └── index.html               # HTML entry point
│
└── README.md                    # This file
```

## 🔧 Installation

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your PostgreSQL credentials:
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/project_manager
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

5. Start the backend server:
```bash
npm start
```

The server will initialize the database on startup.

### Frontend Setup

1. Navigate to frontend folder (in new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Projects
- `POST /api/projects` - Create project (Admin)
- `GET /api/projects` - Get user's projects
- `GET /api/projects/:projectId` - Get project details
- `PUT /api/projects/:projectId` - Update project (Admin)
- `POST /api/projects/:projectId/members` - Add member (Admin)
- `GET /api/projects/:projectId/members` - Get project members
- `DELETE /api/projects/:projectId/members/:memberId` - Remove member (Admin)

### Tasks
- `POST /api/tasks/:projectId` - Create task
- `GET /api/tasks/dashboard/stats` - Get dashboard stats
- `GET /api/tasks/my-tasks` - Get user's tasks
- `GET /api/tasks/:projectId` - Get project tasks
- `PUT /api/tasks/:projectId/:taskId` - Update task
- `DELETE /api/tasks/:projectId/:taskId` - Delete task (Admin)

## 👥 User Roles

### Admin
- Create projects
- Manage team members
- Delete tasks
- Update project details

### Member
- View assigned projects
- Create and manage tasks
- Update task status
- View team members

## 🗄️ Database Schema

### Users Table
- id, email (unique), password, name, role, created_at, updated_at

### Projects Table
- id, name, description, admin_id, status, created_at, updated_at

### Project Members Table
- id, project_id, user_id, role, joined_at (unique constraint on project_id, user_id)

### Tasks Table
- id, project_id, title, description, assigned_to, status, priority, due_date, created_by, created_at, updated_at

## 🚀 Deployment on Railway

### Steps:

1. **Create Railway account** at [railway.app](https://railway.app)

2. **Connect GitHub**:
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Authorize and select your repository

3. **Configure Backend Service**:
   - Add environment variables in Railway:
     - `DATABASE_URL` - Auto-provided by PostgreSQL plugin
     - `JWT_SECRET` - Generate a secure string
     - `NODE_ENV` - Set to `production`
     - `CLIENT_URL` - Your deployed frontend URL
   - Set start command: `npm start`

4. **Configure Frontend Service**:
   - Add build command: `npm run build`
   - Add start command: `npm run preview`
   - Add environment variable `VITE_API_URL` pointing to backend URL

5. **Add PostgreSQL Plugin**:
   - In Railway, add PostgreSQL as a service
   - It will automatically provide `DATABASE_URL`

6. **Deploy**:
   - Push to GitHub
   - Railway will automatically deploy on push

## 📱 Usage

1. **Sign Up**: Create an account with email and password
2. **Create Project**: If Admin, create a new project
3. **Add Team Members**: Invite members by email
4. **Create Tasks**: Add tasks to the project
5. **Assign Tasks**: Assign tasks to team members
6. **Track Progress**: Monitor task status and completion
7. **Dashboard**: View all your tasks and statistics

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Input validation with express-validator
- SQL injection protection with parameterized queries
- CORS configuration
- Helmet.js for HTTP headers security

## 📊 Dashboard Features

- Total tasks count
- Tasks by status (To Do, In Progress, Completed)
- Overdue tasks counter
- Projects count
- Task list with filtering options
- Priority indicators
- Status badges

## 🐛 Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Ensure database name exists

### Port Already in Use
- Backend: Change PORT in `.env` (default 5000)
- Frontend: Vite will use next available port

### CORS Issues
- Verify `CLIENT_URL` matches your frontend URL
- Check frontend is making requests to correct API endpoint

## 📝 License

MIT

## 👨‍💻 Developer

Built with ❤️ for efficient project management.

---

**Live Demo**: [Your Railway URL]
**GitHub**: [Your Repository URL]
