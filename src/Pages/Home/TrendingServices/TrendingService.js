import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import {useNavigate} from "react-router-dom"

const TrendingService = ({ service }) => {
    const navigate=useNavigate()
    
console.log(service)
    const { Category, Img,Services } = service;
    const id =Services[0].Id
    const hadleRouteChange=()=>{
        navigate(`/Home/service-details/${id}`)
    }

    return (
        <Box onClick={hadleRouteChange} sx={{ width: 250, p: 0, borderRadius: 3, mb: 1, m: '0 auto' }}>

            <Paper elevation={2} sx={{ backgroundImage: `url(${Img})`, height: 185, backgroundSize: 'cover', borderRadius: 3 }}>
            </Paper>

            <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', mt: 1 }}>{Category}</Typography>

        </Box>
    );
};

export default TrendingService;