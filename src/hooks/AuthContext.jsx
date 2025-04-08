import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the Auth Context
const AuthContext = createContext();

// AuthProvider to manage auth logic
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // On page load, check if the user is already logged in (check localStorage)
  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (access, refresh) => {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    setIsAuthenticated(true);
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context in other components
export const useAuth = () => useContext(AuthContext);
