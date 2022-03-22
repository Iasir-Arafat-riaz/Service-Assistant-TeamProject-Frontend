import { Button, Container, Grid, Typography, Box, Skeleton, CardMedia, CardContent, CardHeader, Avatar, IconButton, Card } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios";
import React, { useEffect, useState } from "react";
// import "swiper/swiper.min.css";
import Testimonial from "../Testimonial/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { allData, websiteReviews } from "../../../../redux/dataSlice/dataSlice";
import PropTypes from 'prop-types';
import TestimonialUserCard from "../TestimonialUserCard/TestimonialUserCard";

const Testimonials = () => {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const { testimonials, testimonialLoading } = useSelector(allData);

    useEffect(() => {
        dispatch(websiteReviews());
    }, [dispatch]);

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Box>{children}</Box>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }
    
    const handleClick = (i) => {
        setValue(i);
    }
    return (
        <Container sx={{mb:2, mt: 10 }}>

            {
                testimonialLoading ?
                    <Skeleton animation="wave" variant="rectangular" width={'50%'} sx={{ mb: 3 }} height={40} />
                    :
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Testimonials</Typography>
            }
            <Grid container spacing={2}>
                <Grid item xs={4} md={4} >
                    <Box sx={{ flexGrow: 0, height: '60vh', overflowY: 'scroll', px: 2 }} className='testimonials-userWrap'>
                        {
                            testimonialLoading ? [...new Array(4)].map((ske, index) =>
                                <Skeleton key={index} variant="rectangular" width={250} sx={{ borderRadius: 2, mb: 2 }} height={80} />
                            ) : testimonials.map((singleTestimonials, i) => <TestimonialUserCard key={i} {...singleTestimonials} value={value} index={i} handleClick={handleClick}></TestimonialUserCard>)
                        }
                    </Box>
                </Grid>
                <Grid item xs={8} md={8}>
                    {
                        testimonialLoading ? <Box>
                            <Skeleton variant="rectangular" width={250} sx={{ borderRadius: 2, mb: 2 }} height={20} />
                            <Skeleton width={250} sx={{ mb: 5 }} height={20} />
                            {[...new Array(4)].map((ske, index) =>
                                <Skeleton variant="rectangular" key={index} width='100%' sx={{ borderRadius: 1, mb: 2 }} height={20} />
                            )}
                        </Box> : testimonials.map((singleTestimonials, i) => <TabPanel key={i} value={value} index={i}><Testimonial {...singleTestimonials} ></Testimonial></TabPanel>)
                    }
                </Grid>

            </Grid>

        </Container >
    );
};

export default Testimonials;
