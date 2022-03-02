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

const SingleService = () => {


  const { serviceId } = useParams();

  setItemInLocal(serviceId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(singleService());
  }, [dispatch])


  const { singleServiceDetails, singleServiceLoading } = useSelector(allData)

  if (singleServiceLoading) {
    return <Loading />;
  }

  const matchService = singleServiceDetails?.find(
    (service) => parseInt(service.parentService) === parseInt(serviceId)
  );

  // console.log(matchService)

  const question1 = Object?.keys(matchService?.overview[0]);
  const question2 = Object?.keys(matchService?.overview[1]);
  // const question3 = Object?.keys(matchService?.overview[2]);

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
            singleServiceLoading={singleServiceLoading}
            question1={question1}
            question2={question2}
            matchService={matchService}
          />
        </Box>
      )}
    </>
  );
};

export default SingleService;
