import express from 'express';
import {
  createProject,
  getUserProjects,
  getProject,
  updateProject,
  addProjectMember,
  getProjectMembers,
  removeProjectMember,
  projectValidation
} from '../controllers/projectController.js';

const router = express.Router();

router.post('/', projectValidation, createProject);
router.get('/', getUserProjects);
router.get('/:projectId', getProject);
router.put('/:projectId', projectValidation, updateProject);
router.post('/:projectId/members', addProjectMember);
router.get('/:projectId/members', getProjectMembers);
router.delete('/:projectId/members/:memberId', removeProjectMember);

export default router;
