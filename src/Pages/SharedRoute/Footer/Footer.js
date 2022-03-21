import { Container, Grid, Typography, Box } from '@mui/material';
import React from 'react';
import logo from '../../images/footer-logo.png';
import { Link } from 'react-router-dom';
import './Footer.css';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SendIcon from '@mui/icons-material/Send';
const Footer = () => {
    return (
        <footer style={{ background: "#151414", height: 'auto', padding: 100, }}>
            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={6} md={4}>

                        <img className='footerIcon' width="120" style={{ marginTop: 3 }} src={logo} alt="logo" />

                        <Typography variant="body2" sx={{ color: "#7E7E7E", lineHeight: 2, mb: 2, mt: 2 }}>ServiceA2Z provide the service needs that you come across in everyday life. 150+ services in total, all in one app. Avail experienced  verified service provide</Typography>

                        <Box className="footer-social-icon">
                            <span className='hoverColor'>Follow us</span>

                            {/* <a href="#"><BsFacebook className="facebook"/></a>
                            <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                            <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a> */}

                            <a href="https://www.facebook.com/Service-A2Z-101461739182775" > <FacebookIcon /></a>
                            <a href="https://twitter.com/service_a2z_web"><TwitterIcon></TwitterIcon></a>
                            <a href="http://google.com/"><GoogleIcon></GoogleIcon></a>
                            <a href="https://www.youtube.com/channel/UCRR0lgDJtkv7Hyikak8q01Q"><YouTubeIcon /></a>


                        </Box>

                    </Grid>

                    <Grid item xs={6} md={4} className="useful-links">
                        <Box className="footer-widget-heading">
                            <Typography className='hoverColor' variant="h3">Useful Links</Typography>
                        </Box>
                        <Link to="/home">Home</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/dashboard/addtestimonial">Review</Link>
                        <Link to="/dashboard/myorders">Privacy</Link>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/contact">Contact</Link>
                    </Grid>

                    <Grid item xs={8} md={4}>

                        <Box className="footer-widget-heading">
                            <Typography className='hoverColor' variant="h3">Subscribe</Typography>
                        </Box>

                        <Typography variant="body2" sx={{ color: "#7E7E7E", lineHeight: 2, mb: 3 }}>Don’t miss to subscribe to our new feeds, kindly fill the form below.</Typography>
                        <Box className="subscribe-form">
                            <form method="post" target="_blank" action="https://www.youtube.com/channel/UCRR0lgDJtkv7Hyikak8q01Q">
                                <input className='footerInput' type="text" placeholder="Email Address" />
                                <button><SendIcon /></button>
                            </form>
                        </Box>
                    </Grid>

                </Grid>

            </Container>

        </footer>
    );
};

export default Footer;