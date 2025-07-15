// src/api/chatbot.js
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/chatbot';

export async function sendChatMessage(token, message) {
  const res = await axios.post(
    `${API_BASE}/`,
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
