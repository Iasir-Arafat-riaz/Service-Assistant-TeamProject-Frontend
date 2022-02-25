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

const AddServiceRequest = () => {
  const [serviceData, setServiceData] = useState({
    serviceTItle: "",
    serviceFeature: "",
    whatIncluded: "",
  });

  const [serviceOptions, setServiceOptions] = useState([
    {
      optionId: 0,
      serviceOptionTitle: "",
      serviceOptionImage: "",
      key: [
        {
          optionKeyId: 1,
          serviceOptionsName: "",
          serviceOptionsPrice: "",
          serviceOptionsQuantity: "",
        },
      ],
    },
  ]);

  const [serviceDetailsInput, setServiceDetailsInput] = useState([
    { mainOption: 0, keyOption: 1 },
  ]);

  const handleChange = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleAddMoreDetails = (index) => {
    console.log("add more details clicked", index);
    const newArrInput = serviceDetailsInput.map((item) => {
      if (item.mainOption === index) {
        item.keyOption = item.keyOption + 1;
      }
      return item;
    });

    const newServiceArr = serviceOptions.map((item) => {
      if (item.optionId === index) {
        const len = item.key.length + 1;
        const obj = {
          optionKeyId: len,
          serviceOptionsName: "",
          serviceOptionsPrice: "",
          serviceOptionsQuantity: "",
        };
        item.key.push(obj);
      }
    });

    console.log(newServiceArr);
    setServiceDetailsInput(newArrInput);
  };

  const handleAddServiceField = () => {
    console.log("clicked");
    const len = serviceDetailsInput.length;
    const len2 = serviceOptions.length;
    setServiceOptions([
      ...serviceOptions,
      {
        optionId: len2,
        serviceOptionTitle: "",
        serviceOptionImage: "",
        key: [
          {
            optionKeyId: 1,
            serviceOptionsName: "",
            serviceOptionsPrice: "",
            serviceOptionsQuantity: "",
          },
        ],
      },
    ]);
    setServiceDetailsInput([
      ...serviceDetailsInput,
      { mainOption: len, keyOption: 1 },
    ]);
  };

  useEffect(() => {
    console.log(serviceOptions);
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
            {serviceDetailsInput.map((item, index) => {
              console.log(item.keyOption);

              return (
                <ServiceDetailsForm
                  key={index}
                  handleAddMoreDetails={handleAddMoreDetails}
                  totalRow={item.keyOption}
                  pos={index}
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
      </form>
    </>
  );
};

export default AddServiceRequest;
