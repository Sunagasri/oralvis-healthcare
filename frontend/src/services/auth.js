import API from './api';

export const authAPI = {
  login: (email, password) => API.post('/auth/login', { email, password }),
  register: (email, password, role) => API.post('/auth/register', { email, password, role }),
};