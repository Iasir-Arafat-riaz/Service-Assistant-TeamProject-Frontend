import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "../../SharedRoute/ScrollTop/ScrollTop";
import Contact from "../Contact/Contact";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import "swiper/css/navigation";
import { Autoplay } from "swiper";
import HeaderSlide from "./HeaderSlide";
import axios from "axios";
const Header = (props) => {
  const [banners, setBanner] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  useEffect(async() => {
    setIsLoading(true)
    const res =await axios.get('https://service-assistant-a2z-backend-production.up.railway.app/headerBanners')
    setBanner(res.data)
    setIsLoading(false)
    // fetch("https://service-assistant-a2z-backend-production.up.railway.app/headerBanners")
    //   .then((res) => res.json())
    //   .then((data) => setBanner(data));
  }, []);


  return (
    <header>
      <Swiper
        modules={[Autoplay]}
        speed={1000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        style={{ zIndex: "-1" }}>

{
isLoading && <Box>
          <Skeleton variant="rectangular" width={window.innerWidth} height={window.innerHeight} />
          </Box>
}
        {!isLoading && banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <HeaderSlide banner={banner}></HeaderSlide>
          </SwiperSlide>
        ))}

      </Swiper>
      <Contact />

      <ScrollTop {...props}>
        <Fab style={{ color: "white", background: "#FF5E14" }} size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </header>
  );
};

export default Header;
