import express from 'express';
import { signup, login, getCurrentUser, signupValidation, loginValidation } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/me', (req, res, next) => {
  // Simple middleware to check token
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  req.user = { id: req.query.userId }; // In real app, decode JWT
  next();
}, getCurrentUser);

export default router;
