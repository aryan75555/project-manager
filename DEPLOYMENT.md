# ProjectHub - Deployment Guide

## 🚀 Railway Deployment (Recommended)

### Prerequisites
- GitHub account (with repo pushed)
- Railway account (railway.app)

### Step-by-Step Deployment

#### 1. Prepare Your Repository

```bash
git init
git add .
git commit -m "Initial ProjectHub commit"
git remote add origin https://github.com/yourusername/project-manager.git
git branch -M main
git push -u origin main
```

#### 2. Create Railway Account
- Go to [railway.app](https://railway.app)
- Sign up with GitHub
- Create new project

#### 3. Connect GitHub Repository
- Click "New Project"
- Select "Deploy from GitHub repo"
- Authorize GitHub access
- Select your `project-manager` repository
- Railway will auto-detect and create services

#### 4. Add PostgreSQL Database
- In Railway dashboard
- Click "+" to add service
- Select "PostgreSQL"
- Railway automatically creates `DATABASE_URL` environment variable

#### 5. Configure Backend Service

**Environment Variables:**
```
NODE_ENV=production
JWT_SECRET=generate-random-secret-key-here
CLIENT_URL=https://your-frontend-domain.railway.app
```

**Build Command:**
```
npm install --prefix backend
```

**Start Command:**
```
npm start --prefix backend
```

**Add Custom Domain (optional):**
- Go to Settings
- Add domain like `api.projecthub.railway.app`

#### 6. Configure Frontend Service

**Build Command:**
```
npm install --prefix frontend && npm run build --prefix frontend
```

**Start Command:**
```
npm run preview --prefix frontend
```

**Environment Variables:**
```
VITE_API_URL=https://your-backend-domain/api
```

**Custom Domain:**
- Add domain like `projecthub.railway.app`

#### 7. Deploy

- Push changes to GitHub
- Railway will auto-deploy
- Check deployment logs
- Test live URL

### Environment Variables Checklist

**Backend:**
- ✅ DATABASE_URL (auto from PostgreSQL)
- ✅ JWT_SECRET (generate unique)
- ✅ NODE_ENV = production
- ✅ CLIENT_URL = frontend URL
- ✅ PORT = 5000

**Frontend:**
- ✅ VITE_API_URL = backend API URL

### Monitoring & Logs

In Railway Dashboard:
- View live logs
- Check deployment history
- Monitor resource usage
- Restart services if needed

### Troubleshooting

**Database Error:**
```
- Verify PostgreSQL service is running
- Check DATABASE_URL format
- View database logs in Railway
```

**CORS Errors:**
```
- Ensure CLIENT_URL matches frontend domain
- Check VITE_API_URL in frontend
- Verify backend CORS middleware
```

**Port Issues:**
```
- Railway auto-assigns ports
- Check PORT environment variable
- View service logs
```

**Build Failures:**
```
- Check deployment logs
- Verify npm scripts exist
- Ensure dependencies install correctly
```

### Post-Deployment Testing

1. **Visit Frontend URL**
   ```
   https://projecthub.railway.app
   ```

2. **Test Authentication**
   - Sign up new account
   - Login
   - Verify token storage

3. **Test Main Features**
   - Create project (Admin)
   - Add team members
   - Create tasks
   - Update task status
   - View dashboard

4. **Check API Health**
   ```
   https://your-backend-url/api/health
   ```

## 📱 Alternative Deployment Options

### Heroku (if Railway is unavailable)
```bash
heroku login
heroku create your-project-name
git push heroku main
heroku config:set JWT_SECRET=your_secret
heroku addons:create heroku-postgresql:hobby-dev
```

### Render
- Connect GitHub repo
- Auto-detect backend service
- Add PostgreSQL database
- Deploy

### Vercel (Frontend only)
- Connect GitHub repo
- Set `VITE_API_URL` environment variable
- Deploy

## 🔐 Security Checklist

- ✅ JWT_SECRET is unique and secure
- ✅ Password hashing enabled (bcryptjs)
- ✅ CORS properly configured
- ✅ HTTPS enforced
- ✅ SQL injection protected (parameterized queries)
- ✅ Environment variables not committed to repo
- ✅ Rate limiting considered (future)

## 📊 Performance Tips

1. **Database Indexing:**
   - Already added indexes on foreign keys
   - Consider adding more for frequent queries

2. **Caching:**
   - Implement Redis for session storage (optional)
   - Cache frequently accessed data

3. **Monitoring:**
   - Set up error tracking (Sentry)
   - Monitor performance metrics

## 🔄 Continuous Deployment

Railway auto-deploys on every GitHub push:
1. Push code to main branch
2. GitHub webhook triggers Railway
3. Services rebuild and redeploy
4. Live updates within minutes

## 📞 Support & Resources

- Railway Docs: docs.railway.app
- Express Documentation: expressjs.com
- React Documentation: react.dev
- PostgreSQL Documentation: postgresql.org

---

**Questions?** Check the main README.md or QUICKSTART.md files.
