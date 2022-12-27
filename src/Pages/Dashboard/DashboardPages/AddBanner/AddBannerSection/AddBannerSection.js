import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import PreviewHeader from "../../../../Home/Header/PreviewHeader";
import "./AddBanner.css";

const AddBannerSection = ({ banner }) => {
  const { register, handleSubmit, reset, watch } = useForm();

  const bannerInfo = {
    imageUrl: watch("imageUrl"),
    bannerText: watch("bannerText"),
    bannerTex2: watch("bannerTex2"),
    bannerNumber: watch("bannerNumber"),
  };

  //

  const onSubmit = (data) => {
    // data._id = banner._id;
    //
    // reset();
    axios.put("https://service-assistant-a2z-backend-production.up.railway.app/headerBanners", data).then((response) => {
      if (response.status == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Banner has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        reset()
      }
    });

  };

  const [banners, setBanner] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(true);
    fetch("https://service-assistant-a2z-backend-production.up.railway.app/headerBanners")
      .then((res) => res.json())
      .then((data) => {
        setBanner(data);
        setLoad(false);
      });
  }, []);
  // //
  if (load) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress></CircularProgress>
      </Stack>
    );
  }

  return (
    <Box>

      <Grid sx={{ boxShadow: 2, p: 2, mb: 5 }} container spacing={2} alignItems="center" justifyContent="center">

        <Grid item xs={12} md={6}>
          <PreviewHeader bannerInfo={bannerInfo} banner={banners[0]} />
        </Grid>

        <Grid item xs={12} md={6}>

          <Box>

            <form onSubmit={handleSubmit(onSubmit)}>

              <Stack direction="column">

                <TextField
                  required
                  type="text"
                  sx={{ mb: 3 }}
                  {...register("imageUrl")}
                  label="Enter image url"
                  variant="outlined"
                />

                <TextField
                  required
                  type="text"
                  sx={{ mb: 3 }}
                  {...register("bannerText")}
                  label="Write Banner text"
                  variant="outlined"
                />
                <TextField
                  required
                  type="text"
                  sx={{ mb: 3 }}
                  {...register("bannerTex2")}
                  label="Write Banner text-2"
                  variant="outlined"
                />


                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Banner number</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="formOption"
                    {...register("bannerNumber")}
                    label="Age"
                    required
                  >
                    <MenuItem value="One">Update First Banner</MenuItem>
                    <MenuItem value="Two">Update Second Banner</MenuItem>
                    <MenuItem value="Three">Update Third Banner</MenuItem>
                  </Select>
                </FormControl>
                {/* 
                <select style={{ padding: 15, width: '100%' }} id="formOption" {...register("bannerNumber")}>
                  <option value="One">Update First Banner</option>
                  <option value="Two">Update Second Banner</option>
                  <option value="Three">Update Third Banner</option>
                </select> */}
                <Button sx={{ borderRadius: 0, p: 1, mt: 3 }} type="submit" variant="contained">
                  Add Banner
                </Button>
              </Stack>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddBannerSection;
