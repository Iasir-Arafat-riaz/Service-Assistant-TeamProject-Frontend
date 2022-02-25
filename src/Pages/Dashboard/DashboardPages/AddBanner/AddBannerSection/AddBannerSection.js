import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import PreviewHeader from "../../../../Home/Header/PreviewHeader";
import "./AddBanner.css";

const AddBannerSection = ({ banner }) => {
  const { register, handleSubmit, reset, watch } = useForm();

  const bannerInfo = {
    imageUrl: watch("imageUrl"),
    bannerText: watch("bannerText"),
    bannerNumber: watch("bannerNumber"),
  };

  console.log(bannerInfo);

  const onSubmit = (data) => {
    data._id = banner._id;
    console.log(data);
    // reset();
    axios.put("https://fierce-meadow-12011.herokuapp.com/headerBanners", data).then((response) => {
      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Banner has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <PreviewHeader bannerInfo={bannerInfo} banner={banner} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="column" elevation={2}>
                <TextField
                  required
                  type="text"
                  sx={{ mb: 3 }}
                  {...register("imageUrl")}
                  label="Enter image url"
                  variant="standard"
                />
                <TextField
                  required
                  type="text"
                  sx={{ mb: 3 }}
                  {...register("bannerText")}
                  label="Write Banner text"
                  variant="standard"
                />
                <select id="formOption" {...register("bannerNumber")}>
                  <option value="One">Update First Banner</option>
                  <option value="Two">Update Second Banner</option>
                  <option value="Three">Update Third Banner</option>
                </select>
                <Button type="submit" variant="contained">
                  Add Banner
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddBannerSection;
