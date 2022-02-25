import { Button, Container, Grid, Typography, Box, Skeleton, CardMedia, CardContent, CardHeader, Avatar, IconButton, Card } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import "swiper/swiper.min.css";
import Testimonial from "../Testimonial/Testimonial";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { allData, websiteReviews } from "../../../../redux/dataSlice/dataSlice";

const Testimonials = () => {




    const dispatach = useDispatch();
    const { testimonials, testimonialLoading } = useSelector(allData);

    useEffect(() => {
        dispatach(websiteReviews());
    }, [dispatach]);


    // slick slider
    const slickSlider = {
        dots: false,
        infinite: false,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <Container sx={{ mb: 20 }}>

            {
                testimonialLoading ?
                    <Skeleton animation="wave" variant="rectangular" width={'50%'} sx={{ mb: 3 }} height={30} />
                    :
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Testimonials</Typography>
            }

            {/*testimonials   */}


            {
                testimonialLoading ? <Grid container spacing={2}>
                    {[...new Array(3)].map((ske, index) => <Grid key={index} item xs={12} md={4}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardHeader
                                avatar={
                                    testimonialLoading && (
                                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                    )
                                }

                                title={
                                    testimonialLoading && (
                                        <Skeleton
                                            animation="wave"
                                            height={10}
                                            width="80%"
                                            style={{ marginBottom: 6 }}
                                        />
                                    )
                                }
                                subheader={
                                    testimonialLoading && (
                                        <Skeleton animation="wave" height={10} width="40%" />
                                    )
                                }
                            />
                            {testimonialLoading && (
                                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                            )}

                            <CardContent>
                                {testimonialLoading && (
                                    <React.Fragment>
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} width="80%" />
                                    </React.Fragment>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    )}
                </Grid>
                    :
                    <Slider {...slickSlider}>
                        {
                            testimonials.map((testiominal) => testiominal.status === 'approved' && <Testimonial key={testiominal._id} testiominal={testiominal} />
                            )
                        }
                    </Slider>}



        </Container>
    );
};

export default Testimonials;
