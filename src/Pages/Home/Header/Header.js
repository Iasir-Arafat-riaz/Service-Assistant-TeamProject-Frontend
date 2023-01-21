import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "../../SharedRoute/ScrollTop/ScrollTop";
import Contact from "../Contact/Contact";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from 'react-query';
import 'swiper/css';
import "swiper/css/navigation";
import { Autoplay } from "swiper";
import HeaderSlide from "./HeaderSlide";
import axios from "axios";

const Header = (props) => {

  const [imageLoading,setImageLoading] = useState(false)

const getBanners = async() => {
  const {data} =await axios.get('https://service-assistant-a2z-backend-production.up.railway.app/headerBanners')
  return data
}

const { data,isLoading } = useQuery('headerBanners', getBanners);

const handleImageLoaded = () => {
  setImageLoading(false)
}

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
        {!isLoading && data.map((banner) => (
          <SwiperSlide key={banner._id}>
            <HeaderSlide handleImageLoaded={handleImageLoaded} imageLoading={imageLoading} banner={banner}></HeaderSlide>
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
