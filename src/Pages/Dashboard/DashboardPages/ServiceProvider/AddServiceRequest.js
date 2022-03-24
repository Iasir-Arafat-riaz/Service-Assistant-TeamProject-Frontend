import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import withReactContent from 'sweetalert2-react-content'

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Typography, TextField, Grid, Divider, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ServiceDetailsForm from "./compoent/ServiceDetailsForm";
import { allData } from "../../../../redux/dataSlice/dataSlice";
import ServiceTitleForm from "./compoent/ServiceTitleForm";
import MakeServiceRequestStepper from "./MakeServiceRequest";

// initial state object
const subButton = {
  backgroundColor: "#FF5E14",
  // width: "90%",
  margin: "15px 0 25px 0",
  color: "#fff",
  letterSpacing: "2px",
};

const steps = ["Add Service Title", "Create Services", "Submit"];
const initialTopServiceData = {
  serviceName: "",
  serviceFeature: "",
  whatIncluded: "",
  serviceImage: null,
};

const initialService = {
  optionId: 0,
  Title: "",
  Image: "",
  Key: [
    {
      optionKeyId: 1,
      Name: "",
      Price: "",
      Quantity: "",
    },
  ],
};

// const MySwal = withReactContent(Swal)

// component
const AddServiceRequest = () => {
  const { user } = useSelector(allData);
  const [serviceData, setServiceData] = useState({ ...initialTopServiceData });
  const [serviceOptions, setServiceOptions] = useState([{ ...initialService }]);
  const [formLoading, setFormLoading] = useState(false);

  // stepper state and function
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // end of stepper handler functions and state

  // handlers functions
  const handleServiceChange = (e, index) => {
    const newServiceOptions = serviceOptions.map((item) => {
      if (item.optionId === index) {
        if (e.target.name === "Image") {
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
    } else {
      setServiceData({ ...serviceData, [e.target.name]: e.target.value });
    }
  };

  const handleServiceOptons = (e, position, id) => {
    const newServiceOptions = serviceOptions.map((item) => {
      if (item.optionId === position) {
        item.Key = item.Key.map((ele) => {
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
        const len = item.Key.length + 1;
        const obj = {
          optionKeyId: len,
          Name: "",
          Price: "",
          Quantity: "",
        };
        item.Key.push(obj);
      }
      return item;
    });
    setServiceOptions(newServiceArr);
  };

  const handleAddServiceField = () => {
    const len = serviceOptions.length;
    setServiceOptions([
      ...serviceOptions,
      {
        optionId: len,
        Title: "",
        Image: "",
        Key: [
          {
            optionKeyId: 1,
            Name: "",
            Price: "",
            Quantity: "",
          },
        ],
      },
    ]);
  };

  // submit form handler function
  const handleSubmit = (e) => {
    // set loading true
    setFormLoading(true);
    const feature = serviceData.serviceFeature.split("\n");
    const included = serviceData.whatIncluded.split("\n");
    const serviceRequest = {
      parentService: "",
      serviceImage: serviceData.serviceImage,
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
      serviceProvider: [user.uid],
      allServices: serviceOptions.map((item) => {
        const name = item.Image.name;
        item = { ...item, Image: name };
        return item;
      }),
    };

    // bundling all images
    const images = serviceOptions.map((item) => item.Image);
    images.push(serviceData.serviceImage);
    let formData = new FormData();

    Array.from(images).forEach((item) => {
      formData.append("images", item);
    });

    formData.append("parentService", serviceRequest.parentService);
    formData.append("Img", serviceData.serviceImage.name);
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

    // make service request API endpoint
    const url =
      "https://dry-sea-00611.herokuapp.com/api/v1/add-service-request";

    // sending HTTP request to the server
    axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((data) => {
        if (data.status === 201) {
          // do something in the UI
          setServiceData({ ...initialTopServiceData });
          setServiceOptions({ ...initialService });
          setFormLoading(false);
          Swal.fire({
            title: "Congratulations",
            text: "Added New Service Request Complete",
            icon: "success",
            timer: 1500,
          });
          console.log("service request added to DB");
          handleNext();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 1500,
        });
        console.log("error sagar", err);
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  useEffect(() => {
    //console.log(serviceOptions);
  });
  return (
    // <>
    //   <Typography variant="h4" component="div" gutterBottom>
    //     Add Service Request
    //   </Typography>
    //   <MakeServiceRequestStepper
    //     activeStep={activeStep}
    //     handleNext={handleNext}
    //     handleBack={handleBack}
    //     handleReset={handleReset}
    //   />
    //   <form encType="multipart/form-data">
    //     <Grid container spacing={3}>
    //       <ServiceTitleForm handleChange={handleChange} />
    //       <Divider />
    //       <Grid item>
    //         {/* <Typography variant="subtitle1" gutterBottom component="div">
    //           Service Details
    //         </Typography> */}
    //         {serviceOptions.map((item, index) => {
    //           return (
    //             <ServiceDetailsForm
    //               key={index}
    //               handleAddMoreDetails={handleAddMoreDetails}
    //               totalRow={item.Key.length}
    //               pos={item.optionId}
    //               serviceOption={item}
    //               handleServiceOptons={handleServiceOptons}
    //               handleServiceChange={handleServiceChange}
    //             />
    //           );
    //         })}
    //       </Grid>
    //       <Box
    //         sx={{ display: "flex", justifyContent: "center", width: "100%" }}
    //       >
    //         <Button
    //           variant="outlined"
    //           sx={{ marginTop: "15px", marginLeft: "10px" }}
    //           onClick={handleAddServiceField}
    //         >
    //           Add More Service
    //         </Button>
    //       </Box>
    //     </Grid>
    //     <Button
    //       variant="outlined"
    //       sx={{ marginTop: "15px", marginLeft: "10px" }}
    //       onClick={handleSubmit}
    //     >
    //       Submit form
    //     </Button>
    //   </form>
    // </>
    <>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} sx={{ marginBottom: "30px" }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <>
                <Typography
                  sx={{ mt: 2, mb: 1 }}
                  variant="h4"
                  data-testid="service-Title"
                >
                  Service Title
                </Typography>

                <form encType="multipart/form-data">
                  <Grid container spacing={3}>
                    <ServiceTitleForm handleChange={handleChange} />
                  </Grid>
                </form>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Typography sx={{ mt: 2, mb: 1 }} variant="h4">
                  Service Options Details
                </Typography>
                {serviceOptions.map((item, index) => {
                  return (
                    <ServiceDetailsForm
                      key={index}
                      handleAddMoreDetails={handleAddMoreDetails}
                      totalRow={item.Key.length}
                      pos={item.optionId}
                      serviceOption={item}
                      handleServiceOptons={handleServiceOptons}
                      handleServiceChange={handleServiceChange}
                    />
                  );
                })}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{ marginTop: "15px", marginLeft: "10px" }}
                    onClick={handleAddServiceField}
                    style={{ borderColor: "#FF5E14", color: "#000" }}
                  >
                    Add More Service
                  </Button>
                </Box>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ marginTop: "15px", marginLeft: "10px" }}
                    onClick={handleSubmit}
                    style={subButton}
                  >
                    Submit form
                  </Button>
                </Box>
              </>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
};

export default AddServiceRequest;
