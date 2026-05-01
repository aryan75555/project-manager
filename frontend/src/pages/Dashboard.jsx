import React, { useState, useEffect } from 'react';
import { tasksAPI } from '../services/api';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
    projectCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getDashboardStats();
      setStats(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>📁 Projects</h3>
            <p className="stat-value">{stats.projectCount}</p>
          </div>
          <div className="stat-card">
            <h3>📋 Total Tasks</h3>
            <p className="stat-value">{stats.totalTasks}</p>
          </div>
          <div className="stat-card">
            <h3>✅ Completed</h3>
            <p className="stat-value">{stats.completedTasks}</p>
          </div>
          <div className="stat-card">
            <h3>⏳ In Progress</h3>
            <p className="stat-value">{stats.inProgressTasks}</p>
          </div>
          <div className="stat-card warning">
            <h3>⚠️ Overdue</h3>
            <p className="stat-value">{stats.overdueTasks}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
