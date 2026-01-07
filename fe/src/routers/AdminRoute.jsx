import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <Loading />;

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/dang-nhap" replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
