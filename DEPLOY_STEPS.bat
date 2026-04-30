@echo off
REM ProjectHub - Complete Deployment Setup Guide
REM This helps you deploy to GitHub and Railway

echo.
echo ================================
echo Project Management - Deployment Setup
echo ================================
echo.

echo Step 1: Create GitHub Repository
echo ================================
echo.
echo Go to https://github.com/new
echo.
echo Create a new repository with these settings:
echo   - Repository name: project-manager
echo   - Description: Full-stack project management application
echo   - Make it Public
echo   - DO NOT initialize with README or .gitignore
echo.
echo After creation, copy the HTTPS URL
echo.
echo Then run in this folder:
echo   git remote add origin (paste-your-url-here)
echo   git branch -M main
echo   git push -u origin main
echo.
echo When asked for credentials, enter your GitHub username and password
echo (or use a personal access token if 2FA is enabled)
echo.

echo.
echo Step 2: Deploy to Railway
echo ================================
echo.
echo 1. Visit https://railway.app
echo 2. Sign up with GitHub
echo 3. New Project ^> Deploy from GitHub
echo 4. Select project-manager repo
echo.
echo 5. Add PostgreSQL plugin
echo.
echo 6. Backend Configuration:
echo    Start: npm start --prefix backend
echo    Env vars:
echo      NODE_ENV=production
echo      JWT_SECRET=(generate random string)
echo      CLIENT_URL=(your-frontend-railway-url)
echo.
echo 7. Frontend Configuration:
echo    Build: npm run build --prefix frontend
echo    Start: npm run preview --prefix frontend
echo    Env var:
echo      VITE_API_URL=(your-backend-railway-url/api)
echo.
echo 8. Deploy on Railway (auto-deploys on GitHub push)
echo.

echo.
echo Your project is ready!
echo ================================
echo.
echo Next Steps:
echo 1. Create GitHub repo at https://github.com/new
echo 2. Run: git remote add origin (your-url)
echo 3. Run: git push -u origin main
echo 4. Deploy on Railway (https://railway.app)
echo 5. Record demo video
echo.
pause
