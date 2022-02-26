import React from "react";
import { Typography, Box, TextField, Grid, Input } from "@mui/material";
import Button from "@mui/material/Button";
import ServiceOptionsRow from "./ServiceOptionsRow";

const ServiceDetailsForm = ({
  handleAddMoreDetails,
  totalRow,
  pos,
  serviceOption,
  handleServiceOptons,
}) => {
  // const optionRow = Array.from({ length: totalRow }, (v, i) => i);
  const optionRow = serviceOption.serviceDetails;
  console.log(serviceOption);
  return (
    <Grid container spacing={2}>
      <Typography
        variant="subtitle2"
        component="div"
        gutterBottom
        sx={{ marginTop: "15px", paddingLeft: "10px" }}
      >
        {`Service ${pos + 1}`}
      </Typography>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="serviceOptionsTitle"
            label="Title"
            variant="standard"
            fullWidth
            name="serviceOptionTitle"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="serviceOptionImage"
            label="Service Option Image"
            variant="standard"
            fullWidth
            type="file"
            name="serviceOptionImage"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      {optionRow.map((item, index) => (
        <ServiceOptionsRow
          key={index}
          {...item}
          handleServiceOptons={handleServiceOptons}
        />
      ))}
      <Button
        variant="outlined"
        sx={{ marginTop: "15px", marginLeft: "10px", marginBottom: "20px" }}
        onClick={() => handleAddMoreDetails(pos)}
      >
        Add More Service Details
      </Button>
      {/* 2nd options for name quantiry price */}
    </Grid>
  );
};

export default ServiceDetailsForm;
