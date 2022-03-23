import { Box } from '@mui/material';
import React from 'react';
import Footer from '../SharedRoute/Footer/Footer';
import Navigation from '../SharedRoute/Navigation/Navigation';

const Error = () => {
    return (
        <Box>
            <Navigation/>
            <h1>Error......Page Not Found 404</h1>
            <Footer/>
        </Box>
    );
};

export default Error;