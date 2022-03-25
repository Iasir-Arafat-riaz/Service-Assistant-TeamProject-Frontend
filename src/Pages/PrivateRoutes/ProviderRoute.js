import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { allData } from "../../redux/dataSlice/dataSlice";

const ProviderRoute = ({ children, ...rest }) => {
  const { allUser, user, getLoad } = useSelector(allData);

  const location = useLocation();

  if (!user.email) {
    return getLoad;
  }

  if (user?.email && allUser.filter((user) => user?.role === "provider")) {
    return children;
  }
  return <Navigate to="/home" state={{ from: location }} />;
};
export default ProviderRoute;
