import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectsAPI, tasksAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import '../styles/projectDetail.css';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });
  const [memberData, setMemberData] = useState({
    memberId: '',
  });

  useEffect(() => {
    fetchProjectAndTasks();
  }, [projectId]);

  const fetchProjectAndTasks = async () => {
    try {
      setLoading(true);
      const [projectRes, tasksRes] = await Promise.all([
        projectsAPI.getProject(projectId),
        tasksAPI.getProjectTasks(projectId),
      ]);
      setProject(projectRes.data);
      setTasks(tasksRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      await tasksAPI.createTask(projectId, formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
      });
      setShowTaskForm(false);
      fetchProjectAndTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      await tasksAPI.updateTask(taskId, { status: newStatus });
      fetchProjectAndTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Delete this task?')) {
      try {
        await tasksAPI.deleteTask(taskId);
        fetchProjectAndTasks();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  const isProjectOwner = project?.owner._id === user?.id;

  if (loading) return <div className="loading">Loading project...</div>;
  if (!project) return <div className="error-message">Project not found</div>;

  return (
    <div className="project-detail-container">
      <div className="project-header">
        <div>
          <h1>{project.name}</h1>
          <p className="project-description">{project.description}</p>
        </div>
        <span className="status-badge">{project.status}</span>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="project-content">
        <div className="tasks-section">
          <h2>Tasks ({tasks.length})</h2>

          {showTaskForm && (
            <div className="form-card">
              <form onSubmit={handleTaskSubmit}>
                <div className="form-group">
                  <label>Task Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleTaskChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleTaskChange}
                    rows="3"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleTaskChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleTaskChange}
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    Create Task
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowTaskForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <button
            className="btn-primary btn-new"
            onClick={() => setShowTaskForm(!showTaskForm)}
          >
            {showTaskForm ? '✕ Cancel' : '+ New Task'}
          </button>

          {tasks.length === 0 ? (
            <div className="empty-state">No tasks yet</div>
          ) : (
            <div className="tasks-list">
              {tasks.map((task) => (
                <div key={task._id} className="task-card">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span className={`priority-badge priority-${task.priority}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="task-description">{task.description}</p>
                  <div className="task-meta">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleTaskStatusChange(task._id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    {task.dueDate && (
                      <span className="due-date">
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <button
                    className="btn-danger btn-small"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="members-section">
          <h2>Team Members ({project.members.length})</h2>
          <div className="members-list">
            {project.members.map((member) => (
              <div key={member.userId._id} className="member-card">
                <span className="member-name">{member.userId.name}</span>
                <span className="member-role">{member.role}</span>
              </div>
            ))}
          </div>

          {isProjectOwner && (
            <>
              {showMemberForm && (
                <div className="form-card">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // TODO: Implement add member functionality
                      setShowMemberForm(false);
                    }}
                  >
                    <div className="form-group">
                      <label>Member Email or ID</label>
                      <input
                        type="text"
                        value={memberData.memberId}
                        onChange={(e) =>
                          setMemberData({ memberId: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        Add Member
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setShowMemberForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <button
                className="btn-secondary"
                onClick={() => setShowMemberForm(!showMemberForm)}
              >
                {showMemberForm ? '✕ Cancel' : '+ Add Member'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
