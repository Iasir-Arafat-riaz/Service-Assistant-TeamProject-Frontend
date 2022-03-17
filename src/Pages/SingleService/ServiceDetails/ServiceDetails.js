import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Footer from '../../SharedRoute/Footer/Footer';
import ServiceCategory from '../ServiceCategory/ServiceCategory/ServiceCategory';
import AllServicesList from './AllServicesList';
import ServiceOverview from './ServiceOverview';

const ServiceDetails = ({ matchService, question1, question2, question3, singleServiceLoading }) => {

    if (singleServiceLoading) {
        return 'loading...'
    }

    // //console.log(singleServiceLoading)
    return (

        <Container sx={{ pt: 10, pb: 10 }}>
            <Grid container spacing={6} sx={{ flexDirection: { md: 'row', xs: 'column-reverse' } }}>

                <Grid item xs={12} md={8} lg={8} >
                    <ServiceOverview question1={question1} question2={question2} question3={question3} matchService={matchService} />
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                    <ServiceCategory service={matchService} />
                </Grid>

            </Grid>

        </Container>
    );
};

export default ServiceDetails;