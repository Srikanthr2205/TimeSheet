// src/api/admin.ts
import axios from './axios';// assuming axios instance is configured here

export const fetchAdminDashboardStats = async () => {
  const response = await axios.get('/admin/dashboard');
  return response.data;
};
