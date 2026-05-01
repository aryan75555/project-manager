import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsAPI } from '../services/api';
import '../styles/projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getProjects();
      setProjects(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await projectsAPI.createProject(formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.deleteProject(id);
        fetchProjects();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  return (
    <div className="projects-container">
      <h1>Projects</h1>
      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-card">
          <h2>Create New Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Create Project
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        className="btn-primary btn-new"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? '✕ Cancel' : '+ New Project'}
      </button>

      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="empty-state">No projects yet. Create one to get started!</div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-meta">
                <span className="status-badge">{project.status}</span>
                <span className="members-count">
                  👥 {project.members.length} members
                </span>
              </div>
              <div className="project-actions">
                <button
                  className="btn-secondary"
                  onClick={() => navigate(`/project/${project._id}`)}
                >
                  View
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
