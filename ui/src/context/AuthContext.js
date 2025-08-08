import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (access, refresh) => {
    console.log('login tokens:', { access, refresh })
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setUser(true);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch {
        logout();
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
