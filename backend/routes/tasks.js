const express = require('express');
const { body } = require('express-validator');
const { authMiddleware } = require('../middleware/auth');
const {
  createTask,
  getProjectTasks,
  getUserTasks,
  getTask,
  updateTask,
  deleteTask,
  getDashboardStats,
} = require('../controllers/taskController');

const router = express.Router();

// Get dashboard stats
router.get('/stats/dashboard', authMiddleware, getDashboardStats);

// Create a new task in project
router.post(
  '/project/:projectId',
  authMiddleware,
  [body('title', 'Task title is required').trim().notEmpty()],
  createTask
);

// Get all tasks for a project
router.get('/project/:projectId', authMiddleware, getProjectTasks);

// Get all tasks assigned to user
router.get('/', authMiddleware, getUserTasks);

// Get single task
router.get('/:taskId', authMiddleware, getTask);

// Update task
router.put(
  '/:taskId',
  authMiddleware,
  [body('title', 'Task title is required').trim().notEmpty()],
  updateTask
);

// Delete task
router.delete('/:taskId', authMiddleware, deleteTask);

module.exports = router;
