import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer style={{ background: "#151414", height: '500px' }}>
            <Container>

                {/* <Grid container spacing={2}>

                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ fontWight: 'bold', color: "orange" }}>SERvicew A2z</Typography>
                        <Typography variant="body2" sx={{}}>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing elit,Lorem ipsum dolor sit amet.</Typography>

                        <div class="footer-social-icon">
                            <span>Follow us</span>
                            <a href="#"><i class="fab fa-facebook-f facebook-bg"></i></a>
                            <a href="#"><i class="fab fa-twitter twitter-bg"></i></a>
                            <a href="#"><i class="fab fa-google-plus-g google-bg"></i></a>
                        </div>

                    </Grid>

                    <Grid item xs={4}>
                    </Grid>

                    <Grid item xs={4}>
                    </Grid>

                </Grid> */}

            </Container>

        </footer>
    );
};

export default Footer;