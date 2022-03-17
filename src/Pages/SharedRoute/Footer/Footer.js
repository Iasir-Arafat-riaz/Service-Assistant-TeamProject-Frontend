import { Container, Grid, Typography, Box } from '@mui/material';
import React from 'react';
import logo from '../../images/footer-logo.png';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer style={{ background: "#151414", height: 'auto', padding: 100, }}>
            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={6} md={4}>

                        <img width="120" style={{ marginTop: 3 }} src={logo} alt="logo" />

                        <Typography variant="body2" sx={{ color: "#7E7E7E", lineHeight: 2, mb: 2, mt: 2 }}>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing elit,Lorem ipsum dolor sit amet.</Typography>

                        <Box className="footer-social-icon">
                            <span>Follow us</span>
                            <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                            <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                            <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                        </Box>

                    </Grid>

                    <Grid item xs={6} md={4} className="useful-links">
                        <Box className="footer-widget-heading">
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

                        <Box className="footer-widget-heading">
                            <Typography variant="h3">Subscribe</Typography>
                        </Box>

                        <Typography variant="body2" sx={{ color: "#7E7E7E", lineHeight: 2, mb: 3 }}>Don’t miss to subscribe to our new feeds, kindly fill the form below.</Typography>
                        <Box className="subscribe-form">
                            <form action="#">
                                <input type="text" placeholder="Email Address" />
                                <button><i className="fab fa-telegram-plane"></i></button>
                            </form>
                        </Box>
                    </Grid>

                </Grid>

            </Container>

        </footer>
    );
};

export default Footer;