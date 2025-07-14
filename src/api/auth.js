import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/authentication';

export async function login(email, password) {
  const res = await axios.post(`${API_BASE}/login/`, { email, password });
  return res.data;
}

export async function register(data) {
  const res = await axios.post(`${API_BASE}/register/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function getUser(token) {
  const res = await axios.get(`${API_BASE}/user/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
