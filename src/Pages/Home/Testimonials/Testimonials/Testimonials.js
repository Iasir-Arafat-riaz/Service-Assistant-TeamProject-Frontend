import { Button, Container, Grid, Typography, Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './Style.css';
// import "swiper/swiper.min.css";
import Testimonial from "../Testimonial/Testimonial";

const Testimonials = () => {

    const [testimonialData, setTestimonialData] = useState([]);
    const [reviewQuantity, setReviewQuantity] = useState(0);
    const [next, setNext] = useState(5);
    const postsPerPage = 6;
    const [loading, setLoading] = useState(true);

    const fetchProducts = (start, end) => {
        axios.get("https://fierce-meadow-12011.herokuapp.com/reviews")
            .then((res) => {
                setTestimonialData(res.data.slice(start, end))
                setReviewQuantity(res.data.length);
                setLoading(false);
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
    const reloadReviews = () => {
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

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Testimonials</Typography>

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
                        onClick={reloadReviews}
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
