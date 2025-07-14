import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data && data.token) {
      localStorage.setItem('token', data.token);
      setUser({ token: data.token });
      return true;
    }
    return false;
  };

  const register = async (email, password) => {
    const data = await registerUser(email, password);
    if (data && data.token) {
      localStorage.setItem('token', data.token);
      setUser({ token: data.token });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
