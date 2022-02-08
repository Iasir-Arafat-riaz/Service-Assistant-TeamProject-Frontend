import { Container, Grid, Typography, Box } from '@mui/material';
import React from 'react';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer style={{ background: "#151414", height: 'auto', padding: 100 }}>
            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={6} md={4}>

                        <Typography variant="h5" sx={{ fontWight: 'bold', color: "#ff5e14" }}>
                            SERvicew A2z
                        </Typography>

                        <Typography variant="body2" sx={{ color: "#7E7E7E", lineHeight: 2, mb: 2, mt: 4 }}>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing elit,Lorem ipsum dolor sit amet.</Typography>

                        <Box class="footer-social-icon">
                            <span>Follow us</span>
                            <a href="#"><i class="fab fa-facebook-f facebook-bg"></i></a>
                            <a href="#"><i class="fab fa-twitter twitter-bg"></i></a>
                            <a href="#"><i class="fab fa-google-plus-g google-bg"></i></a>
                        </Box>

                    </Grid>

                    <Grid item xs={6} md={4} className="useful-links">
                        <Box class="footer-widget-heading">
                            <Typography variant="h3">Useful Links</Typography>
                        </Box>
                        <Link to="">Home</Link>
                        <Link to="">Services</Link>
                        <Link to="">Login</Link>
                        <Link to="">Privacy</Link>
                        <Link to="">Dashboard</Link>
                        <Link to="">Contact</Link>
                    </Grid>

                    <Grid item xs={8} md={4}>

                        <Box class="footer-widget-heading">
                            <Typography variant="h3">Subscribe</Typography>
                        </Box>

                        <Typography variant="body2" sx={{ color: "#7E7E7E", lineHeight: 2, mb: 3 }}>Don’t miss to subscribe to our new feeds, kindly fill the form below.</Typography>
                        <Box class="subscribe-form">
                            <form action="#">
                                <input type="text" placeholder="Email Address" />
                                <button><i class="fab fa-telegram-plane"></i></button>
                            </form>
                        </Box>
                    </Grid>

                </Grid>

            </Container>

        </footer>
    );
};

export default Footer;