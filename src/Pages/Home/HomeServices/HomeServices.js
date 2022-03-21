import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import CommonService from './CommonService';

import { Box } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import CustomSlider from '../../SharedRoute/CustomSlider/CustomSlider';

const HomeServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/for-your-home')
            .then(res => {
                setServices(res.data);
                console.log(res.data, 'dkjfdkljflkfjadlkfjdsalkfjasdlkfjdslk;fjsadlk;fjsdalkfjlkjsdlkfjsdkl;fjdskl;j');
                setLoading(false)
            })
    }, []);
    console.log(services);


    return (
        <Container sx={{ mb: 8 }}>

            {
                loading ?
                    <Skeleton animation="wave" variant="rectangular" width={'50%'} sx={{ mb: 2 }} height={30} />
                    :
                    <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>For Your Home</Typography>
                        <Link to="/services" style={{ fontSize: 17 }}>View All</Link>
                    </Box>}

            {
                loading ?
                    <Box sx={{ display: 'flex', gap: 5 }}>

                        {[...new Array(4)].map((ske, index) => <Stack key={index} spacing={1} >
                            <Skeleton variant="rectangular" width={250} sx={{ borderRadius: 2 }} height={185} />
                        </Stack>
                        )}

                    </Box>
                    :
                    <CustomSlider data={services} component={CommonService}></CustomSlider>
            }

        </Container>
    );
};

export default HomeServices;