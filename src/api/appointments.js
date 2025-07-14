// src/api/appointments.js
// API service for appointments endpoints
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/appointments';

// Set up axios instance with JWT token if available
export function getAuthAxios(token) {
  return axios.create({
    baseURL: API_BASE,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

// List appointments for the current user (patient)
export async function listAppointments(token) {
  const axiosInstance = getAuthAxios(token);
  const res = await axiosInstance.get('/my/');
  return res.data;
}

// Get appointment detail
export async function getAppointment(token, id) {
  const axiosInstance = getAuthAxios(token);
  const res = await axiosInstance.get(`/${id}/`);
  return res.data;
}

// Create appointment
export async function createAppointment(token, data) {
  const axiosInstance = getAuthAxios(token);
  const res = await axiosInstance.post('/my/', data);
  return res.data;
}

// Update appointment
export async function updateAppointment(token, id, data) {
  const axiosInstance = getAuthAxios(token);
  const res = await axiosInstance.patch(`/${id}/`, data);
  return res.data;
}

// Delete appointment
export async function deleteAppointment(token, id) {
  const axiosInstance = getAuthAxios(token);
  const res = await axiosInstance.delete(`/${id}/`);
  return res.data;
}
