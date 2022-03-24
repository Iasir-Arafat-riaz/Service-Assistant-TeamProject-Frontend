import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Rating, Stack, Tooltip, Typography, TextareaAutosize } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './SingleProviderDetails.css';
import { useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
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
import { useForm } from 'react-hook-form';
import { Avatar, IconButton, Input, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PhotoCamera } from '@mui/icons-material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Navigation from '../SharedRoute/Navigation/Navigation';
import { useParams } from 'react-router-dom';
import Loading from '../SharedRoute/Loader/Loading';

const SingleProviderDetails = () => {

    const [providerProfiles, setProviderProfiles] = useState({});
    const [providerServiceInfo, setProviderServiceInfo] = useState([]);
    const [openBox, setOpenBox] = useState(false);
    const { user, id } = useSelector(allData);

    const { register, handleSubmit, reset, watch, setValue } = useForm();
    const [logoLoading, setLogoLoading] = useState(true);
    const [backgroundImageLoading, setBackgroundImageLoading] = useState(true);

    const { providerId } = useParams();

    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    //Provider Data Load by Email
    // useEffect(() => {
    //     axios.get(`http://localhost:5000/providerdetials/provider?email=samir@gmail.com`)
    //         .then(data => {
    //             setProviderProfiles(data.data);

    //         })
    // }, []);

    useEffect(() => {
        axios.get(`http://localhost:5000/providerdetials/provider/${providerId}`)
            .then(data => {
                setProviderProfiles(data.data);
                console.log(data);
            })
    }, []);
    // console.log(providerProfiles.email)
    useEffect(() => {
        axios.get(`http://localhost:5000/provider/myServices/${providerProfiles.providerId}`)
            .then(data => {
                setProviderServiceInfo(data.data);

            })
    }, [])
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // const matchProvider = providerProfiles.find(provider => provider._id === providerId);

    // console.log(matchProvider);

    console.log(providerProfiles.email);

    const onSubmit = data => {
        if (data?.ShopName !== '') {
            const ShopName = data.ShopName;
            axios.put(`http://localhost:5000/providerdetials/updateName/${providerProfiles.email}`, { ShopName }).then(res => {
                toast.info(`Shop name updated successfully`, {
                    position: "bottom-left"
                })
            })
        }
        if (data?.bio !== '') {
            const bio = data.bio;
            axios.put(`http://localhost:5000/providerdetials/updateBio/${providerProfiles.email}`, { bio }).then(res => {
                toast.info(`Provider bio updated successfully`, {
                    position: "bottom-left"
                })
            })
        }
        if (data?.address !== '') {
            const address = data.address;
            axios.put(`http://localhost:5000/providerdetials/updateAddress/${providerProfiles.email}`, { address }).then(res => {
                toast.info(`Provider address updated successfully`, {
                    position: "bottom-left"
                })
            })
        }
        if (data?.about !== '') {
            const about = data.about;
            axios.put(`http://localhost:5000/providerdetials/updateAboutus/${providerProfiles.email}`, { about }).then(res => {
                toast.info(`Provider about updated successfully`, {
                    position: "bottom-left"
                })
            })
        }


    }

    // hosting image
    useEffect(() => {
        const file = watch('providerImage');
        if (file?.length) {
            let body = new FormData()
            body.set('key', '752d2bbd9a2e4d6a5910df9c191e1643')
            body.append('image', file[0])
            setLogoLoading(false);
            axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload',
                data: body
            }).then(res => {
                setValue('providerImg', res.data?.data?.url)
                const Logo = res.data?.data?.url;
                axios.put(`http://localhost:5000/providerdetials/updateLogo/${providerProfiles.email}`, { Logo }).then(res => {
                    toast.info(`BackgroundImage updated successfully`, {
                        position: "bottom-left"
                    })
                })
            }).finally(() => setLogoLoading(true))
        }
        else {
        }
    }, [watch('providerImage')]);

    useEffect(() => {
        const file = watch('backgroundImage');
        if (file?.length) {
            let body = new FormData()
            body.set('key', '752d2bbd9a2e4d6a5910df9c191e1643')
            body.append('image', file[0])
            setBackgroundImageLoading(false);
            axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload',
                data: body
            }).then(res => {
                setValue('backgroundImg', res.data?.data?.url)
                const backgroundImage = res.data?.data?.url;
                axios.put(`http://localhost:5000/providerdetials/updateBackgroundimage/${providerProfiles.email}`, { backgroundImage }).then(res => {
                    toast.info(`Logo updated successfully`, {
                        position: "bottom-left"
                    })
                })
            }).finally(() => setBackgroundImageLoading(true))
        }
        else {
        }
    }, [watch('backgroundImage')]);



    return (
        <ThemeProvider theme={theme}>

            <Navigation />
            {
                Object.keys(providerProfiles).length === 0 ? <Loading />
                    :
                    <>

                        {
                            !watch("backgroundImg") ?
                                <>
                                    {
                                        openBox ?

                                            <>
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
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "60vh" }}>


                                                        <label>
                                                            <Input {...register("backgroundImage")} accept="image/*" type="file" sx={{ display: 'none' }} />
                                                            <IconButton sx={{ mt: -8, ml: 9, color: "white" }} style={{ background: 'white', color: "black" }} component="span">
                                                                <PhotoCamera />
                                                            </IconButton>
                                                        </label>

                                                        {/* </Button> */}


                                                        {/* <Input style={{ marginBottom: 10, width: 105, }} {...register("backgroundImage")} accept="image/*" type="file" /> */}

                                                    </Box>
                                                </Box>

                                            </>
                                            :
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
                                    }
                                </>
                                :
                                <Box>
                                    {
                                        watch("backgroundImg") && <Box
                                            sx={{
                                                backgroundImage: `url(${watch("backgroundImg")})`,
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center',
                                                width: '100%',
                                                height: '60vh'
                                            }}
                                        />

                                    }
                                </Box>
                        }

                        {
                            providerProfiles.email === user.email && user.role === 'provider' && <Box sx={{ ml: 2 }}>

                                {
                                    !openBox ?
                                        <Button onClick={() => setOpenBox(true)} variant="contained" style={{ color: "black", background: "#fff", borderRadius: 0, ml: 5 }}>
                                            <SettingsOutlinedIcon />
                                        </Button>
                                        :
                                        <Button onClick={() => setOpenBox(false)} variant="contained" style={{ color: "black", background: "#fff", borderRadius: 0, ml: 5 }}>
                                            <ClearIcon />
                                        </Button>
                                }

                            </Box>
                        }



                        <Container sx={{ mt: -10, mb: 5 }} style={{ zIndex: '+9999' }}>

                            <Paper elevation={5} sx={{ p: 4 }}>

                                <Grid container spacing={2} >

                                    <Grid item xs={12} md={1.5}>
                                        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>

                                            {
                                                !watch("providerImg") ?

                                                    <Box>

                                                        {
                                                            openBox ?
                                                                <>
                                                                    <Avatar sx={{ width: 130, height: 130, my: 1 }} alt="provider image" src={providerProfiles?.Logo} />

                                                                    <label htmlFor="icon-button-file">
                                                                        <Input {...register("providerImage")} accept="image/*" id="icon-button-file" type="file" sx={{ display: 'none' }} />
                                                                        <IconButton sx={{ mt: -8, ml: 9, color: "white" }} style={{ background: '#242526' }} color="primary" aria-label="upload picture" component="span">
                                                                            <PhotoCamera />
                                                                        </IconButton>
                                                                    </label>

                                                                </>

                                                                :

                                                                <Avatar sx={{ width: 130, height: 130, mt: 1 }} alt="provider image" src={providerProfiles?.Logo} />
                                                        }
                                                        {
                                                            // logoLoading && <h6>Loading...</h6>
                                                        }
                                                    </Box>
                                                    :
                                                    <>
                                                        {
                                                            watch("providerImg") && <Box> <Avatar sx={{ width: 130, height: 130, my: 1 }} alt="Remy Sharp" src={watch("providerImg")} /> </Box>
                                                        }
                                                    </>
                                            }

                                        </Box>

                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <Stack direction="row" spacing={1}>
                                            <Chip label="Featured" sx={{ backgroundColor: "#FF5E14", color: "#FFFF" }} />
                                            <Chip label="Verified" sx={{ backgroundColor: "#66BB6A", color: "#FFFF" }} />
                                        </Stack>
                                        <Box sx={{ mb: 1 }}>

                                            {
                                                openBox ?

                                                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: 'wrap', }}>

                                                        <Box sx={{ mt: 2 }} className="form-group">
                                                            <input className="form-field"  {...register("ShopName", { required: false })} defaultValue={providerProfiles?.ShopName} />
                                                            <span>
                                                                <Button type='submit'>UPDATE</Button>
                                                            </span>
                                                        </Box>

                                                    </form>
                                                    :
                                                    <Typography
                                                        variant='h6'
                                                        sx={{
                                                            mt: 1,
                                                            fontWeight: 'bold',
                                                            color: '#FF5E14'
                                                        }}
                                                    >{providerProfiles?.ShopName}
                                                    </Typography>
                                            }

                                            {
                                                openBox ?
                                                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: 'wrap', }}>

                                                        <Box sx={{ mt: 2 }} className="form-group">
                                                            <input className="form-field" {...register("bio", { required: false })} defaultValue={providerProfiles.bio} />
                                                            <span>
                                                                <Button type='submit'>UPDATE</Button>
                                                            </span>
                                                        </Box>

                                                        {/* <TextField {...register("bio", { required: false })} id="standard-basic" variant="standard" label="Update Your Shop Bio" helperText={providerProfiles.bio} />

                                            <Button type='submit' size="small" sx={{ borderRadius: 2, letterSpacing: 1, my: 'auto', ml: 1 }} variant='outlined'>UPDATE</Button> */}
                                                    </form>
                                                    :
                                                    <Typography
                                                        variant='h5'
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            color: '',
                                                            my: 1
                                                        }}
                                                    >{providerProfiles.bio}
                                                    </Typography>
                                            }


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

                                            {
                                                openBox ?
                                                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: 'wrap', }}>

                                                        <Box sx={{ mt: 3 }} className="form-group">
                                                            <input className="form-field" {...register("address", { required: false })} defaultValue={providerProfiles.address} />
                                                            <span>
                                                                <Button type='submit'>UPDATE</Button>
                                                            </span>
                                                        </Box>



                                                        {/* <TextField {...register("address", { required: false })} id="standard-basic" variant="standard" label="Update Your Location" helperText={providerProfiles.address} />

                                            <Button type='submit' size="small" sx={{ borderRadius: 2, letterSpacing: 1, my: 'auto', ml: 1 }} variant='outlined'>UPDATE</Button> */}
                                                    </form>
                                                    :
                                                    <Typography sx={{ fontWeight: 'bold' }}>Location: <em>{providerProfiles?.address}</em></Typography>
                                            }

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
                                                <ListItemText sx={{ color: "#707070" }} primary={providerProfiles.userName} />
                                            </ListItem>

                                            <ListItem>
                                                <ListItemIcon sx={{ paddingLeft: '0 ', minWidth: '30px', color: '#FF5E14' }}>
                                                    <LocationOnOutlinedIcon />
                                                </ListItemIcon>
                                                <ListItemText sx={{ color: "#707070" }} primary={providerProfiles.address} />
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
                                    <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 1, color: '#363636' }}>About {providerProfiles?.ShopName}</Typography>

                                    {
                                        openBox ?
                                            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: 'wrap', }}>
                                                <TextareaAutosize {...register("about", { required: false })} maxRows={8} id="standard-basic" variant="standard" style={{ width: '80%', padding: 10, border: "2px solid #CDD9ED" }} defaultValue={providerProfiles.about} />

                                                <Button type='submit' size="small" sx={{ borderRadius: 0, letterSpacing: 1, m: 'auto' }} variant='outlined'>UPDATE</Button>
                                            </form>
                                            :
                                            <>
                                                <Typography sx={{ mb: 1, textAlign: 'justify', color: '#727272' }}>{providerProfiles.about}</Typography>
                                            </>
                                    }


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

                                                    {service.allServices?.map((item, index) => (
                                                        <Grid item md={3} xs={12} key={index}>
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
                                                                {item.Key?.slice(1, 2).map((name, index) => {
                                                                    return (
                                                                        <>
                                                                            <Grid item md={6} xs={12}>
                                                                                <Paper elevation={3}
                                                                                    key={index}
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

                    </>
            }


        </ThemeProvider >
    );
};

export default SingleProviderDetails;
