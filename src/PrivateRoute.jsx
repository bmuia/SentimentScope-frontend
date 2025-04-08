import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext';

// Protect route if not authenticated
const PrivateRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not authenticated, redirect to unauthorized page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element; // Show protected component
};

export default PrivateRoute;
