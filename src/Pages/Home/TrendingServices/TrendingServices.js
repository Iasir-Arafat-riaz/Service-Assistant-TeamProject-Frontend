import React, { useState, useEffect } from 'react';
import { Box, Container, Skeleton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import TrendingService from './TrendingService';
import { Link } from 'react-router-dom';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomSlider from '../../SharedRoute/CustomSlider/CustomSlider';
import { useDispatch, useSelector } from 'react-redux';
import { allData, loadServiceCategory } from '../../../redux/dataSlice/dataSlice';
import Services from '../../Services/Services';

const TrendingServices = () => {



    const { allServices, serviceIsLoading } = useSelector(allData);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(loadServiceCategory());
    }, [dispatch]);


    return (
        <Container sx={{ mb: 8 }}  >

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
                    : <CustomSlider data={allServices} component={TrendingService}></CustomSlider>

            }

        </Container>
    );
};

export default TrendingServices;