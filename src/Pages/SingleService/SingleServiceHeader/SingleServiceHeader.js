import React from 'react';

import { Box } from '@mui/system';
import detailsBanner from '../../images/service-details-banner.png';
import '../SingleService.css';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const SingleServiceHeader = ({ matchService }) => {
    return (
        <>
            <Box sx={{ backgroundImage: `url(${detailsBanner})`, width: '100%', height: '50vh', mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundAttachment: 'fixed' }}>

                <Box>
                    <Typography variant='h3' sx={{ fontWeight: 'bold', color: '#fff' }}>{matchService?.Title}</Typography>

                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5, fontWeight: 500, color: "#fff" }}>
                        <Link to="/home" style={{ textDecoration: 'none', color: "#fff", }}>Home</Link>  - <small style={{ color: '#FF5E14' }}>{matchService?.Title}</small>
                    </span>
                </Box>


            </Box>
        </>
    );
};

export default SingleServiceHeader;