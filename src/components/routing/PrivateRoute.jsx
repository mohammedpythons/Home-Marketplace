import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuthStatus from '../../hooks/useAuthStatus';
import Spinner from '../Spinner';

const PrivateRoute = () => {
  const [loggedin, checkingStatus] = useAuthStatus()
    if (checkingStatus){
      return <Spinner />
    }


  return loggedin && !checkingStatus ? <Outlet /> : <Navigate to='/signin' />
};

export default PrivateRoute;
