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
  import React, { useState } from "react";
  import { useForm } from "react-hook-form";
  import PreviewHeader from "../../../../Home/Header/PreviewHeader"
  import "./AddBanner.css";
  
  const AddBannerSection = () => {
     
    const {
      register,
      handleSubmit,
      reset,
      watch,
      
    } = useForm();
  
    const bannerInfo = 
      {
          imageUrl: watch("imageUrl"),
          bannerText: watch("bannerText"),
          quality: watch("quality"),
      }
   
   console.log(bannerInfo);
  
    const onSubmit = (data) => {
      console.log(data);
      // reset();
    };
  
  
    return (
      <Box>
         
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            
          <Grid item xs={12} md={6}>
          <PreviewHeader bannerInfo={bannerInfo}/>
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
                  <select id="formOption" {...register("quality")}>
                    <option value="High Quality Banner">HighQuality</option>
                    <option value="Low Quality Banner">LowQuality</option>
                    <option value="Normal Quality Banner">Normal</option>
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
  