import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import RecentlyView from './RecentlyView';
import { Box } from '@mui/system';

const RecentlyViews = () => {

    const [services, setServices] = useState([]);
    useEffect(() => {
        axios.get('https://fierce-meadow-12011.herokuapp.com/services?fbclid=IwAR2PzgLNP3sRD7R7Iww81DDyDNKtutUIHJbSQIVPwzj4G5jQVDoan3aZf5E').then(res => setServices(res.data.slice(5, 7)))
    }, []);



    return (

        <Container sx={{ mb: 8 }}>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Recently View</Typography>

            <Box sx={{ display: 'flex', gap: 5 }}>
                {
                    services.map(service => <RecentlyView
                        key={service._id}
                        service={service}
                    />)
                }
            </Box>

        </Container>

    );
};

export default RecentlyViews;