# Local Development Setup Guide

## Prerequisites

- Node.js v14+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Git installed

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create `.env` file with your MongoDB connection:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/project-manager
JWT_SECRET=your_secret_key_change_me
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project-manager?retryWrites=true&w=majority
```

### 3. Start Backend Server

```bash
npm start
```

Or with auto-reload (requires nodemon):
```bash
npm install --save-dev nodemon
npm run dev
```

Server runs at: `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

`.env` file already configured for local development:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Frontend Server

```bash
npm start
```

Frontend opens at: `http://localhost:3000`

## Testing the Application

### Create Test Account

1. Go to http://localhost:3000/signup
2. Create account with:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123

### Create Test Project

1. Click "Projects" in navigation
2. Click "+ New Project"
3. Enter:
   - Name: My First Project
   - Description: Learning project manager
4. Click Create

### Create Test Task

1. Click on your project
2. Click "+ New Task"
3. Enter:
   - Title: Setup database
   - Description: Configure MongoDB
   - Priority: High
   - Due Date: Select date
4. Click Create

### Dashboard

1. Click Dashboard to see statistics
2. Verify task counts update

## API Testing with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Test Project",
    "description": "A test project"
  }'
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=5001
```

### MongoDB Connection Error
- For local MongoDB: Ensure MongoDB is running
- For MongoDB Atlas: Check connection string and IP whitelist

### CORS Errors
- Verify `REACT_APP_API_URL` matches backend URL
- Check CORS configuration in `backend/server.js`

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

- Use React DevTools browser extension for debugging
- Check browser console for API errors
- Use Network tab in DevTools to inspect API calls
- MongoDB Compass helps visualize database

## Next Steps

After local testing:
1. Create GitHub repository
2. Follow DEPLOYMENT.md for Railway setup
3. Test on live server
4. Share your live URL!

---

For issues, check the README.md or create an issue on GitHub.
