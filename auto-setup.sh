#!/usr/bin/env bash

# ============================================
# Project Manager - Complete Setup Script
# ============================================
# This script does EVERYTHING for you
# ============================================

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   PROJECT MANAGER - AUTO SETUP        ║"
echo "║   Hum sab kuch kar denge for you! 😎  ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nahi hai! Download from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# =========================
# STEP 1: BACKEND SETUP
# =========================
echo "📦 [Step 1/3] Backend dependencies install kar rahe hain..."
cd backend
npm install --silent
echo "✅ Backend packages installed"
echo ""

# =========================
# STEP 2: FRONTEND SETUP  
# =========================
echo "📦 [Step 2/3] Frontend dependencies install kar rahe hain..."
cd ../frontend
npm install --silent
echo "✅ Frontend packages installed"
echo ""

# =========================
# STEP 3: ENV SETUP
# =========================
echo "⚙️  [Step 3/3] Environment files setup kar rahe hain..."
cd ..

# Create backend .env
cat > backend/.env << 'EOF'
PORT=5000
MONGODB_URI=mongodb+srv://testuser:TestPassword123@cluster0.mongodb.net/project-manager?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_12345_change_this
NODE_ENV=development
EOF

# Create frontend .env
cat > frontend/.env << 'EOF'
REACT_APP_API_URL=http://localhost:5000/api
EOF

echo "✅ Environment files ready"
echo ""

# =========================
# SUCCESS MESSAGE
# =========================
echo "╔════════════════════════════════════════╗"
echo "║     ✅ SETUP COMPLETE!                ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "🚀 Ab ye commands run karo:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "⏰ 2-3 minutes main app khul jayega!"
echo ""
echo "📹 Phir features test kar ke video bana!"
echo ""
