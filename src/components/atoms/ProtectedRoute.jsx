import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ authUser, children }) {
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
