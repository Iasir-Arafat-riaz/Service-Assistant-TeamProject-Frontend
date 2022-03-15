import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import Rating from '@mui/material/Rating';

const Testimonial = ({ name, image, description, rating, profession }) => {
    return (
        <Box >
            <Box sx={{ mb: 4 }}>
                <Typography variant='h6' sx={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Typography>
                <Rating name="read-only" sx={{ fontSize: 17, mt: 1 }} value={rating} readOnly />
            </Box>

            <Typography variant='h6' sx={{ lineHeight: 1.5, fontWeight: 400, color: "#7E7E7E", display: { md: 'block', xs: 'none' } }} >
                {description}
            </Typography>
            <Typography variant='h6' sx={{ lineHeight: 1.5, fontWeight: 400, color: "#7E7E7E", display: { md: 'none', xs: 'block' } }} >
                {description.slice(0, 200)}
            </Typography>


        </Box>
    );
};

export default Testimonial;
