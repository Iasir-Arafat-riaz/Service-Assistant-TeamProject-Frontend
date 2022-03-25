import { CircularProgress } from '@mui/material';
import React from 'react';
import {  useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';
import { allData } from '../../redux/dataSlice/dataSlice';


const PrivateUserRoute = ({ children, ...rest }) => {
  let location = useLocation();
  const { allUser,  user,loading } = useSelector(allData);


// if(loading){
//   // console.log(loading);
//   return (<h1>Loading...</h1>)
  
// }


  return (
    <div>
      {user.email ? children : <Navigate state={{ from: location }} to="/login"></Navigate>}
    </div>
  );

};

export default PrivateUserRoute;