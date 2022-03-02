import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ServiceCategory from '../ServiceCategory/ServiceCategory/ServiceCategory';
import AllServicesList from './AllServicesList';
import ServiceOverview from './ServiceOverview';

const ServiceDetails = ({ matchService, question1, question2, question3, singleServiceLoading }) => {

    if (singleServiceLoading) {
        return 'loading...'
    }

    // console.log(singleServiceLoading)
    return (

        <Box sx={{ p: 5 }}>

            <Typography variant='h5' sx={{ letterSpacing: 1, mb: 2 }} >Avilable services</Typography>

            <Box sx={{ display: 'flex', gap: 8, flexWrap: 'wrap', mb: 430 }}>


                {
                    matchService?.allServices?.map((service, index) => <Paper sx={{ width: 250, p: 2, borderRadius: 3 }} elevation={2}>

                        <Box sx={{ backgroundImage: `url(${service.Image})`, height: 185, backgroundSize: 'cover', borderRadius: 2 }}></Box>
                        <Typography variant='h6' sx={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 1, textAlign: 'center', mt: 1 }}>{service.Title}</Typography>

                    </Paper>)
                }

            </Box>

            <Grid container spacing={6}>




                <Grid item xs={12} md={6} lg={2} >
                    {/* <AllServicesList /> */}
                </Grid>

                <Grid item xs={12} md={12} lg={6} >

                    {/* <ServiceOverview question1={question1} question2={question2} question3={question3} matchService={matchService} /> */}
                    {/* <ServiceOverview question1={question1} question2={question2} question3={question3} matchService={matchService} /> */}
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <ServiceCategory service={matchService} />
                </Grid>

            </Grid>
        </Box>
    );
};

export default ServiceDetails;