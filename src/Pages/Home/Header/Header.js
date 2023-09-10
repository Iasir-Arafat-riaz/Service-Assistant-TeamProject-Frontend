import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "../../SharedRoute/ScrollTop/ScrollTop";
import Contact from "../Contact/Contact";
import { Box, Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import "swiper/css/navigation";
import { Autoplay } from "swiper";
import HeaderSlide from "./HeaderSlide";
const Header = (props) => {
  const [banners, setBanner] = useState([]);
  useEffect(() => {
    fetch("https://service-assistant.adaptable.app/headerBanners")
      .then((res) => res.json())
      .then((data) => setBanner(data));
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
        {banners.map((banner) => (
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
