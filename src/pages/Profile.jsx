// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

export default function Profile() {
  const { user, token } = useAuth();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) return <div>Loading...</div>;

  const handleEdit = () => {
    setEditing(true);
    setFullName(user.full_name);
    setProfileImage(null);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setEditing(false);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const formData = new FormData();
    formData.append('full_name', fullName);
    if (profileImage) formData.append('profile_image', profileImage);
    try {
      const res = await axios.put(
        'http://localhost:8000/api/authentication/user/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccess('Profile updated!');
      setEditing(false);
      window.location.reload(); // reload to update context
    } catch (err) {
      setError('Update failed.');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>
      <p><b>Created At:</b> {user.created_at}</p>
      {user.profile_image && (
        <div><img src={user.profile_image} alt="Profile" width={100} /></div>
      )}
      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>Full Name:
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
          </label>
          <label>Profile Image:
            <input type="file" accept="image/*" onChange={e => setProfileImage(e.target.files[0])} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
          {error && <div style={{color:'red'}}>{error}</div>}
          {success && <div style={{color:'green'}}>{success}</div>}
        </form>
      ) : (
        <>
          <p><b>Full Name:</b> {user.full_name}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </>
      )}
    </div>
  );
}
