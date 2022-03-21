import React, { useState, useEffect } from 'react';
import { Box, Container, IconButton, Skeleton, Stack, Typography } from '@mui/material';

import 'swiper/css';
import "swiper/css/navigation";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
const CustomSlider = props => {
    const data = props.data;
    const Component = props.component;
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
        <>
            <Box sx={{
                position: 'relative',
            }}>
                <Box >
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
                        modules={[Navigation]}
                        grabCursor={true}
                        onSlideChange={(ev) => {
                            set_my_swiper(ev)
                            console.log(ev);
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
                            data?.map((service, i) => <SwiperSlide key={i}><Component service={service} /></SwiperSlide>)
                        }
                    </Swiper>
                </Box>
                <Stack justifyContent='space-between' direction='row' sx={{
                    position: 'absolute',
                    top: '35%',
                    width: '100%',

                }}>

                    {
                        my_swiper_status.isBeginning ? <Box></Box> : <IconButton sx={btnStyle} onClick={() => my_swiper.slidePrev()}>
                            <ArrowBackIosNewIcon sx={{ color: 'rgb(255, 94, 20)' }}></ArrowBackIosNewIcon>
                        </IconButton>
                    }
                    {
                        my_swiper_status.isEnd ? <Box></Box> : <IconButton onClick={() => my_swiper.slideNext()}
                            sx={btnStyle}
                        ><ArrowForwardIosIcon sx={{ color: 'rgb(255, 94, 20)' }}></ArrowForwardIosIcon></IconButton>
                    }

                </Stack>
            </Box>
        </>
    );
};

export default CustomSlider;