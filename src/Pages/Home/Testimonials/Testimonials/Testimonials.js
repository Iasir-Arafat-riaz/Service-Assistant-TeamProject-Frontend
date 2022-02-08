import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './Style.css';
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper.min.css";
import Testimonial from "../Testimonial/Testimonial";
SwiperCore.use([Navigation, Pagination, Autoplay]);

const Testimonials = () => {

    const [testimonialData, setTestimonialData] = useState([]);
    const [reviewQuantity, setReviewQuantity] = useState(0);
    const [next, setNext] = useState(5);
    const postsPerPage = 6;

    const fetchProducts = (start, end) => {
        axios.get("/Testimonial.json")
            .then((res) => {
                setTestimonialData(res.data.slice(start, end))
                setReviewQuantity(res.data.length)
            });
    }
    useEffect(() => {
        fetchProducts(0, postsPerPage);
        document.getElementById('overlay').classList.add('overl')
    }, []);

    const handleLoadReviews = () => {
        fetchProducts(0, next + postsPerPage);
        setNext(next + postsPerPage)
        document.getElementById('overlay').classList.remove('overl');
    };
    const reloadREviews = () => {
        fetchProducts(0, postsPerPage);
        document.getElementById('overlay').classList.add('overl');
    };

    const buttonBox = {
        display: 'flex', justifyContent: 'center', width: '100%', mt: -20, mb: 20
    };
    const buttonStyle = {
        zIndex: '+33', background: "black"
    }

    return (
        <Container sx={{ mb: 20 }}>

            {/* testimonials  */}

            <Grid container spacing={2} sx={{ mb: 0, pb: 0 }}>

                {
                    testimonialData.map((testiominal) => (
                        <Testimonial testiominal={testiominal} />
                    ))
                }

                {testimonialData.length !== reviewQuantity ? <Box sx={buttonBox}>
                    <Button
                        onClick={handleLoadReviews}
                        sx={buttonStyle}
                        variant="contained">
                        See more...
                    </Button>

                </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button
                        onClick={reloadREviews}
                        sx={buttonStyle}
                        variant="contained">
                        Okay, I get the point
                    </Button>

                </Box>}

                <Box id="overlay"></Box>

            </Grid>





        </Container>
    );
};

export default Testimonials;
