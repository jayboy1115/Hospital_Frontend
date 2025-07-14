import React, { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    formData.append('email', email);
    formData.append('full_name', fullName);
    formData.append('password', password);
    if (profileImage) formData.append('profile_image', profileImage);
    const success = await register(formData);
    if (success) {
      navigate('/appointments');
    } else {
      setError('Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="file" accept="image/*" onChange={e => setProfileImage(e.target.files[0])} />
        <button type="submit">Register</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Register;
