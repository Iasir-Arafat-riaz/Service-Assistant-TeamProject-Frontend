import { CircularProgress } from '@mui/material';
import React from 'react';
import {  useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';
import { allData } from '../../redux/dataSlice/dataSlice';


const PrivateUserRoute = ({ children, ...rest }) => {
  let location = useLocation();
  const { allUser, getLoad, user } = useSelector(allData);


if(!user.email){
  return (getLoad)
}
  return (
    <div>
      {user.email ? children : <Navigate state={{ from: location }} to="/login"></Navigate>}
    </div>
  );

};

export default PrivateUserRoute;