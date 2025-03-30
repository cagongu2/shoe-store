import React from 'react'
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const {currentUser, loading} = useAuth();

    if(loading) {
        return <Loading/>
    }
    if(currentUser) {
        return children;
    }
  
    return <Navigate to="/login" replace/>
}
