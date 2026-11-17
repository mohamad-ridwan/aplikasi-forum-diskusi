import React from 'react';
import { Navigate } from 'react-router-dom';

function GuestRoute({ authUser, children }) {
  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default GuestRoute;
