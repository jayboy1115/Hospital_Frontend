// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  // Add more state for editing fields if you want to support update

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Full Name:</b> {user.full_name}</p>
      <p><b>Role:</b> {user.role}</p>
      <p><b>Created At:</b> {user.created_at}</p>
      {user.profile_image && (
        <div><img src={user.profile_image} alt="Profile" width={100} /></div>
      )}
      {/* Add edit form here if you want to support profile update */}
    </div>
  );
}
