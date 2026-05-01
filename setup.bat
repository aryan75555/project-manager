@echo off
REM Project Manager - Quick Setup Script for Windows

echo.
echo ====================================
echo  Project Manager Setup
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [1/4] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [2/4] Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [3/4] Creating .env files...

if not exist "backend\.env" (
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/project-manager
        echo JWT_SECRET=dev_secret_key_change_in_production
        echo NODE_ENV=development
    ) > backend\.env
    echo Created backend\.env
)

if not exist "frontend\.env" (
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
    ) > frontend\.env
    echo Created frontend\.env
)

echo.
echo [4/4] Setup Complete!
echo.
echo ====================================
echo  Next Steps
echo ====================================
echo.
echo 1. Start Backend (in new terminal):
echo    cd backend
echo    npm start
echo.
echo 2. Start Frontend (in another new terminal):
echo    cd frontend
echo    npm start
echo.
echo 3. Open browser:
echo    http://localhost:3000
echo.
echo 4. For MongoDB:
echo    - Use MongoDB Atlas (cloud) - recommended
echo    - OR install local MongoDB
echo.
echo See LOCAL_SETUP.md for detailed instructions
echo.
pause
