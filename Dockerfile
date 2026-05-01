FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Copy frontend and build
WORKDIR /app
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Setup production
WORKDIR /app/backend
COPY backend . 

EXPOSE 5000

CMD ["npm", "start"]
