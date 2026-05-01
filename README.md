# Project Manager Application

A full-stack web application for managing projects, assigning tasks, and tracking progress with role-based access control.

## Features

✅ **Authentication** - Secure signup/login with JWT
✅ **Project Management** - Create, manage, and delete projects
✅ **Task Management** - Create, assign, and track task status
✅ **Dashboard** - Real-time overview of tasks, status, and overdue items
✅ **Role-Based Access Control** - Admin and Member roles
✅ **Team Management** - Add/remove team members from projects
✅ **Status Tracking** - Pending, In Progress, Completed
✅ **Priority Levels** - Low, Medium, High priority tasks

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB (NoSQL Database)
- JWT Authentication
- Bcryptjs for password hashing

**Frontend:**
- React 18
- React Router v6
- Axios for API calls
- CSS3 for styling

**Deployment:**
- Railway

## Project Structure

```
project-manager/
├── backend/
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Authentication & authorization
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   ├── db/               # Database connection
│   ├── server.js         # Main server file
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service calls
│   │   ├── hooks/        # Custom React hooks
│   │   ├── styles/       # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB account (Atlas or local)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-manager
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

4. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Projects
- `GET /api/projects` - Get all user projects (Protected)
- `POST /api/projects` - Create new project (Protected)
- `GET /api/projects/:projectId` - Get single project (Protected)
- `PUT /api/projects/:projectId` - Update project (Protected)
- `DELETE /api/projects/:projectId` - Delete project (Protected)
- `POST /api/projects/:projectId/members` - Add member (Protected)
- `DELETE /api/projects/:projectId/members` - Remove member (Protected)

### Tasks
- `GET /api/tasks` - Get user's assigned tasks (Protected)
- `POST /api/tasks/project/:projectId` - Create task in project (Protected)
- `GET /api/tasks/project/:projectId` - Get project tasks (Protected)
- `GET /api/tasks/:taskId` - Get single task (Protected)
- `PUT /api/tasks/:taskId` - Update task (Protected)
- `DELETE /api/tasks/:taskId` - Delete task (Protected)
- `GET /api/tasks/stats/dashboard` - Get dashboard statistics (Protected)

## Usage

### Creating a Project
1. Login to your account
2. Navigate to "Projects" page
3. Click "+ New Project" button
4. Fill in project details and submit
5. Start adding tasks to your project

### Managing Tasks
1. Open a project
2. Click "+ New Task" button
3. Enter task details (title, description, priority, due date)
4. Update task status by selecting from dropdown
5. Delete tasks as needed

### Team Management
1. Open a project you own
2. Click "+ Add Member" button
3. Enter member email or ID
4. Member will be added to project

## Role-Based Access

**Admin:**
- Can create, edit, and delete any project
- Can manage all tasks
- Can remove any members from projects

**Member:**
- Can create projects and be owner
- Can view and update assigned tasks
- Can view project details and team members

## Deployment on Railway

1. **Create Railway Account** - Sign up at [railway.app](https://railway.app)

2. **Connect GitHub Repository**
   - Link your GitHub account to Railway
   - Select this project repository

3. **Configure Environment Variables**
   - In Railway dashboard, add these variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `NODE_ENV`: Set to `production`
     - `PORT`: Set to `5000`

4. **Deploy**
   - Railway will automatically deploy when you push to main branch
   - Frontend will be built automatically
   - Backend will start with `npm start`

5. **Update Frontend API URL**
   - After deployment, update `REACT_APP_API_URL` in frontend `.env.production`
   - Use your Railway backend URL

## Demo

[Demo video link to be added after deployment]

## Testing

### Test Account
- Email: test@example.com
- Password: password123

Or create a new account at signup page.

## Future Enhancements

- [ ] Task comments and activity timeline
- [ ] File attachments for tasks
- [ ] Task labels and filtering
- [ ] Team notifications
- [ ] Progress charts and reports
- [ ] Calendar view for tasks
- [ ] Mobile app support
- [ ] Email notifications
- [ ] Real-time collaboration

## Contributing

Feel free to fork this repository and submit pull requests.

## License

MIT License

## Support

For issues or questions, please open an issue on GitHub.

---

**Author:** Aryan
**Last Updated:** May 1, 2026
