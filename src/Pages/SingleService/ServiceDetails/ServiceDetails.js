import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Footer from '../../SharedRoute/Footer/Footer';
import ServiceCategory from '../ServiceCategory/ServiceCategory/ServiceCategory';
import AllServicesList from './AllServicesList';
import ServiceOverview from './ServiceOverview';

const ServiceDetails = ({ matchService }) => {
    return (

        <Container sx={{ pt: 10, pb: 10 }}>
            <Grid container spacing={6} sx={{ flexDirection: { md: 'row', xs: 'column-reverse' } }}>
                <Grid item xs={12} md={8} lg={8} >
                    <ServiceOverview matchService={matchService} />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <ServiceCategory service={matchService} />
                </Grid>

            </Grid>

        </Container>
    );
};

export default ServiceDetails;