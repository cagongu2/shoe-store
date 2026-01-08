import React from 'react'
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (currentUser) {
        return children;
    }

    return <Navigate to="/dang-nhap" replace />
}
