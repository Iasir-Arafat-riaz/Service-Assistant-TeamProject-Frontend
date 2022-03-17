import { Box, Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';

import './ChooseUs.css';
const ChooseUs = () => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    backgroundColor: '#f8f5ff',
                    padding: '80px 0px'
                }}
            >
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Box className='choose'  >
                                <img
                                    style={{
                                        borderStyle: 'none',
                                        height: '100%',
                                        maxWidth: '100%',
                                        verticalAlign: 'middle'
                                    }} 
                                    src='https://i.ibb.co/cXBh9wv/shake-Hand.webp'
                                    alt='choose-us' />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography
                                    sx={{
                                        color: '#FF5E14',
                                        letterSpacing: '4px',
                                        display: 'block',
                                        mb: 2,
                                        fontWeight: 700,
                                    }}
                                >CHOOSE US</Typography>
                                <Typography 
                                    sx={{color:'#022279'}}
                                    variant='h3'
                                >Upgrade Your Skills With Service A2Z</Typography>

                                <List>
                                    <ListItem sx={{ paddingLeft: 0 }}>
                                        <ListItemIcon sx={{ color: '#FF5E14' }}>
                                            <PeopleAltOutlinedIcon fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText sx={{ color: "" }} 
                                        primaryTypographyProps={{fontSize: '22px'}} 
                                        primary='Meet new customers' />
                                    </ListItem>

                                    <ListItem sx={{ paddingLeft: 0 }}>
                                        <ListItemIcon sx={{ color: '#FF5E14' }}>
                                            <AutoGraphOutlinedIcon fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText sx={{ color: "" }} 
                                          primaryTypographyProps={{fontSize: '22px'}} 
                                        primary='Grow your revenue' />
                                    </ListItem>

                                    <ListItem sx={{ paddingLeft: 0 }}>
                                        <ListItemIcon sx={{ color: '#FF5E14' }}>
                                            <SpaOutlinedIcon fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText sx={{ color: "" }} 
                                          primaryTypographyProps={{fontSize: '22px'}} 
                                        primary='Build your online reputation' />
                                    </ListItem>
                                </List>

                                <Button 
                                type="submit" 
                                variant= 'contained'  
                                sx={ { borderRadius: 28, } }
                                style={{ backgroundColor: "#FF5E14", }}
                                >Choose Career</Button>
                            </Box>
                        </Grid>
                    </Grid>

                </Container >
            </Box>
        </ThemeProvider>
    );
};

export default ChooseUs;