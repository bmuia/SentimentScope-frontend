import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';
import { AuthProvider } from './hooks/AuthContext';
import PrivateRoute from './PrivateRoute';
import Signup from './pages/SIgnup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Route - Login */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private Route - Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute element={<Dashboard />} />
            }
          />

          {/* Unauthorized Route - If User Tries to Access Protected Routes Without Login */}
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
