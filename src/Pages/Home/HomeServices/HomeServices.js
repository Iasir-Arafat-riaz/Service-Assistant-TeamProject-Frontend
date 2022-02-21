import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import HomeService from './HomeService';
import Slider from 'react-slick';
import { Box } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { allData, singleService, loadServiceCategory } from "../../../redux/dataSlice/dataSlice";
import { useSelector, useDispatch } from "react-redux";

const HomeServices = () => {

    const dispatch = useDispatch();
    const { allServices, serviceIsLoading } = useSelector(allData);

    useEffect(() => {
        dispatch(loadServiceCategory());
    }, [dispatch]);


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

            {
                serviceIsLoading ?
                    <Skeleton animation="wave" variant="rectangular" width={'50%'} sx={{ mb: 2 }} height={30} />
                    :
                    <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>For Your Home</Typography>
                        <Link to="/services" style={{ fontSize: 17 }}>View All</Link>
                    </Box>}

            {
                serviceIsLoading ?
                    <Box sx={{ display: 'flex', gap: 5 }}>

                        {[...new Array(4)].map(() => <Stack spacing={1} >
                            <Skeleton variant="rectangular" width={250} sx={{ borderRadius: 2 }} height={185} />
                        </Stack>
                        )}

                    </Box>
                    :
                    <Slider {...slickSlider}>
                        {
                            allServices.slice(0, 8).map(service => <HomeService
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