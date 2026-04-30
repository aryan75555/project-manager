import API from './api.js';

export const authService = {
  signup: (data) => API.post('/auth/signup', data),
  login: (data) => API.post('/auth/login', data),
  getCurrentUser: () => API.get('/auth/me')
};

export const projectService = {
  createProject: (data) => API.post('/projects', data),
  getUserProjects: () => API.get('/projects'),
  getProject: (id) => API.get(`/projects/${id}`),
  updateProject: (id, data) => API.put(`/projects/${id}`, data),
  addMember: (projectId, data) => API.post(`/projects/${projectId}/members`, data),
  getMembers: (projectId) => API.get(`/projects/${projectId}/members`),
  removeMember: (projectId, memberId) => API.delete(`/projects/${projectId}/members/${memberId}`)
};

export const taskService = {
  createTask: (projectId, data) => API.post(`/tasks/${projectId}`, data),
  getProjectTasks: (projectId) => API.get(`/tasks/${projectId}`),
  getUserTasks: () => API.get('/tasks/my-tasks'),
  getDashboardStats: () => API.get('/tasks/dashboard/stats'),
  updateTask: (projectId, taskId, data) => API.put(`/tasks/${projectId}/${taskId}`, data),
  deleteTask: (projectId, taskId) => API.delete(`/tasks/${projectId}/${taskId}`)
};
