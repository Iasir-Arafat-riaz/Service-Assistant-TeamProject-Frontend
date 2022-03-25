import { CircularProgress } from '@mui/material';
import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';
import { allData } from '../../redux/dataSlice/dataSlice';
import Loading from '../SharedRoute/Loader/Loading';


const PrivateUserRoute = ({ children, ...rest }) => {
  let location = useLocation();
  const { allUser, user, loading } = useSelector(allData);


  console.log(loading);
  if (loading) {
    return (<Loading />)

  }


  return (
    <div>
      {user.email ? children : <Navigate state={{ from: location }} to="/login"></Navigate>}
    </div>
  );

};

export default PrivateUserRoute;