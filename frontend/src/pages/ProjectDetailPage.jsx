import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectService, taskService } from '../services/services.js';

export const ProjectDetailPage = ({ user }) => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [taskData, setTaskData] = useState({ title: '', description: '', priority: 'MEDIUM', dueDate: '' });
  const [memberEmail, setMemberEmail] = useState('');

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      const projectRes = await projectService.getProject(projectId);
      const tasksRes = await taskService.getProjectTasks(projectId);
      const membersRes = await projectService.getProjectMembers(projectId);
      setProject(projectRes.data);
      setTasks(tasksRes.data);
      setMembers(membersRes.data);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask(projectId, taskData);
      setTaskData({ title: '', description: '', priority: 'MEDIUM', dueDate: '' });
      setShowTaskForm(false);
      fetchProjectData();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await projectService.addMember(projectId, { email: memberEmail, role: 'MEMBER' });
      setMemberEmail('');
      setShowMemberForm(false);
      fetchProjectData();
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await taskService.updateTask(projectId, taskId, { status: newStatus });
      fetchProjectData();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!project) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-600 mb-8">{project.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Tasks</h2>
              <button onClick={() => setShowTaskForm(!showTaskForm)} className="btn-primary text-sm">
                + Add Task
              </button>
            </div>

            {showTaskForm && (
              <form onSubmit={handleCreateTask} className="mb-4 p-4 bg-gray-50 rounded-lg space-y-4">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={taskData.title}
                  onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  value={taskData.description}
                  onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={taskData.priority}
                  onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
                <input
                  type="date"
                  value={taskData.dueDate}
                  onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <div className="flex gap-2">
                  <button type="submit" className="btn-primary">Create</button>
                  <button type="button" onClick={() => setShowTaskForm(false)} className="btn-secondary">Cancel</button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold mb-2">{task.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                      className="px-2 py-1 text-sm border border-gray-300 rounded"
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                    <span className={`px-2 py-1 text-sm rounded ${
                      task.priority === 'HIGH' ? 'bg-red-100' :
                      task.priority === 'MEDIUM' ? 'bg-yellow-100' :
                      'bg-green-100'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Members */}
        <div>
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Members</h2>
              <button onClick={() => setShowMemberForm(!showMemberForm)} className="btn-primary text-sm">
                + Add
              </button>
            </div>

            {showMemberForm && (
              <form onSubmit={handleAddMember} className="mb-4 space-y-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <div className="flex gap-2">
                  <button type="submit" className="btn-primary text-sm w-full">Add</button>
                  <button type="button" onClick={() => setShowMemberForm(false)} className="btn-secondary text-sm w-full">Cancel</button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {members.map((member) => (
                <div key={member.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                  <p className="font-bold">{member.name}</p>
                  <p className="text-gray-600">{member.email}</p>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded inline-block mt-1">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
