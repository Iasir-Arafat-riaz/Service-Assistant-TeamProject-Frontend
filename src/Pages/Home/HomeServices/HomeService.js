import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const HomeService = ({ service }) => {

    const { Category, Img } = service;

    return (

        <Box sx={{ width: 300, p: 0, borderRadius: 3, mb: 1 }}>

            <Paper elevation={2} sx={{ backgroundImage: `url(${Img})`, height: 200, backgroundSize: 'cover', borderRadius: 3 }}>
            </Paper>

            <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', mt: 1 }}>{Category}</Typography>

        </Box>
    );
};

export default HomeService;