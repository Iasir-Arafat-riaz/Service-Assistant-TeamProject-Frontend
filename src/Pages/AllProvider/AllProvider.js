import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import required modules  
import { Stack, Grid, IconButton } from "@mui/material";
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AllProviderChild from './AllProviderChild';
const AllProvider = () => {
    const [providers, setProviders] = useState([])

    useEffect(() => {
        const api = `https://dry-sea-00611.herokuapp.com/users/providers`
        axios.get(api).then(res => {
            setProviders(res.data)
        })
    }, []);
    const [my_swiper, set_my_swiper] = useState({});
    const [my_swiper_status, set_my_swiper_status] = useState({
        isBeginning: true,
        isEnd: false
    });
    const btnStyle = {
        background: 'white',
        boxShadow: '0 2px 5px 0 rgb(0 0 0 / 40%)',
        '&:hover': {
            background: "white",
        },
        zIndex: '999'

    }
    return (
        <Container>
            <Stack justifyContent='center' alignItems='center' >
                <Box sx={{ width: { md: '70%', xs: "90", textAlign: 'center' } }}>
                    <Typography variant="h3" color='#363636' sx={{ fontWeight: 'bold', mb: 3 }}>Top Providers</Typography>
                    <Typography variant="body1" color='#363636' sx={{ mb: 3 }}>
                        Our providers are committed to serving service with customer satisfaction. They always maintain all safety requirements and come with the necessary materials.</Typography>
                </Box>
            </Stack>
            <Box
                sx={{
                    position: 'relative'
                }}
            >
                <Swiper
                    breakpoints={{
                        // when window width is >= 640px
                        320: {
                            slidesPerView: 1,
                        },
                        // when window width is >= 768px
                        600: {
                            slidesPerView: 2,
                        },
                        900: {
                            slidesPerView: 4,
                        },
                    }}
                    slidesPerView={4}
                    spaceBetween={15}
                    speed={1000}
                    modules={[Autoplay]}

                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    grabCursor={true}
                    onSlideChange={(ev) => {
                        set_my_swiper(ev)
                        set_my_swiper_status({
                            isBeginning: ev.isBeginning,
                            isEnd: ev.isEnd,
                        })
                    }}
                    onInit={(ev) => {
                        set_my_swiper(ev)
                    }}
                >
                    {
                        providers.map(singleData => <SwiperSlide key={singleData._id}><AllProviderChild provider={singleData}></AllProviderChild></SwiperSlide>)
                    }
                </Swiper>
                <Stack justifyContent='space-between' direction='row'
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        zIndex: '99'
                    }}
                >
                    <Grid container spacing={0} sx={{ justifyContent: 'space-between' }}>
                        <Grid item xs={3} sx={{
                            background: '#ffffffc4',
                            display: { xs: 'none', lg: "block" }
                        }}> </Grid>
                        <Grid item xs={3} sx={{
                            background: '#ffffffc4',
                            display: { xs: 'none', lg: "block" }
                        }}> </Grid>

                    </Grid>


                </Stack>
                <Stack justifyContent='space-between' direction='row'
                    sx={{
                        width: '100%',
                        position: 'absolute',
                        top: '50%',
                        zIndex: '99'
                    }}
                >
                    {
                        my_swiper_status.isBeginning ? <Box></Box> : <IconButton sx={btnStyle} onClick={() => my_swiper.slidePrev()}>
                            <ArrowBackIcon sx={{ color: 'rgb(255, 94, 20)' }}></ArrowBackIcon>
                        </IconButton>
                    }
                    {
                        my_swiper_status.isEnd ? <Box></Box> : <IconButton onClick={() => my_swiper.slideNext()}
                            sx={btnStyle}
                        ><ArrowForwardIcon sx={{ color: 'rgb(255, 94, 20)' }}></ArrowForwardIcon></IconButton>
                    }


                </Stack>
            </Box >

        </Container>
    );
};

export default AllProvider;
