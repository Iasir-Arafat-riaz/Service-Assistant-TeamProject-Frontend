import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../images/banner-1.jpg";
import banner2 from "../../images/banner-2.jpg";
import banner3 from "../../images/banner-3.jpg";
import Slider from "react-slick";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "../../SharedRoute/ScrollTop/ScrollTop";
import Contact from "../Contact/Contact";
import { Box, Container, Typography } from "@mui/material";
import "./Header.css";

const Header = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [banners, setBanner] = useState([]);
  useEffect(() => {
    fetch("https://dry-sea-00611.herokuapp.com/headerBanners")
      .then((res) => res.json())
      .then((data) => setBanner(data));
  }, []);
  console.log(banners);
  return (
    <header>
      <Slider {...settings} style={{ zIndex: "-1" }}>
        {banners.map((banner) => (
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
              sx={{ height:"100%",display: "flex",  alignItems:"center" }}
            >
              <Box>
                <Typography id="commonBannerText">
                  <b>Service Deliver with professionalism</b>
                </Typography>
                <Typography variant="h4">
                  <b>{banner.bannerText}</b>
                </Typography>
                <Typography variant="h4">
                  <b>{banner.bannerTex2}</b>
                </Typography>
              </Box>
            </Container>
          </Box>
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
      </Slider>
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
