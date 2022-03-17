import React, { useState, useEffect } from 'react';
import { Box, Container, Skeleton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import useSlick from '../../../Hooks/useSlick';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { allData, loadServiceCategory } from '../../../redux/dataSlice/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import CommonService from '../HomeServices/CommonService';

const TrendingServices = () => {

    const { allServices, serviceIsLoading } = useSelector(allData);
    const dispatch = useDispatch();

    useEffect(() => {
<<<<<<< HEAD
        axios.get('https://dry-sea-00611.herokuapp.com/services').then(res => {
            setLoading(false);
            setServices(res.data.reverse())
        })
    }, []);
=======
        dispatch(loadServiceCategory());
    }, [dispatch]);

>>>>>>> remotes/origin/mahfujStore

    // const { slickSlider } = useSlick();
    // slick slider
    const slickSlider = {
        dots: false,
        infinite: false,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
<<<<<<< HEAD
console.log(services)
// const servicesReverse = services.reverse()
=======

    const trendServices = [...allServices].reverse();
>>>>>>> remotes/origin/mahfujStore

    return (
        <Container sx={{ mb: 8 }}>

            {
                serviceIsLoading ?
                    <Skeleton animation="wave" variant="rectangular" width={'50%'} sx={{ mb: 2 }} height={30} />
                    :
                    <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Trending</Typography>
                        <Link to="/services" style={{ fontSize: 17 }}>View All</Link>
                    </Box>
            }


            {
                serviceIsLoading ?
                    <Box sx={{ display: 'flex', gap: 5 }}>

                        {[...new Array(4)].map((ske, index) => <Stack key={index} spacing={1} >
                            <Skeleton variant="rectangular" width={250} sx={{ borderRadius: 2 }} height={185} />
                        </Stack>
                        )}

                    </Box>
                    : <Slider {...slickSlider}>
                        {
<<<<<<< HEAD
                            services?.map(service => <TrendingService sx={{}}
=======
                            trendServices.map(service => <CommonService
>>>>>>> remotes/origin/mahfujStore
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