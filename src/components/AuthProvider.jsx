import React, { createContext, useState, useEffect, useContext } from 'react';
import { login, register, getUser } from '../api/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    if (token && !user) {
      getUser(token).then(setUser).catch(() => setUser(null));
    }
  }, [token, user]);

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password);
      if (data && data.access) {
        setToken(data.access);
        localStorage.setItem('token', data.access);
        const userData = await getUser(data.access);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
    } catch (e) {}
    return false;
  };

  const handleRegister = async (formData) => {
    try {
      const data = await register(formData);
      if (data && data.user) {
        // Optionally auto-login after register
        return await handleLogin(formData.get('email'), formData.get('password'));
      }
    } catch (e) {}
    return false;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, user, login: handleLogin, register: handleRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
