const Project = require('../models/Project');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    const project = new Project({
      name,
      description,
      owner: req.userId,
      members: [
        {
          userId: req.userId,
          role: 'admin',
        },
      ],
    });

    await project.save();
    await project.populate('owner members.userId');

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects for user
exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.userId },
        { 'members.userId': req.userId },
      ],
    })
      .populate('owner', 'name email')
      .populate('members.userId', 'name email');

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate('owner', 'name email')
      .populate('members.userId', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, status } = req.body;
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (name) project.name = name;
    if (description) project.description = description;
    if (status) project.status = status;

    await project.save();
    await project.populate('owner members.userId');

    res.json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add member to project
exports.addMember = async (req, res) => {
  try {
    const { memberId, role } = req.body;
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if member already exists
    const memberExists = project.members.some(
      (m) => m.userId.toString() === memberId
    );

    if (memberExists) {
      return res.status(400).json({ message: 'Member already in project' });
    }

    // Check if user exists
    const user = await User.findById(memberId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    project.members.push({
      userId: memberId,
      role: role || 'member',
    });

    await project.save();
    await project.populate('owner members.userId');

    res.json({
      message: 'Member added successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove member from project
exports.removeMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    project.members = project.members.filter(
      (m) => m.userId.toString() !== memberId
    );

    await project.save();
    await project.populate('owner members.userId');

    res.json({
      message: 'Member removed successfully',
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Project.findByIdAndDelete(req.params.projectId);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
