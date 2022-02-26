import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Skeleton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import Slider from 'react-slick';
import TrendingService from './TrendingService';
import { Link } from 'react-router-dom';

const TrendingServices = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://fierce-meadow-12011.herokuapp.com/services').then(res => {
            setLoading(false);
            setServices(res.data);
        })
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 3,
        // autoplay: true,
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

            {
                loading ?
                    <Skeleton animation="wave" variant="rectangular" width={'50%'} sx={{ mb: 2 }} height={30} />
                    :
                    <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Trending</Typography>
                        <Link to="/services" style={{ fontSize: 17 }}>View All</Link>
                    </Box>
            }


            {
                loading ?
                    <Box sx={{ display: 'flex', gap: 5 }}>

                        {[...new Array(4)].map((ske, index) => <Stack key={index} spacing={1} >
                            <Skeleton variant="rectangular" width={250} sx={{ borderRadius: 2 }} height={185} />
                        </Stack>
                        )}

                    </Box>
                    : <Slider {...settings}>
                        {
                            services.map(service => <TrendingService
                                key={service._id}
                                service={service}
                            />)
                        }
                    </Slider>

            }

        </Container>
    );
};

export default TrendingServices;