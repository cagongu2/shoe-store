import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <Loading />;

  console.log("AdminRoute checking access...");
  console.log("Loading status:", loading);
  console.log("Current User:", currentUser);
  console.log("User Role (raw):", currentUser?.role);
  console.log("User Role (stringified):", JSON.stringify(currentUser?.role));
  console.log("Type of Role:", typeof currentUser?.role);
  console.log("Check result:", currentUser?.role === 'admin');

  if (!currentUser || currentUser.role !== 'admin') {
    console.warn("Access denied: Redirecting to login");
    return <Navigate to="/dang-nhap" replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
