import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import HomeService from './HomeService';
import Slider from 'react-slick';
import { Box } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const HomeServices = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // data loaded
    useEffect(() => {
        axios.get('https://fierce-meadow-12011.herokuapp.com/services').then(res => {
            setLoading(false);
            setServices(res.data);
        })
    }, []);

    // slick slider
    const slickSlider = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
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

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>For Your Home</Typography>

            {
                loading ?
                    <Box sx={{ display: 'flex', gap: 5 }}>

                        {[...new Array(4)].map(() => <Stack spacing={1} >
                            <Skeleton variant="rectangular" width={250} sx={{ borderRadius: 2 }} height={185} />
                        </Stack>
                        )}

                    </Box>
                    :
                    <Slider {...slickSlider}>
                        {
                            services.map(service => <HomeService
                                key={service._id}
                                service={service}
                            />)
                        }
                    </Slider>
            }

        </Container>
    );
};

export default HomeServices;