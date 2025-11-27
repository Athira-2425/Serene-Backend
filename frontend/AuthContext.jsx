import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if (token && user) {
      setCurrentUser(JSON.parse(user));
      setToken(token);
      setAuthToken(token);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await api.post('/auth/login/', { username, password });
    const { token, user, expiry } = response.data;

    localStorage.setItem('authToken', token);
    if (expiry) localStorage.setItem('tokenExpiry', expiry);
    localStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setCurrentUser(user);
    setAuthToken(token);

    return response.data;
  };

  const register = async (username, email, password) => {
    const response = await api.post('/auth/register/', { username, email, password });
    const { token, user } = response.data;

    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setCurrentUser(user);
    setAuthToken(token);

    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout/');
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      localStorage.clear();
      setCurrentUser(null);
      setToken(null);
      setAuthToken(null);
    }
  };

  const value = {
    currentUser,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
