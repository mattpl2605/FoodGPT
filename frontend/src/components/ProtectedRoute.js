// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
