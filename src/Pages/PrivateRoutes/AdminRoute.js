import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { allData } from '../../redux/dataSlice/dataSlice';


const AdminRoute = ({ children, ...rest }) => {
    const { allUser, user } = useSelector(allData);
    console.log("user role", user.role);
    const location = useLocation();

    if (user?.email && allUser.filter((user) => user?.role === "admin")) {
        return children;
    }
    return <Navigate to="/home" state={{ from: location }} />;

};
export default AdminRoute;