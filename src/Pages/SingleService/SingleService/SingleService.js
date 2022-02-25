import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../SingleService.css";
import { useParams } from "react-router-dom";
import SingleServiceHeader from "../SingleServiceHeader/SingleServiceHeader";
import ServiceDetails from "../ServiceDetails/ServiceDetails";

import Loading from "../../SharedRoute/Loader/Loading";

import Navigation from "../../SharedRoute/Navigation/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { singleService, allData } from '../../../redux/dataSlice/dataSlice';

const SingleService = () => {

  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const { singleServiceDetails, singleServiceLoading } = useSelector(allData);

  useEffect(() => {
    dispatch(singleService());
  }, [dispatch])


  if (singleServiceLoading) {
    return <Loading />;
  }

  const matchService = singleServiceDetails.find(
    (service) => service.parentService == serviceId
  );
  const question1 = Object.keys(matchService?.overview[0]);
  const question2 = Object.keys(matchService?.overview[1]);
  const question3 = Object.keys(matchService?.overview[2]);

  return (
    <>
      <Navigation />
      {singleServiceLoading ? (
        <Loading />
      ) : (
        <Box>
          <Navigation />
          <SingleServiceHeader matchService={matchService} />
          <ServiceDetails
            question1={question1}
            question2={question2}
            question3={question3}
            matchService={matchService}
          />
        </Box>
      )}
    </>
  );
};

export default SingleService;
