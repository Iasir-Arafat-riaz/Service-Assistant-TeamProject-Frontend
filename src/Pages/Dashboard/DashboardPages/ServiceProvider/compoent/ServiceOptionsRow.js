import React from "react";
import { Typography, Box, TextField, Grid, Input } from "@mui/material";

const subButton = {
  backgroundColor: "#FF5E14",
  width: "90%",
  margin: "15px 0 25px 0",
  color: "#fff",
  letterSpacing: "2px",
};

const ServiceOptionsRow = ({
  serviceOptionsName,
  serviceOptionsPrice,
  serviceOptionsQuantity,
  handleServiceOptons,
  optionKeyId,
  pos,
}) => {
  //
  return (
    <Grid item container spacing={2}>
      <Grid item xs={6} sm={6} md={4}>
        <TextField
          id="serviceOptionsName"
          label="Service Options Name"
          variant="standard"
          fullWidth
          name="Name"
          onChange={(e) => handleServiceOptons(e, pos, optionKeyId)}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4}>
        <TextField
          id="serviceOptionsPrice"
          label="Service Options Price"
          variant="standard"
          fullWidth
          name="Price"
          onChange={(e) => handleServiceOptons(e, pos, optionKeyId)}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={4}>
        <TextField
          id="service Options Quantity"
          label="Service Options Quantity"
          variant="standard"
          fullWidth
          name="Quantity"
          onChange={(e) => handleServiceOptons(e, pos, optionKeyId)}
        />
      </Grid>

      {/* 2nd row */}
    </Grid>
  );
};

export default ServiceOptionsRow;
