import { Box } from '@mui/material';
import React from 'react';
import Footer from '../SharedRoute/Footer/Footer';
import Navigation from '../SharedRoute/Navigation/Navigation';

const Error = () => {
    return (
        <Box >
            <Navigation/>
           
            <Box sx={{
              backgroundImage:
                "url(https://i.ibb.co/2Pyfkp7/Free-Download-Gray-Wallpaper-Computer-1.png)",
              height: "calc(100vh)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}>

            </Box>
            <Footer/>
        </Box>
    );
};

export default Error;