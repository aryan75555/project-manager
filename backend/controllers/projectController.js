import { query } from '../db/pool.js';
import { validationResult, body } from 'express-validator';

export const projectValidation = [
  body('name').notEmpty().trim(),
  body('description').optional().trim()
];

// Create project
export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;
  const adminId = req.user.id;

  try {
    const result = await query(
      'INSERT INTO projects (name, description, admin_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description || null, adminId]
    );

    const projectId = result.rows[0].id;

    // Add admin as project member
    await query(
      'INSERT INTO project_members (project_id, user_id, role) VALUES ($1, $2, $3)',
      [projectId, adminId, 'ADMIN']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all projects for user
export const getUserProjects = async (req, res) => {
  try {
    const result = await query(`
      SELECT DISTINCT p.* FROM projects p
      INNER JOIN project_members pm ON p.id = pm.project_id
      WHERE pm.user_id = $1
      ORDER BY p.created_at DESC
    `, [req.user.id]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get project details
export const getProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    // Check if user has access
    const accessCheck = await query(
      'SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2',
      [projectId, req.user.id]
    );

    if (accessCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await query('SELECT * FROM projects WHERE id = $1', [projectId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update project
export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { name, description, status } = req.body;

  try {
    // Check if user is admin
    const adminCheck = await query(
      'SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2 AND role = $3',
      [projectId, req.user.id, 'ADMIN']
    );

    if (adminCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const result = await query(
      'UPDATE projects SET name = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [name, description, status, projectId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add member to project
export const addProjectMember = async (req, res) => {
  const { projectId } = req.params;
  const { email, role } = req.body;

  try {
    // Check if user is admin
    const adminCheck = await query(
      'SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2 AND role = $3',
      [projectId, req.user.id, 'ADMIN']
    );

    if (adminCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Find user by email
    const userResult = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = userResult.rows[0].id;

    // Add member
    const result = await query(
      'INSERT INTO project_members (project_id, user_id, role) VALUES ($1, $2, $3) ON CONFLICT (project_id, user_id) DO UPDATE SET role = $3 RETURNING *',
      [projectId, userId, role || 'MEMBER']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get project members
export const getProjectMembers = async (req, res) => {
  const { projectId } = req.params;

  try {
    const result = await query(`
      SELECT pm.id, pm.role, u.id as user_id, u.name, u.email
      FROM project_members pm
      INNER JOIN users u ON pm.user_id = u.id
      WHERE pm.project_id = $1
    `, [projectId]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Remove project member
export const removeProjectMember = async (req, res) => {
  const { projectId, memberId } = req.params;

  try {
    // Check if user is admin
    const adminCheck = await query(
      'SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2 AND role = $3',
      [projectId, req.user.id, 'ADMIN']
    );

    if (adminCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    await query('DELETE FROM project_members WHERE id = $1', [memberId]);
    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
