import React from 'react';

import { Box } from '@mui/system';
import detailsBanner from '../../images/service-details-banner.png';
import '../SingleService.css';
import { Link } from 'react-router-dom';
import { Button, Grid, Paper, Typography } from '@mui/material';

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

            <Grid sx={{ ml: 10, mt: -21 }} item xs={12} md={6} lg={3}>


                <Paper elevation={1} sx={{ p: 2, mb: 2, borderRadius: 0 }}>
                    <Typography sx={{ fontSize: 20, mb: 1, fontWeight: 'bold' }} variant="h6">Main feature</Typography>
                    {
                        matchService?.mainFeatures.map((text, index) => (
                            <Typography sx={{ fontSize: 16, mb: 1 }} variant="h6"><li>{text}</li></Typography>
                        ))
                    }
                </Paper>

                {/* <Button variant='outlined' style={{ width: '100%', borderColor: 'white', color: 'white', borderRadius: 0 }}>SAVE</Button> */}

            </Grid>

        </>
    );
};

export default SingleServiceHeader;