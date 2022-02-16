import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../../images/banner-1.jpg';
import banner2 from '../../images/banner-2.jpg';
import banner3 from '../../images/banner-3.jpg';
import Slider from 'react-slick';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom'
import ScrollTop from '../../SharedRoute/ScrollTop/ScrollTop';
import Contact from '../Contact/Contact';

const Header = (props) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <header >
            <Slider {...settings} style={{ zIndex: '-1' }}>

                <article type="button">
                    <img type="button" src={banner1} alt="" />
                </article>

                <article>
                    <img type="button" src={banner2} alt="" />
                </article>

                <article >
                    <img type="button" src={banner3} alt="" />
                </article>

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