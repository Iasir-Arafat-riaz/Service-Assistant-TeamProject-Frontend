import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const SingleProviderDetails = () => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <Box

                sx={{
                    backgroundImage: `url(${'https://i.ibb.co/D9s254j/paint.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',

                    width: '100%',
                    height: '60vh'
                }}
            >
            </Box>

            <Container sx={{ mt: -10, mb: 5 }} style={{ zIndex: '+9999' }}>
                <Paper elevation={5} sx={{ p: 4 }} style={{ zIndex: '' }}>
                    <Grid container spacing={2} style={{ zIndex: '' }} >
                        <Grid item xs={12} md={1.5}>
                            <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                                <img
                                    src='https://i.ibb.co/7SY3wc4/img-01.jpg'
                                    alt='Provider-logo'
                                    style={{ borderRadius: '50%', width: '100px', }}
                                />
                            </Box>

                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Stack direction="row" spacing={1}>
                                <Chip label="Featured" sx={{ backgroundColor: "#FF5E14", color: "#FFFF" }} />
                                <Chip label="Verified" sx={{ backgroundColor: "#66BB6A", color: "#FFFF" }} />
                            </Stack>
                            <Box sx={{ mb: 1 }}>
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#FF5E14'
                                    }}
                                >Freelance Open Desk</Typography>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        fontWeight: 'bold',
                                        color: ''
                                    }}
                                >We Help You To Invent The Bright and Secure Future
                                </Typography>

                            </Box>

                            <Stack direction="row" spacing={1}>
                                <Chip variant="outlined" label="AC Repair Service" />
                                <Chip variant="outlined" label="Appliance Repair" />
                            </Stack>
                        </Grid>

                        <Grid item md={3.5}>
                            <Box sx={{
                                my: 3, display: 'column', justifyContent: 'center'

                            }}>

                                <Typography sx={{ fontWeight: 'bold' }}>Location: <em>123 Main Street, Anderkilla</em></Typography>
                                <Box
                                    sx={{

                                        display: 'flex',
                                        alignItems: 'center',
                                        my: 2
                                    }}
                                >
                                    {/* <Box sx={{ fontWeight: 'bold', pr: 1 }}>Ratings:  </Box> */}
                                    <Rating
                                        name="text-feedback"
                                        value='4'
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    <em style={{ marginLeft: '5px' }}> (125 feedbacks)</em>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>

            <Container sx={{ mb: 10 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Box
                            sx={{
                                border: '1px solid gray',
                                // padding: '20px 30px 30px',
                                borderRadius: '5px'
                            }}
                        >
                            <Typography
                                sx={{ fontWeight: 'bold', p: 1, textAlign: 'center' }}>Contact Details</Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon sx={{ paddingLeft: '0 ', minWidth: '30px', color: '#FF5E14' }}>
                                        <AccountCircleOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Mahfujur Rahman" />
                                </ListItem>

                                <ListItem>
                                    <ListItemIcon sx={{ paddingLeft: '0 ', minWidth: '30px', color: '#FF5E14' }}>
                                        <LocationOnOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Roundhouse Ln, London, UK" />
                                </ListItem>

                                <ListItem>
                                    <ListItemIcon sx={{ paddingLeft: '0 ', minWidth: '30px', color: '#FF5E14' }}>
                                        <EmailOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="servicea2z@gmail.com" />
                                </ListItem>

                            </List>
                            <Box
                                sx={{ mx: 5, my: 1, }}
                            >
                                <Button
                                    style={{ borderColor: "#FF5E14", color: '#000' }}
                                    variant="outlined">Contact Provider
                                </Button>
                            </Box>


                        </Box>
                    </Grid>
                    <Grid item md={9}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 1 }}>About Freelance Open Desk</Typography>
                        <Typography sx={{ mb: 1, textAlign: 'justify' }}>We have a wide spectrum of expertise in web solutions within these industries, giving us the necessary skills and knowledge to help you increase your presence on the web.Through our expertise, technological knowledge, global presence and betspoke web solutions, we can help knowledge to help you increase your presence you transform your business, maximize performance and surpass the competition.</Typography>
                        <Typography sx={{ textAlign: 'justify' }}> We have a wide spectrum of expertise in web solutions within these industries, giving us the necessary skills and knowledge to help you increase your presence on the web.Through our expertise, technological knowledge, global presence and betspoke web solutions, we can help knowledge to help you increase your presence you transform your business, maximize performance and surpass the competition.</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item md={3}></Grid>
                    <Grid item md={9}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 1 }}>Offered Services</Typography>

                        <Card sx={{ width: '100%', mb: 2 }}>
                            <CardActionArea>
                                <Grid container spacing={2}>
                                    <Grid item md={3}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://i.ibb.co/MC8y1sk/acinstallation.jpg"
                                            alt="green iguana"
                                        />
                                    </Grid>

                                    <Grid item md={9}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </Grid>
                                </Grid>

                            </CardActionArea>
                        </Card>

                        <Card sx={{ width: '100%', mb: 2 }}>
                            <CardActionArea>
                                <Grid container spacing={2}>
                                    <Grid item md={3}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://i.ibb.co/MC8y1sk/acinstallation.jpg"
                                            alt="green iguana"
                                        />
                                    </Grid>

                                    <Grid item md={9}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </Grid>
                                </Grid>

                            </CardActionArea>
                        </Card>


                        <Card sx={{ width: '100%', mb: 2 }}>
                            <CardActionArea>
                                <Grid container spacing={2}>
                                    <Grid item md={3}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://i.ibb.co/MC8y1sk/acinstallation.jpg"
                                            alt="green iguana"
                                        />
                                    </Grid>

                                    <Grid item md={9}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </Grid>
                                </Grid>

                            </CardActionArea>
                        </Card>


                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider >
    );
};

export default SingleProviderDetails;