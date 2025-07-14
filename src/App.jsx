import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Chatbot from './pages/Chatbot';
import './App.css';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/appointments" element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/chatbot" element={
            <PrivateRoute>
              <Chatbot />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/appointments" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
