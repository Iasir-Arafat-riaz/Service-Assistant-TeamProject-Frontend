import React,{useState, useEffect} from 'react';
import axios from 'axios'
import { styled } from '@mui/material/styles';

import {Container, Grid,Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Slider from "react-slick";
import AllProviderChild from './AllProviderChild';

const AllProvider = () => {
    const [providers, setProviders] = useState([])

    useEffect(() => {
        const api = `https://dry-sea-00611.herokuapp.com/users/providers`
        axios.get(api).then(res => {
            setProviders(res.data)
            console.log(res.data,"== got provider")
        })
    }, []);
    // mui item property 
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      // slick slider
    const slickSlider = {
        dots: false,
        infinite: false,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false
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
       <Container>
        <Box sx={{ width: '100%'  }} >
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>All Providers</Typography>
        {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
        <Slider {...slickSlider}>
        {providers.map((provider) => (
          <AllProviderChild
            key={provider._id}
            provider={provider}
          ></AllProviderChild>
        ))}
        </Slider>
         {/* </Grid> */}
      </Box>
       </Container>
    );
};

export default AllProvider;
