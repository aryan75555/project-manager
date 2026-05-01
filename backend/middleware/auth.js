const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

const checkProjectAccess = async (req, res, next) => {
  try {
    const Project = require('../models/Project');
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const isOwner = project.owner.toString() === req.userId;
    const isMember = project.members.some(
      (m) => m.userId.toString() === req.userId
    );

    if (!isOwner && !isMember && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { authMiddleware, adminMiddleware, checkProjectAccess };
