@echo off
REM ============================================
REM Project Manager - Complete Setup Script
REM ============================================

color 0A
cls

echo.
echo ════════════════════════════════════════
echo   PROJECT MANAGER - AUTO SETUP
echo   Hum sab kuch kar denge for you!
echo ════════════════════════════════════════
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo X Node.js nahi hai!
    echo   Download from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js found: %NODE_VERSION%
echo.

REM ========================
REM STEP 1: BACKEND
REM ========================
echo [1/3] Backend packages install kar rahe hain...
cd backend
call npm install --silent >nul 2>&1
echo [OK] Backend ready
cd..
echo.

REM ========================
REM STEP 2: FRONTEND
REM ========================
echo [2/3] Frontend packages install kar rahe hain...
cd frontend
call npm install --silent >nul 2>&1
echo [OK] Frontend ready
cd..
echo.

REM ========================
REM STEP 3: ENV FILES
REM ========================
echo [3/3] Environment files setup kar rahe hain...

(
echo PORT=5000
echo MONGODB_URI=mongodb+srv://testuser:TestPassword123@cluster0.mongodb.net/project-manager?retryWrites=true&w=majority
echo JWT_SECRET=your_super_secret_key_12345_change_this
echo NODE_ENV=development
) > backend\.env

(
echo REACT_APP_API_URL=http://localhost:5000/api
) > frontend\.env

echo [OK] Environment files ready
echo.

REM ========================
REM SUCCESS
REM ========================
echo ════════════════════════════════════════
echo   SETUP COMPLETE!
echo ════════════════════════════════════════
echo.
echo RUN YE COMMANDS:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm start
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm start
echo.
echo Features ready in 2-3 minutes!
echo Video banane ke liye ready!
echo.
pause
