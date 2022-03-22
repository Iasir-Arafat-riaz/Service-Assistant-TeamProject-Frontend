import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const TestimonialUserCard = ({ name, image, description, rating, profession, value, index, handleClick }) => {

    return (
        <Box onClick={() => handleClick(index)} sx={{ width: '100%', transition: 'all .5s', borderRadius: 2, my: 2, boxShadow: value === index ? '0px 2px 22px #a6a6d26e' : '' }} >
            <Stack direction='row' alignItems="center" sx={{ px: 2, py: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Avatar alt={name} src={image}></Avatar>
                <Box ml={2} sx={{ display: { md: 'block', xs: 'none' } }}>
                    <Typography variant='h6' color='#717171'>{name}</Typography>
                    <Typography variant='body1' color="#a2a0b8">{profession}</Typography>

                </Box>
            </Stack>

        </Box>
    );
};

export default TestimonialUserCard;