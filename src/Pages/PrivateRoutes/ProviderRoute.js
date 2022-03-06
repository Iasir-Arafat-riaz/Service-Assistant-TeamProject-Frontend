// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, useLocation } from 'react-router-dom';
// import { allData } from '../../redux/dataSlice/dataSlice';

// const ProviderRoute = ({ children, ...rest }) => {
//     const { allUser, user } = useSelector(allData);
//     console.log("user role", user.role);
//     const location = useLocation();

//     if (user?.email && allUser.filter((user) => user?.role === "provider")) {
//         return children;
//     }
//     return <Navigate to="/home" state={{ from: location }} />;

// };
// export default ProviderRoute;