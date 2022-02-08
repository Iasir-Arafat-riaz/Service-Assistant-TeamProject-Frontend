import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ImQuotesLeft } from 'react-icons/im';
import { ImQuotesRight } from 'react-icons/im';
import Rating from "react-rating";

const Testimonial = ({ testiominal }) => {

    const { name, image, description, rating, profession } = testiominal;

    return (

        <Grid item xs={4} sx={{ mb: 0, pb: 0 }}>

            <Paper elevation={0} sx={{ px: 2, pt: 2, mb: 0, height: 'auto', background: '#ff5e140a', borderRadius: 3 }}>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 2 }}>
                    <img src={image} width="60" alt="" />
                    <Box>
                        <Typography variant='h6'>{name}</Typography>
                        <Typography sx={{ color: "#64748B" }} variant='body2'>{profession}</Typography>
                    </Box>
                </Box>


                <Typography variant='body' sx={{ lineHeight: 1.5, color: "#334155" }} >
                    {description}
                </Typography>

                <br />
                <Rating
                    style={{ marginTop: 13, color: "#FF5E14", marginBottom: 5 }}
                    emptySymbol={<AiOutlineStar />}
                    fullSymbol={<AiFillStar />}
                    initialRating={`${rating}`}
                    readonly
                />

            </Paper>
        </Grid>
    );
};

export default Testimonial;