import React from 'react'
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

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
