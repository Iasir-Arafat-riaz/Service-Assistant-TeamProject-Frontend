import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeService = ({ service }) => {

    const { Category, Img } = service;
    const { Id } = service.Services[0];

    const navigate = useNavigate();

    const handleRouteChange = () => {
        navigate(`/Home/service-details/${Id}`)
    };
    //console.log(service.Services[0])

    return (

        <Box onClick={handleRouteChange} sx={{ width: 250, p: 0, borderRadius: 3, mb: 1, m: '0 auto' }}>

            <Paper elevation={2} sx={{ backgroundImage: `url(${Img})`, height: 185, backgroundSize: 'cover', borderRadius: 3 }}>
            </Paper>

            <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', mt: 1 }}>{Category}</Typography>

        </Box>
    );
};

export default HomeService;