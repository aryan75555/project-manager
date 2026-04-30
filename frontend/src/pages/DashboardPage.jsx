import React, { useState, useEffect } from 'react';
import { taskService } from '../services/services.js';

export const DashboardPage = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await taskService.getDashboardStats();
      const tasksRes = await taskService.getUserTasks();
      setStats(statsRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="card bg-blue-50">
            <div className="text-3xl font-bold text-blue-600">{stats.tasks.total}</div>
            <div className="text-gray-600">Total Tasks</div>
          </div>
          <div className="card bg-yellow-50">
            <div className="text-3xl font-bold text-yellow-600">{stats.tasks.todo}</div>
            <div className="text-gray-600">To Do</div>
          </div>
          <div className="card bg-purple-50">
            <div className="text-3xl font-bold text-purple-600">{stats.tasks.in_progress}</div>
            <div className="text-gray-600">In Progress</div>
          </div>
          <div className="card bg-green-50">
            <div className="text-3xl font-bold text-green-600">{stats.tasks.completed}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="card bg-red-50">
            <div className="text-3xl font-bold text-red-600">{stats.tasks.overdue}</div>
            <div className="text-gray-600">Overdue</div>
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned to you</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Project</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Priority</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{task.title}</td>
                    <td className="px-4 py-2">{task.project_name}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        task.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                        task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-2">{task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
