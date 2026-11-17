import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import DetailPage from '../../pages/DetailPage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import NewThreadPage from '../../pages/NewThreadPage';
import LeaderboardsPage from '../../pages/LeaderboardsPage';
import NotFoundPage from '../../pages/NotFoundPage';
import GuestRoute from '../atoms/GuestRoute';
import ProtectedRoute from '../atoms/ProtectedRoute';

function AppRoutes({ authUser }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/threads/:id" element={<DetailPage />} />
      <Route
        path="/new"
        element={
          <ProtectedRoute authUser={authUser}>
            <NewThreadPage />
          </ProtectedRoute>
        }
      />
      <Route path="/leaderboards" element={<LeaderboardsPage />} />
      <Route
        path="/login"
        element={
          <GuestRoute authUser={authUser}>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute authUser={authUser}>
            <RegisterPage />
          </GuestRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
