import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setItemInLocal } from '../../../utils/utils';

const CommonService = ({ service, single }) => {

    const { Category, Img } = service;
    const { Id } = service;
    const navigate = useNavigate();

    const handleRouteChange = () => {
        Id && navigate(`/Home/service-details/${Id}`);
        setItemInLocal({
            ...service,
        });
    };
    //

    return (

        <Box onClick={handleRouteChange} sx={{ width: 250, p: 0, borderRadius: 3, mb: 1, m: single ? '0' : '0 auto', ml:5 }}>
            <Paper elevation={2} sx={{ backgroundImage: `url(${Img})`, height: 185, backgroundSize: 'cover', borderRadius: 3 }}>
            </Paper>

            <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', mt: 1 }}>{Category}</Typography>

        </Box>
    );
};

export default CommonService;