import React, { useState, useEffect } from 'react';
import { Box, Container, Skeleton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import TrendingService from './TrendingService';
import { Link } from 'react-router-dom';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomSlider from '../../SharedRoute/CustomSlider/CustomSlider';

const TrendingServices = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get('https://dry-sea-00611.herokuapp.com/services').then(res => {
            setLoading(false);
            setServices(res.data.reverse())
        })
    }, []);

    return (
        <Container sx={{ mb: 8 }}  >

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
                    : <CustomSlider data={services} component={TrendingService}></CustomSlider>

            }

        </Container>
    );
};

export default TrendingServices;