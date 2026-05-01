const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, assignee, priority, dueDate } = req.body;
    const { projectId } = req.params;

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check user access to project
    const isOwner = project.owner.toString() === req.userId;
    const isMember = project.members.some(
      (m) => m.userId.toString() === req.userId
    );

    if (!isOwner && !isMember && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const task = new Task({
      title,
      description,
      project: projectId,
      assignee,
      priority,
      dueDate,
      createdBy: req.userId,
    });

    await task.save();
    await task.populate('assignee', 'name email');
    await task.populate('createdBy', 'name email');

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks for a project
exports.getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const tasks = await Task.find({ project: projectId })
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks assigned to user
exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignee: req.userId })
      .populate('project', 'name')
      .populate('createdBy', 'name email');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)
      .populate('assignee', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, assignee, priority, dueDate } =
      req.body;
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check authorization (creator or assignee or project owner or admin)
    const project = await Project.findById(task.project);
    const isCreator = task.createdBy.toString() === req.userId;
    const isAssignee = task.assignee?.toString() === req.userId;
    const isProjectOwner = project.owner.toString() === req.userId;

    if (
      !isCreator &&
      !isAssignee &&
      !isProjectOwner &&
      req.userRole !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (assignee) task.assignee = assignee;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;

    await task.save();
    await task.populate('assignee', 'name email');
    await task.populate('createdBy', 'name email');

    res.json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check authorization (creator or project owner or admin)
    const project = await Project.findById(task.project);
    const isCreator = task.createdBy.toString() === req.userId;
    const isProjectOwner = project.owner.toString() === req.userId;

    if (!isCreator && !isProjectOwner && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.taskId);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get tasks for user's projects
    const userProjects = await Project.find({
      $or: [
        { owner: req.userId },
        { 'members.userId': req.userId },
      ],
    });

    const projectIds = userProjects.map((p) => p._id);

    const totalTasks = await Task.countDocuments({ project: { $in: projectIds } });
    const completedTasks = await Task.countDocuments({
      project: { $in: projectIds },
      status: 'completed',
    });
    const inProgressTasks = await Task.countDocuments({
      project: { $in: projectIds },
      status: 'in-progress',
    });
    const overdueTasks = await Task.countDocuments({
      project: { $in: projectIds },
      dueDate: { $lt: today },
      status: { $ne: 'completed' },
    });

    res.json({
      totalTasks,
      completedTasks,
      inProgressTasks,
      overdueTasks,
      projectCount: projectIds.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
