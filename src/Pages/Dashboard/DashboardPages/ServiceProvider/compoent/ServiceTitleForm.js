import React from "react";
import { TextField, Grid } from "@mui/material";

const ServiceTitleForm = ({ handleChange }) => {
  return (
    <Grid item container spacing={3}>
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
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* <input type="file" name="serviceImage" onChange={handleChange} ref= {imgRef}/> */}
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
    </Grid>
  );
};

export default ServiceTitleForm;
