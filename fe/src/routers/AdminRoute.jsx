import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchUserByEmailQuery } from '../redux/features/users/userApi';
import Loading from '../components/Loading';

const AdminRoute = ({ children }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { data: userData, isLoading: queryLoading } = useFetchUserByEmailQuery(currentUser?.email, {
    skip: !currentUser?.email,
  });



  // If not logged in at all, redirect
  if (!currentUser) {
    return <Navigate to="/dang-nhap" replace />;
  }

  // 1. Optimistic Check: If local storage says Admin, allow access immediately.
  if (currentUser.role === 'admin') {
    return children ? children : <Outlet />;
  }

  // 2. Server Check: If local says 'user', but server might say 'admin', wait for query.
  if (queryLoading) {
    return <Loading />;
  }

  // 3. Final Verification: If server data confirms Admin, allow access.
  if (userData?.role === 'admin') {
    return children ? children : <Outlet />;
  }

  // Otherwise, access denied
  console.warn("Access denied: Redirecting to login");
  return <Navigate to="/dang-nhap" replace />;
};

export default AdminRoute;
