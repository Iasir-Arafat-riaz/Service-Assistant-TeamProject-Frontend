import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const TrendingService = ({ service }) => {

    const { Category, Img } = service;

    return (
        <Box sx={{ width: 250, p: 0, borderRadius: 3, mb: 1, m: '0 auto' }}>

            <Paper elevation={2} sx={{ backgroundImage: `url(${Img})`, height: 185, backgroundSize: 'cover', borderRadius: 3 }}>
            </Paper>

            <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', mt: 1 }}>{Category}</Typography>

        </Box>
    );
};

export default TrendingService;