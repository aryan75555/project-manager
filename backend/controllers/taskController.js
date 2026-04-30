import { query } from '../db/pool.js';
import { validationResult, body } from 'express-validator';

export const taskValidation = [
  body('title').notEmpty().trim(),
  body('description').optional().trim(),
  body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH']),
  body('status').optional().isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
];

// Create task
export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { projectId } = req.params;
  const { title, description, assignedTo, priority, dueDate } = req.body;

  try {
    // Check if user has access to project
    const accessCheck = await query(
      'SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2',
      [projectId, req.user.id]
    );

    if (accessCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await query(
      `INSERT INTO tasks (project_id, title, description, assigned_to, priority, due_date, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [projectId, title, description || null, assignedTo || null, priority || 'MEDIUM', dueDate || null, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get project tasks
export const getProjectTasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const result = await query(`
      SELECT t.*, u.name as assigned_to_name, creator.name as created_by_name
      FROM tasks t
      LEFT JOIN users u ON t.assigned_to = u.id
      LEFT JOIN users creator ON t.created_by = creator.id
      WHERE t.project_id = $1
      ORDER BY t.created_at DESC
    `, [projectId]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user tasks (dashboard)
export const getUserTasks = async (req, res) => {
  try {
    const result = await query(`
      SELECT t.*, p.name as project_name, u.name as assigned_to_name
      FROM tasks t
      INNER JOIN projects p ON t.project_id = p.id
      LEFT JOIN users u ON t.assigned_to = u.id
      WHERE t.assigned_to = $1
      ORDER BY t.due_date ASC, t.created_at DESC
    `, [req.user.id]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update task
export const updateTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const { title, description, assignedTo, status, priority, dueDate } = req.body;

  try {
    // Check if user has access
    const accessCheck = await query(
      'SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2',
      [projectId, req.user.id]
    );

    if (accessCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await query(
      `UPDATE tasks 
       SET title = COALESCE($1, title), 
           description = COALESCE($2, description),
           assigned_to = COALESCE($3, assigned_to),
           status = COALESCE($4, status),
           priority = COALESCE($5, priority),
           due_date = COALESCE($6, due_date),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 AND project_id = $8
       RETURNING *`,
      [title, description, assignedTo, status, priority, dueDate, taskId, projectId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    // Check if user is admin
    const adminCheck = await query(
      'SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2 AND role = $3',
      [projectId, req.user.id, 'ADMIN']
    );

    if (adminCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    await query('DELETE FROM tasks WHERE id = $1 AND project_id = $2', [taskId, projectId]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const tasksResult = await query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'TODO' THEN 1 ELSE 0 END) as todo,
        SUM(CASE WHEN status = 'IN_PROGRESS' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN due_date < CURRENT_DATE AND status != 'COMPLETED' THEN 1 ELSE 0 END) as overdue
      FROM tasks
      WHERE assigned_to = $1
    `, [req.user.id]);

    const projectsResult = await query(`
      SELECT COUNT(*) as total FROM projects p
      INNER JOIN project_members pm ON p.id = pm.project_id
      WHERE pm.user_id = $1
    `, [req.user.id]);

    res.json({
      tasks: tasksResult.rows[0],
      projects: projectsResult.rows[0].total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
