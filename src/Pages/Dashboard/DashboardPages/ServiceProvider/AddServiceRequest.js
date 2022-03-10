import React, { useEffect, useState } from "react";

import {
  Typography,
  TextField,
  Grid,
  Input,
  Divider,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import ServiceDetailsForm from "./compoent/ServiceDetailsForm";

// component
const AddServiceRequest = () => {
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    serviceFeature: "",
    whatIncluded: "",
  });

  const [serviceOptions, setServiceOptions] = useState([
    {
      optionId: 0,
      serviceOptionTitle: "",
      serviceOptionImage: "",
      serviceDetails: [
        {
          optionKeyId: 1,
          serviceOptionsName: "",
          serviceOptionsPrice: "",
          serviceOptionsQuantity: "",
        },
      ],
    },
  ]);

  // handlers functions
  const handleServiceChange = (e, index) => {
    const newServiceOptions = serviceOptions.map((item) => {
      if (item.optionId === index) {
        if (item[e.target.name] === "serviceOptionImage") {
          item[e.target.name] = e.target.files[0];
        } else {
          item[e.target.name] = e.target.value;
        }
      }
      return item;
    });
    setServiceOptions(newServiceOptions);
  };

  const handleChange = (e) => {
    if (e.target.name === "serviceImage") {
      setServiceData({ ...serviceData, [e.target.name]: e.target.files[0] });
    }
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleServiceOptons = (e, position, id) => {
    const newServiceOptions = serviceOptions.map((item) => {
      if (item.optionId === position) {
        item.serviceDetails = item.serviceDetails.map((ele) => {
          if (ele.optionKeyId === id) {
            ele = { ...ele, [e.target.name]: e.target.value };
          }
          return ele;
        });
      }
      return item;
    });
    setServiceOptions(newServiceOptions);
  };

  const handleAddMoreDetails = (index) => {
    //console.log("add more details clicked", index);

    const newServiceArr = serviceOptions.map((item) => {
      if (item.optionId === index) {
        const len = item.serviceDetails.length + 1;
        const obj = {
          optionKeyId: len,
          serviceOptionsName: "",
          serviceOptionsPrice: "",
          serviceOptionsQuantity: "",
        };
        item.serviceDetails.push(obj);
      }
      return item;
    });
    setServiceOptions(newServiceArr);
  };

  const handleAddServiceField = () => {
    const len2 = serviceOptions.length;
    setServiceOptions([
      ...serviceOptions,
      {
        optionId: len2,
        serviceOptionTitle: "",
        serviceOptionImage: "",
        serviceDetails: [
          {
            optionKeyId: 1,
            serviceOptionsName: "",
            serviceOptionsPrice: "",
            serviceOptionsQuantity: "",
          },
        ],
      },
    ]);
  };
  // handle image input
  const handleImage = (e) => {};

  // submit form handler function
  const handleSubmit = (e) => {
    const feature = serviceData.serviceFeature.split("\n");
    const included = serviceData.whatIncluded.split("\n");
    const serviceRequest = {
      parentService: "",
      Title: serviceData.serviceName,
      Rating: 0,
      FQA: [],
      overview: [
        { "Service Features": feature },
        { "What's Excluded?": included },
      ],
      mainFeatures: [
        "7 Days Service Warranty",
        "24/7 Customer Support",
        `Trusted & Reliable ${serviceData.serviceName} Technicians`,
      ],
      Reviews: [],
      serviceProvider: [],
      allServices: serviceOptions,
    };

    let formData = new FormData();
    // for (i in serviceRequest) {
    //   formData.append(i, serviceData[i]); parentService, allServices,Title,Rating,FQA,overview,mainFeatures,Reviews,serviceProvider
    // }
    formData.append("parentService", serviceRequest.parentService);
    formData.append("Title", serviceRequest.Title);
    formData.append("Rating", serviceRequest.Rating);
    formData.append("FQA", JSON.stringify(serviceRequest.FQA));
    formData.append("overview", JSON.stringify(serviceRequest.overview));
    formData.append(
      "mainFeatures",
      JSON.stringify(serviceRequest.mainFeatures)
    );
    formData.append("Reviews", JSON.stringify(serviceRequest.Reviews));
    formData.append(
      "serviceProvider",
      JSON.stringify(serviceRequest.serviceProvider)
    );
    formData.append("allServices", JSON.stringify(serviceRequest.allServices));
    // formData ready to sent for saving
    const api="https://dry-sea-00611.herokuapp.com/servicerequest";

    fetch(api, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          //console.log(data);
          //console.log("Registration Successfull");
         
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    //console.log(serviceOptions);
  });
  return (
    <>
      <Typography variant="h4" component="div" gutterBottom>
        Add Service Request
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="serviceName"
              label="Service Title"
              variant="standard"
              fullWidth
              name="serviceName"
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="serviceImage"
              label="Service Image"
              variant="standard"
              fullWidth
              type="file"
              name="serviceImage"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="serviceFeature"
              label="Service Feature"
              multiline
              maxRows={8}
              variant="standard"
              name="serviceFeature"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="included"
              label="What's Included"
              multiline
              maxRows={8}
              variant="standard"
              name="whatIncluded"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Divider />
          <Grid item>
            {/* <Typography variant="subtitle1" gutterBottom component="div">
              Service Details
            </Typography> */}
            {serviceOptions.map((item, index) => {
              return (
                <ServiceDetailsForm
                  key={index}
                  handleAddMoreDetails={handleAddMoreDetails}
                  totalRow={item.serviceDetails.length}
                  pos={item.optionId}
                  serviceOption={item}
                  handleServiceOptons={handleServiceOptons}
                  handleServiceChange={handleServiceChange}
                />
              );
            })}
          </Grid>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button
              variant="outlined"
              sx={{ marginTop: "15px", marginLeft: "10px" }}
              onClick={handleAddServiceField}
            >
              Add More Service
            </Button>
          </Box>
        </Grid>
        <Button
          variant="outlined"
          sx={{ marginTop: "15px", marginLeft: "10px" }}
          onClick={handleSubmit}
        >
          Submit form
        </Button>
      </form>
    </>
  );
};

export default AddServiceRequest;
