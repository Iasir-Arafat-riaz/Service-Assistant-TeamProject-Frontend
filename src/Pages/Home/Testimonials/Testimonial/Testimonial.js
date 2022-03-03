import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import Rating from '@mui/material/Rating';

const Testimonial = ({ testiominal }) => {

    const { name, image, description, rating, profession } = testiominal;

    return (


        <Paper elevation={2} sx={{ p: 3, width: 300, borderRadius: 2, m: '5px auto' }}>

            <RiDoubleQuotesL style={{ display: 'block', fontSize: 22, color: "#FF5E14" }} />

            <Typography variant='body' sx={{ lineHeight: 1.5, fontWeight: 400, color: "#7E7E7E" }} >
                {description.slice(0, 250)}
            </Typography> <br />

            <Rating name="read-only" sx={{ fontSize: 17, mt: 1 }} value={rating} readOnly />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar alt={name} src={image} sx={{ width: 70, height: 70, border: '2px solid #C7C7C7' }} />
            </Box>

            <Box sx={{ display: 'grid', justifyContent: 'center', }}>
                <Typography variant='h6' sx={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Typography>
                <Typography sx={{ color: "#64748B", fontSize: 14 }} variant='body2'>{profession}</Typography>
            </Box>

        </Paper>
    );
};

export default Testimonial;
