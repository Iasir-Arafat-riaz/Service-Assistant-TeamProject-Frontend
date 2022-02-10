import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import Slider from 'react-slick';
import TrendingService from './TrendingService';

const TrendingServices = () => {

    const [services, setServices] = useState([]);
    useEffect(() => {
        axios.get('https://fierce-meadow-12011.herokuapp.com/services?fbclid=IwAR2PzgLNP3sRD7R7Iww81DDyDNKtutUIHJbSQIVPwzj4G5jQVDoan3aZf5E').then(res => setServices(res.data))
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Container sx={{ mb: 8 }}>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Trending</Typography>

            <Slider {...settings}>
                {
                    services.map(service => <TrendingService
                        key={service._id}
                        service={service}
                    />)
                }
            </Slider>

        </Container>
    );
};

export default TrendingServices;