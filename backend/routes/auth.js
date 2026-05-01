const express = require('express');
const { body } = require('express-validator');
const { signup, login, getCurrentUser } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Signup
router.post(
  '/signup',
  [
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Please include valid email').isEmail(),
    body('password', 'Password must be 6 or more characters').isLength({
      min: 6,
    }),
  ],
  signup
);

// Login
router.post(
  '/login',
  [
    body('email', 'Please include valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  login
);

// Get current user
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
