const express = require('express');
const { body } = require('express-validator');
const { authMiddleware } = require('../middleware/auth');
const {
  createProject,
  getUserProjects,
  getProject,
  updateProject,
  addMember,
  removeMember,
  deleteProject,
} = require('../controllers/projectController');

const router = express.Router();

// Create a new project
router.post(
  '/',
  authMiddleware,
  [
    body('name', 'Project name is required').trim().notEmpty(),
    body('description', 'Description is required').trim().notEmpty(),
  ],
  createProject
);

// Get all projects for user
router.get('/', authMiddleware, getUserProjects);

// Get single project
router.get('/:projectId', authMiddleware, getProject);

// Update project
router.put(
  '/:projectId',
  authMiddleware,
  [body('name', 'Project name is required').trim().notEmpty()],
  updateProject
);

// Add member to project
router.post('/:projectId/members', authMiddleware, addMember);

// Remove member from project
router.delete('/:projectId/members', authMiddleware, removeMember);

// Delete project
router.delete('/:projectId', authMiddleware, deleteProject);

module.exports = router;
