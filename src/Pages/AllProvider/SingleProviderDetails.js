import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Rating, Stack, Tooltip, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { allData } from '../../redux/dataSlice/dataSlice';
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
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SingleProviderDetails = () => {

    const [providerProfiles, setProviderProfiles] = useState({});
    const [providerServiceInfo, setProviderServiceInfo] = useState([]);
    const { user, id } = useSelector(allData);
    // const { allServices, serviceIsLoading } = useSelector(allData);
    // const textStyle = {
    //     color: '#707070',
    // }
    // http://localhost:5000/provider/myServices/622ad1cbe7526bcaad7bceed
    //Provider Data Load by Email
    useEffect(() => {
        axios.get('http://localhost:5000/providerdetials/provider?email=samir@gmail.com')
            .then(data => {
                setProviderProfiles(data.data);
                console.log('p.data', data);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/provider/myServices/622ad1cbe7526bcaad7bceed')
            .then(data => {
                setProviderServiceInfo(data.data);
                console.log('p.info', data);
            })
    }, [])
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    console.log('p.profile Id', providerProfiles._id);
    console.log('p.profile allServices', providerServiceInfo);
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    backgroundImage: `url(${providerProfiles.backgroundImage})`,
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
                                    src={providerProfiles.Logo}
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
                                >{providerProfiles.ShopName}</Typography>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        fontWeight: 'bold',
                                        color: ''
                                    }}
                                >{providerProfiles.bio}
                                </Typography>

                            </Box>

                            <Stack direction="row" spacing={1}>
                                {
                                    providerProfiles?.offerService?.map((service) =>
                                        <Chip variant="outlined" label={service?.Name} />
                                    )
                                }

                            </Stack>
                        </Grid>

                        <Grid item md={3.5}>
                            <Box sx={{
                                my: 3, display: 'column', justifyContent: 'center'

                            }}>

                                <Typography sx={{ fontWeight: 'bold' }}>Location: <em>{providerProfiles?.address}</em></Typography>
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
                                border: '1px solid #DDDDDD',
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
                                    <ListItemText sx={{ color: "#707070" }} primary={providerProfiles.providerName} />
                                </ListItem>

                                <ListItem>
                                    <ListItemIcon sx={{ paddingLeft: '0 ', minWidth: '30px', color: '#FF5E14' }}>
                                        <LocationOnOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: "#707070" }} primary={providerProfiles.Area} />
                                </ListItem>

                                <ListItem>
                                    <ListItemIcon sx={{ paddingLeft: '0 ', minWidth: '30px', color: '#FF5E14' }}>
                                        <EmailOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: "#707070" }} primary={providerProfiles.email} />
                                </ListItem>

                            </List>
                            <Box
                                sx={{ mx: 5, my: 1, }}
                            >
                                <Button
                                    style={{ borderColor: "#FF5E14", color: '#707070' }}
                                    variant="outlined">Contact Provider
                                </Button>
                            </Box>


                        </Box>
                    </Grid>
                    <Grid item md={9}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 1, color: '#363636' }}>About {providerProfiles.ShopName}</Typography>
                        <Typography sx={{ mb: 1, textAlign: 'justify', color: '#727272' }}>{providerProfiles.about}</Typography>

                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ my: 3 }}>
                    <Grid item md={3}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 3, color: '#363636', textAlign: 'center' }}>FAQ</Typography>
                        {providerServiceInfo?.map((service) => {
                            return (
                                < >
                                    <Grid container spacing={2}>
                                        {service?.FQA?.map((item, index) => {
                                            return (
                                                <>
                                                    <Accordion
                                                        expanded={expanded === index}
                                                        onChange={handleChange(index)}

                                                        key={index}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon sx={{ backgroundColor: '#FD7A3E', color: '#fff', borderRadius: '50%' }} />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Typography sx={{ fontWeight: 'bold' }}>
                                                                {Object?.keys(service?.FQA[index])}</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails >
                                                            <Typography>
                                                                {Object?.values(service?.FQA[index])}
                                                            </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </>
                                            )
                                        })}
                                    </Grid>
                                </>
                            );
                        })}

                    </Grid>


                    <Grid item md={9}>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: '#363636' }}>Offered Services</Typography>
                        {providerServiceInfo.map((service) => {
                            return (
                                < >
                                    <Grid container spacing={2}>

                                        {service.allServices?.map((item) => (
                                            <Grid item md={3} xs={12}>
                                                <Card sx={{ width: '100%', height: '100%' }}>
                                                    <CardActionArea>

                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image={item.Image}
                                                            alt="service sub category"
                                                        />

                                                        <CardContent >
                                                            <Tooltip title={item.Title}>

                                                                <Typography gutterBottom variant="h6" component="div"
                                                                    sx={{ color: "#707070" }}
                                                                >
                                                                    {item.Title.substring(0, 12)}...

                                                                </Typography>
                                                            </Tooltip>
                                                        </CardContent>

                                                    </CardActionArea>
                                                </Card>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </>
                            );
                        })}

                        <Typography variant='h5' sx={{ fontWeight: 'bold', my: 3, color: '#363636' }}>Experience</Typography>
                        {providerServiceInfo.map((service) => {
                            return (
                                < >
                                    <Grid container spacing={2}>
                                        {service.allServices?.map((item) => {
                                            return (
                                                <>
                                                    {item.Key?.slice(1, 2).map((name) => {
                                                        return (
                                                            <>
                                                                <Grid item md={6} xs={12}>
                                                                    <Paper elevation={3}
                                                                        sx={{
                                                                            p: 1,
                                                                            borderBottom: '2px solid #ffb600',
                                                                            borderRight: '3px solid #ffb600'
                                                                        }}
                                                                    >
                                                                        <Tooltip title={name.Name}>

                                                                            <Typography gutterBottom variant="h6" component="div"
                                                                                sx={{ color: "#707070" }}
                                                                            >
                                                                                {name.Name.substring(0, 35)}...

                                                                            </Typography>
                                                                        </Tooltip>
                                                                    </Paper>

                                                                </Grid>
                                                            </>
                                                        )
                                                    })}
                                                </>
                                            )
                                        })}
                                    </Grid>
                                </>
                            );
                        })}

                        <Typography variant='h5' sx={{ fontWeight: 'bold', my: 3, color: '#363636' }}>Customer Reviews</Typography>
                        <Grid container sx={{ my: 2 }}>
                            <Grid item xs={2.5} md={1.25}>
                                <Box
                                    sx={{
                                        width: '60px',
                                        height: '60px',
                                        background: '#ffca28',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '5px solid #f5efef',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography variant='h6' sx={{ fontWeight: 'bold', }}>ID</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={9} md={10}>
                                <Rating
                                    name="text-feedback"
                                    value='4'
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <Typography gutterBottom variant="h6" component="div"
                                    sx={{ color: "#707070" }}
                                > assigned person is technically sound and well mannered. very good service received from him.

                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ my: 2 }}>
                            <Grid item xs={2.5} md={1.25}>
                                <Box
                                    sx={{
                                        width: '60px',
                                        height: '60px',
                                        background: '#ffca28',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '5px solid #f5efef',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography variant='h6' sx={{ fontWeight: 'bold', }}>MR</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={9} md={10}>
                                <Rating
                                    name="text-feedback"
                                    value='4'
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <Typography gutterBottom variant="h6" component="div"
                                    sx={{ color: "#707070" }}
                                > The service man was very well mannared and efficient on his tasks. Thanks</Typography>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ my: 2 }}>
                            <Grid item xs={2.5} md={1.25}>
                                <Box
                                    sx={{
                                        width: '60px',
                                        height: '60px',
                                        background: '#ffca28',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '5px solid #f5efef',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography variant='h6' sx={{ fontWeight: 'bold', }}>RH</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={9} md={10}>
                                <Rating
                                    name="text-feedback"
                                    value='4'
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <Typography gutterBottom variant="h6" component="div"
                                    sx={{ color: "#707070" }}
                                > Excellent and very professional. very friendly and polite. highly recommended

                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container sx={{ my: 2 }}>
                            <Grid item xs={2.5} md={1.25}>
                                <Box
                                    sx={{
                                        width: '60px',
                                        height: '60px',
                                        background: '#ffca28',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '5px solid #f5efef',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography variant='h6' sx={{ fontWeight: 'bold', }}>MS</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={9} md={10}>
                                <Rating
                                    name="text-feedback"
                                    value='4'
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <Typography gutterBottom variant="h6" component="div"
                                    sx={{ color: "#707070" }}
                                > The mechanics were very good and well behaved. So far I am satisfied

                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider >
    );
};

export default SingleProviderDetails;