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
  const [serviceData, setServiceData] = useState({ serviceTItle: "" });

  const [serviceDetailsInput, setServiceDetailsInput] = useState([
    { mainOption: 1, keyOption: 1 },
  ]);
  console.log(serviceDetailsInput[0].keyOption);

  const handleChange = (e) => {
    console.log(e.target.name);
  };

  const handleAddMoreDetails = (index) => {
    console.log("add more details clicked", index);
  };

  const handleAddServiceField = () => {
    console.log("clicked");
    setServiceDetailsInput([
      ...serviceDetailsInput,
      { mainOption: 1, keyOption: 1 },
    ]);
  };

  useEffect(() => {});
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
