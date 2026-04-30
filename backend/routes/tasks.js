import express from 'express';
import {
  createTask,
  getProjectTasks,
  getUserTasks,
  updateTask,
  deleteTask,
  getDashboardStats,
  taskValidation
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/dashboard/stats', getDashboardStats);
router.get('/my-tasks', getUserTasks);
router.post('/:projectId', taskValidation, createTask);
router.get('/:projectId', getProjectTasks);
router.put('/:projectId/:taskId', taskValidation, updateTask);
router.delete('/:projectId/:taskId', deleteTask);

export default router;
