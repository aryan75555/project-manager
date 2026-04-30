@echo off
REM =====================================================
REM   PROJECTHUB - SUPER EASY GITHUB UPLOAD
REM   Bhai ke liye - Bilkul simple!
REM =====================================================
REM

echo.
echo =====================================================
echo        PROJECTHUB - GITHUB UPLOAD SETUP
echo =====================================================
echo.
echo Ye script tere liye sab kuch setup kar dega!
echo Bas ek baar ye run kar aur phir steps follow kar.
echo.
pause

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git nahi installed hai!
    echo https://git-scm.com/download/win se install kar
    pause
    exit /b 1
)

echo ✅ Git installed hai - bagus!
echo.

REM Configure git
echo Configure kar rahe hain...
set /p github_email="Enter tera GitHub email: "
set /p github_name="Enter tera GitHub username: "

git config --global user.email "%github_email%"
git config --global user.name "%github_name%"

echo ✅ Git configured!
echo.

REM Show instructions
echo.
echo =====================================================
echo   AB YE STEPS FOLLOW KAR:
echo =====================================================
echo.
echo STEP 1: GitHub par repo banao
echo   - Jao: https://github.com/new
echo   - Name: project-manager
echo   - Public karo
echo   - Initialize mat karo
echo   - Create repository button dabo
echo.
echo STEP 2: HTTPS URL copy kar
echo   - GitHub page par "Code" button dabo
echo   - HTTPS URL copy kar (Ctrl+C)
echo   - Dikh raha hai na green button?
echo.
echo STEP 3: Ye command run kar (neeche likha hai)
echo   - Apna URL paste kar jahan likha hai URL_PASTE_HERE
echo.
echo =====================================================
echo.

set /p github_url="Paste tera GitHub URL (https://github.com/...): "

if "%github_url%"=="" (
    echo ERROR: URL paste nahi kiya!
    pause
    exit /b 1
)

echo.
echo Uploading to GitHub...
echo.

cd /d c:\Users\Aryan\Desktop\project-manager

git remote add origin %github_url%
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =====================================================
    echo ✅ SUCCESS! Tera project GitHub par upload ho gaya!
    echo =====================================================
    echo.
    echo Ab jao: %github_url%
    echo Dekh sakta hai sara code!
    echo.
    echo Ab Railway par deploy kar:
    echo   1. Jao: https://railway.app
    echo   2. Sign up with GitHub
    echo   3. New Project create kar
    echo   4. Repo select kar (project-manager)
    echo   5. Deploy ho jayega auto!
    echo.
) else (
    echo.
    echo ❌ ERROR - kuch galat hua
    echo GitHub par login nahi hua hoga
    echo.
    echo Ye try kar:
    echo 1. GitHub site par login ho ja
    echo 2. GitHub par new repo banao manually
    echo 3. Phir ye script dobara run kar
    echo.
)

pause
