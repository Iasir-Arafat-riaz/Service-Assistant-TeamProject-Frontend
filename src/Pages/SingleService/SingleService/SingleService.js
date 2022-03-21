import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../SingleService.css";
import { useParams } from "react-router-dom";
import SingleServiceHeader from "../SingleServiceHeader/SingleServiceHeader";
import ServiceDetails from "../ServiceDetails/ServiceDetails";
import Loading from "../../SharedRoute/Loader/Loading";
import Navigation from "../../SharedRoute/Navigation/Navigation";
import { setItemInLocal } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { allData, singleService } from "../../../redux/dataSlice/dataSlice";
import Footer from '../../SharedRoute/Footer/Footer';
const SingleService = () => {
  const { serviceId } = useParams();
  const { singleServiceDetail, singleServiceLoading } = useSelector(allData)

  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(singleService(serviceId));
    
  }, [serviceId, dispatch])
  


  if (singleServiceLoading) {
    return <Loading />;
  }
  return (
    <>
      <Navigation />
      {singleServiceLoading ? (
        <Loading />
      ) : (
        <Box>
          <Navigation />
          <SingleServiceHeader matchService={singleServiceDetail} />
          <ServiceDetails
            singleServiceLoading={singleServiceLoading}
            matchService={singleServiceDetail}
          />

        </Box>
      )}
    </>
  );
};

export default SingleService;
