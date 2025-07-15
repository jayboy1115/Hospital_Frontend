// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#f9f9f9', borderRadius: 8 }}>
      <h1>Welcome{user ? `, ${user.full_name || user.email}` : ''}!</h1>
      <p>This is your hospital dashboard. Use the links below to navigate:</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/chatbot">Chatbot</Link></li>
      </ul>
    </div>
  );
}
