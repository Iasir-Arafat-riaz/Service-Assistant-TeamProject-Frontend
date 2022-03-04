import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import CallIcon from '@mui/icons-material/Call';
const RequestService = () => {
    return (
        <Container >
            <Paper elevation={2} sx={{
                borderRadius: 2,
                mb: 3,
                px: 3
            }} >
                <Grid container>
                    <Grid
                        item
                        md={4}
                        sx={{ mt: -15, }}
                        style={{ zIndex: '+1' }}>
                        <img
                            style={{ paddingLeft: '20px' }}
                            width="70%"
                            height='100%'
                            src='https://i.ibb.co/PzqvrVR/cus-removebg-preview-1.png' alt='customer'
                        />
                    </Grid>
                    <Grid item
                        md={8}
                        sx={{ py: 2 }}>
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: 25,
                                my: 2
                            }}>
                            Can't find your desired service? Let us know 24/7 in 47952
                        </Typography>
                        <Stack spacing={2} direction="row">
                            <Button
                                style={{ backgroundColor: "#EC6B20", }}
                                sx={{
                                    borderRadius: 2,
                                    p: 2,
                                    fontWeight: 'bold',
                                    me: 5
                                }}
                                variant='contained'>
                                Request for Service
                            </Button>
                            <Button
                                style={{ borderColor: "#FF5E14", }}
                                sx={{
                                    borderRadius: 2,
                                    py: 2,
                                    px: 5,
                                    fontWeight: 'bold'
                                }}
                                variant='outlined'>
                                <CallIcon sx={{ pr: 1 }} /> 47952
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default RequestService;