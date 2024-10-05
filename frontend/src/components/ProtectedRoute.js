import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types'; // Import PropTypes

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth(); // Ensure isLoading is part of the auth context

  if (isLoading) {
    return <p>Loading...</p>; // Show a loading state while checking authentication
  }

  if (!user) {
    return <Navigate to="/" replace />; // Redirect to login page if not logged in
  }

  return children; // Render children if user is authenticated
};

// Adding prop types for validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
