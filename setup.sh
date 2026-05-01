#!/bin/bash

# Project Manager - Quick Setup Script for macOS/Linux

echo ""
echo "===================================="
echo "  Project Manager Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "[1/4] Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi
cd ..

echo ""
echo "[2/4] Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
cd ..

echo ""
echo "[3/4] Creating .env files..."

if [ ! -f "backend/.env" ]; then
    cat > backend/.env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/project-manager
JWT_SECRET=dev_secret_key_change_in_production
NODE_ENV=development
EOF
    echo "Created backend/.env"
fi

if [ ! -f "frontend/.env" ]; then
    cat > frontend/.env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF
    echo "Created frontend/.env"
fi

echo ""
echo "[4/4] Setup Complete!"
echo ""
echo "===================================="
echo "  Next Steps"
echo "===================================="
echo ""
echo "1. Start Backend (in new terminal):"
echo "   cd backend"
echo "   npm start"
echo ""
echo "2. Start Frontend (in another terminal):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "3. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "4. For MongoDB:"
echo "   - Use MongoDB Atlas (cloud) - recommended"
echo "   - OR install local MongoDB"
echo ""
echo "See LOCAL_SETUP.md for detailed instructions"
echo ""
