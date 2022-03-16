import React from 'react';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import { Box } from '@mui/system';
// import detailsBanner from '../../images/service-details-banner.png';
import '../SingleService.css';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Typography } from '@mui/material';

const SingleServiceHeader = ({ matchService }) => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    //console.log(matchService.mainFeatures)
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${matchService.Img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        mt: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundAttachment: 'fixed',
                        height : { xs: '40vh', md : '50vh'}
                    }}>

                    <Box
                        sx={{ mx: 4, mt: 4 }}
                    >
                        <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#fff', mb: 1 }}>{matchService?.Title}</Typography>

                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5, fontWeight: 500, color: "#fff" }}>
                            <Link to="/home" style={{ textDecoration: 'none', color: "#fff", }}>Home</Link>  - <small style={{ color: '#FF5E14' }}>{matchService?.Title}</small>
                        </span>
                    </Box>


                </Box>
                <Container>
                    <Grid sx={{ mt: -25, }} item xs={12} md={5}>
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: 'transparent' }}>
                            <Typography sx={{ fontSize: 20, mb: 1, fontWeight: 'bold', color: 'white' }} variant="h6">Main feature</Typography>
                            {
                                matchService.mainFeatures.map((text, index) => (
                                    <Typography sx={{ color: 'white' }} variant="h6"><li>{text}</li></Typography>
                                ))
                            }
                        </Paper>
                    </Grid>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default SingleServiceHeader;