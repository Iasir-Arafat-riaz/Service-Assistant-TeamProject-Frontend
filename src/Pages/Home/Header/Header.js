import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../images/banner-1.jpg";
import banner2 from "../../images/banner-2.jpg";
import banner3 from "../../images/banner-3.jpg";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "../../SharedRoute/ScrollTop/ScrollTop";
import Contact from "../Contact/Contact";
import { Box, Container, Typography } from "@mui/material";
import "./Header.css";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import "swiper/css/navigation";
import { Autoplay } from "swiper";
const Header = (props) => {
  const [banners, setBanner] = useState([]);
  useEffect(() => {
    fetch("https://dry-sea-00611.herokuapp.com/headerBanners")
      .then((res) => res.json())
      .then((data) => setBanner(data));
  }, []);
  console.log(banners);
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
          <SwiperSlide>
            <Box
              sx={{
                backgroundImage: `url(${banner.imageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "calc(100vh)",
              }}
              key={banner._id}
              type="button"
            >
              {/* <img type="button" src={banner.imageUrl} alt="" /> */}
              <Container
                maxWidth="md"
                sx={{ height: "100%", display: "flex", alignItems: "center" }}
              >
                <Box>
                  <Typography id="commonBannerText">
                    <Typography variant="h6">
                      Service Deliver with professionalism
                    </Typography>
                  </Typography>
                  <Typography class="text1" variant="h4">
                    <b>{banner.bannerText}</b>
                  </Typography>
                  <Typography class="text1" variant="h4">
                    <b>{banner.bannerTex2}</b>
                  </Typography>
                </Box>
              </Container>
            </Box>
          </SwiperSlide>
        ))}

        {/* <article type="button">
                    <img type="button" src={banner1} alt="" />
                </article>

                <article>
                    <img type="button" src={banner2} alt="" />
                </article>

                <article >
                    <img type="button" src={banner3} alt="" />
                </article> */}
      </Swiper>
      <Contact />

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </header>
  );
};

export default Header;
