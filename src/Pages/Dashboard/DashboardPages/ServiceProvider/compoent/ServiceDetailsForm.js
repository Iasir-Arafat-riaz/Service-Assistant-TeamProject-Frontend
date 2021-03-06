import React from "react";
import { Typography, TextField, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import ServiceOptionsRow from "./ServiceOptionsRow";

const subButton = {
  backgroundColor: "#FF5E14",
  // width: "90%",
  margin: "15px 0 25px 0",
  color: "#fff",
  letterSpacing: "2px",
};

const ServiceDetailsForm = ({
  handleAddMoreDetails,
  totalRow,
  pos,
  serviceOption,
  handleServiceOptons,
  handleServiceChange,
}) => {
  // const optionRow = Array.from({ length: totalRow }, (v, i) => i);
  const optionRow = serviceOption.Key;
  //
  return (
    <Grid container spacing={2}>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ marginTop: "30px", paddingLeft: "10px" }}
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
            name="Title"
            onChange={(e) => handleServiceChange(e, pos)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="serviceOptionImage"
            label="Service Option Image"
            variant="standard"
            fullWidth
            type="file"
            name="Image"
            onChange={(e) => handleServiceChange(e, pos)}
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
          pos={pos}
        />
      ))}
      <Button
        variant="outlined"
        sx={{ marginTop: "15px", marginLeft: "10px", marginBottom: "20px" }}
        onClick={() => handleAddMoreDetails(pos)}
        color='warning'
      >
        Add More Service Details
      </Button>
      {/* 2nd options for name quantiry price */}
    </Grid>
  );
};

export default ServiceDetailsForm;
