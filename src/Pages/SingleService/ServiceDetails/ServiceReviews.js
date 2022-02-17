import { Avatar, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import Rate from '@mui/material/Rating'
import { Box } from '@mui/system';

const ServiceReviews = ({ service }) => {

    const postsPerPage = 2;
    let start = 0;
    let end = postsPerPage;



    return (

        <>
            <Typography variant='h2'>{service.Rating}</Typography>
            <Rate name="read-only" value={service.Rating} readOnly />

            {
                service.Reviews.slice(start, end).map(review => <Box sx={{ display: 'flex', gap: 2, mt: 5 }}>
                    <Avatar>{review.user.slice(0, 1)}</Avatar>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 15 }}>{review.user} Mahfujur Rahman</Typography>

                        <Rate name="read-only" sx={{ fontSize: 16, mt: 1 }} value={review.rating} readOnly />

                        <Typography variant="body" sx={{ display: 'block', fontWeight: 500, color: "#8F8F8F", my: 1 }}>Taken on <b style={{ color: "black" }}>7 February, 2022</b></Typography>

                        <Typography variant="body" sx={{ display: 'block' }}>{review.review}</Typography>
                    </Box>

                </Box>)
            }
        </>
    );
};

export default ServiceReviews;