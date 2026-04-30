@echo off
REM Install dependencies for both backend and frontend
cd backend
call npm install
cd ..
cd frontend
call npm install
cd ..

echo ✅ Dependencies installed successfully!
echo.
echo 📝 Next steps:
echo 1. Configure backend/.env with your PostgreSQL credentials
echo 2. Run: cd backend ^&^& npm start
echo 3. In another terminal: cd frontend ^&^& npm run dev
echo 4. Open http://localhost:3000
