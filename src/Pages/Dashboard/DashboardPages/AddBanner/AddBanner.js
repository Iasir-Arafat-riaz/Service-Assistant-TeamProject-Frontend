import { CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddBannerSection from "./AddBannerSection/AddBannerSection";

const AddBanner = () => {
  // const [banners, setBanner] = useState([]);
  // const [load, setLoad] = useState(true);
  // useEffect(() => {
  //   setLoad(true);
  //   fetch("https://dry-sea-00611.herokuapp.com/headerBanners")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBanner(data);
  //       setLoad(false);
  //     });
  // }, []);
  // // //console.log(banners);
  // if (load) {
  //   return (
  //     <Stack justifyContent="center" alignItems="center">
  //       <CircularProgress></CircularProgress>
  //     </Stack>
  //   );
  // }
  return (
    <>
      {/* {banners.map((banner) => (
        <AddBannerSection key={banner._id} banner={banner} />
      ))} */}
      <AddBannerSection />
    </>
  );
};

export default AddBanner;
