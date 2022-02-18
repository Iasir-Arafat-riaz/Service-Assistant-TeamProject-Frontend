import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ServiceCategory from '../ServiceCategory/ServiceCategory/ServiceCategory';
import AllServicesList from './AllServicesList';
import ServiceOverview from './ServiceOverview';

const ServiceDetails = ({ matchService, question1, question2, question3 }) => {

    return (

        <Box sx={{ p: 10 }}>
            <Grid container spacing={6}>

                <Grid item xs={12} md={6} lg={3} >
                    <AllServicesList />
                </Grid>

                <Grid item xs={12} md={6} lg={6} >
                    <ServiceOverview question1={question1} question2={question2} question3={question3} matchService={matchService} />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <ServiceCategory service={matchService} />
                </Grid>

            </Grid>
        </Box>
    );
};

export default ServiceDetails;