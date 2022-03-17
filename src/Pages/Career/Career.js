import { Avatar, Box, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import Navigation from '../SharedRoute/Navigation/Navigation';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import AdjustIcon from '@mui/icons-material/Adjust';
import Footer from '../SharedRoute/Footer/Footer';

const Career = () => {
    const career = [
        {
            "JobTitle": "Painting Service Expert",
            "Category": "Painting & Renovation",
            "Image": "https://i.ibb.co/q7F8pSQ/Male-hand-painting-wall-with-paint-roller-Painting-apartment-renovating-with-blue-color-paint.jpg",
            "ServiceType": "Square Feet",
            "Posted": "2 days ago",
            "About": "We are Service A2Z. Our goal is to provide service to customers without hassle. By joining as a service provider you can meet with new customers and grow your revenue. Your service quality will make your profile bright. Service A2Z always tries to give the service to customers with satisfaction. ",
            "Responsibility": [
                {
                    "res": "Ensure experienced professional and expert painting"
                },
                {
                    "res": "Ensure proper safety and service equipment carries by expert"
                },
                {
                    "res": "Ensure proper covering before painting and cleaning after service"
                },
                {
                    "res": "Ensure on time work completion with quality service"
                }
            ],
            "Experience": "3 years",
            "WhatToDo": "You will work on a project under the guidance of Service A2Z. Doing service with quality and ensure all safety and others related"
        },

    ]

    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <Navigation />
            {/* 
            <Box
                sx={{
                    backgroundImage: `url(https://i.ibb.co/WvLPqPH/service-provider-career.png)`,
                    height: '50vh',
                    objectFit: 'cover',
                    backgroundSize: 'cover',
                    mt: 10
                }}
            >
            </Box> */}

            <Container sx={{ mt: 12,mb: 5 }}>

                <Typography variant='h4' sx={{ fontWeight: 'bold', letterSpacing: 2, textAlign: 'center', color: "#113849", fontSize: '35px' }}>Choose Your Job</Typography>

                <Typography variant='h6' sx={{ letterSpacing: 2, textAlign: 'center', color: "#707070", fontSize: '16px' }}>
                    (16) Jobs and Vacancies</Typography>

                {
                    career.map(job =>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4.5}>
                                <List sx={{
                                    // width: '100%',
                                    maxWidth: 400,
                                    minWidth: 150,
                                    bgcolor: 'background.paper',
                                    borderRadius: '10px',
                                    border: ' 1px solid #ddd',
                                    borderLeft: '3px solid #022278',
                                    padding: '20px',
                                    fontSize: '16px',
                                    mb: 10,
                                }}>
                                    <ListItem sx={{ pl: 0 }} alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={job?.JobTitle}
                                                src={job?.Image}
                                                sx={{
                                                    width: 56, height: 56,
                                                    mr: 1, borderRadius: '30%'
                                                }}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant='h6'
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        // letterSpacing: 2
                                                    }}
                                                >
                                                    {job?.JobTitle}
                                                </Typography>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline-block' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Service Type: {job?.ServiceType}
                                                    </Typography>

                                                    <Grid container>
                                                        <Grid item xs={12} md={6}>
                                                            <Typography
                                                                sx={{ display: 'inline-block' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                Posted: {job?.Posted}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Typography
                                                                sx={{ display: 'inline', }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                Experience: {job?.Experience}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </Grid>

                            <Grid item xs={12} md={7.5}>
                                <Box
                                    sx={{
                                        bgcolor: 'background.paper',
                                        borderRadius: '10px',
                                        border: ' 1px solid #ddd',
                                        padding: '20px',
                                    }}
                                >

                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <img
                                            alt={job?.JobTitle}
                                            src={job?.Image}
                                            style={{
                                                width: 200, height: 120,
                                                borderRadius: '20%',
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        variant='h4'
                                        sx={{
                                            fontWeight: 'bold',
                                            letterSpacing: 2,
                                            textAlign: 'center',
                                            color: '#022279',
                                            my: 1
                                        }}
                                    >
                                        {job?.JobTitle}
                                    </Typography>

                                    <Typography
                                        sx={{ textAlign: 'center' }}
                                        variant="h6"
                                        color="#707070"
                                    >
                                        Posted: {job?.Posted}
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        color="#FF5E14"
                                        sx={{ fontWeight: 'bold', mt: 3 }}
                                    >About Service A2Z
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        color="#707070"
                                        sx={{ mt: 3, textAlign: 'justify' }}
                                    > {job.About}
                                    </Typography>


                                    <Typography
                                        variant="h5"
                                        color="#FF5E14"
                                        sx={{ fontWeight: 'bold', mt: 3 }}
                                    >Experience: <span>{job.Experience}</span>
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        color="#FF5E14"
                                        sx={{ fontWeight: 'bold', mt: 3 }}
                                    >What You Do
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="#363636"
                                        sx={{ mt: 3 }}
                                    >{job.WhatToDo}
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        color="#FF5E14"
                                        sx={{ fontWeight: 'bold', mt: 3 }}
                                    >Category: <span style={{color:'#363636'}}>{job.Category}</span>
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        color="#FF5E14"
                                        sx={{ fontWeight: 'bold', mt: 3 }}
                                    >Service Type: <span style={{color:'#363636'}}>{job.ServiceType}</span>
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        color="#FF5E14"
                                        sx={{ fontWeight: 'bold', mt: 3 }}
                                    >Responsibility
                                    </Typography>
                                    {
                                        job.Responsibility.map(resp =>
                                            <List>
                                                <ListItemText sx={{color:'#363636'}}><AdjustIcon fontSize="small" /> {resp.res}</ListItemText>
                                            </List>
                                        )
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                    )
                }

            </Container>

            <Footer />
        </ThemeProvider>
    );
};

export default Career;