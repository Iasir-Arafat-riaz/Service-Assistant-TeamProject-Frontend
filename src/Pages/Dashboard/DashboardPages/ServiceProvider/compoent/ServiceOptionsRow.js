import React from "react";
import { Typography, Box, TextField, Grid, Input } from "@mui/material";

const ServiceOptionsRow = ({
  serviceOptionsName,
  serviceOptionsPrice,
  serviceOptionsQuantity,
  handleServiceOptons,
}) => {
  return (
    <Grid item container spacing={2}>
      <Grid item xs={6} sm={6} md={4}>
        <TextField
          id="serviceOptionsName"
          label="Name"
          variant="standard"
          fullWidth
          name="serviceOptionsName"
          onChange={handleServiceOptons}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4}>
        <TextField
          id="serviceOptionsPrice"
          label="Price"
          variant="standard"
          fullWidth
          name="serviceOptionsPrice"
          onChange={handleServiceOptons}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4}>
        <TextField
          id="serviceOptionsQuantity"
          label="Quantity"
          variant="standard"
          fullWidth
          name="serviceOptionsQuantity"
          onChange={handleServiceOptons}
        />
      </Grid>

      {/* 2nd row */}
    </Grid>
  );
};

export default ServiceOptionsRow;
