import { Avatar, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import Rate from '@mui/material/Rating'
import { Box } from '@mui/system';
import { faker } from '@faker-js/faker';

const ServiceReviews = ({ service }) => {


    console.log(service);

    return (

        <>
            <Typography variant='h2'>{service.Rating}</Typography>
            <Rate name="read-only" value={service.Rating} readOnly />

            {
                service.Reviews.map((review, index) => <Box sx={{ display: 'flex', gap: 2, mt: 5 }} key={index}>
                    <Avatar>{review?.user?.slice(0, 1)}</Avatar>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 15 }}>{review.user === 'ID' ? faker.name.findName() : review.user}</Typography>

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