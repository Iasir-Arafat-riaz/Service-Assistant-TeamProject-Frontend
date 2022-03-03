import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import logo from "../../../Pages/images/web-logo.png"

const Loading = () => {

    return (

        <Box sx={{ width: '100%', height: '100vh', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <Box>
            <img width="300" src="https://cdn.dribbble.com/users/3148081/screenshots/6176842/rocket.gif" alt="loadergif" />
            <Typography style={{textAlign: "center",marginBottom:"10px"}} variant='h4'><i>Please Wait</i></Typography>
            <img style={{display: "block",marginLeft: "auto",marginRight:"auto"}} width="100" src={logo} alt="logo" />
            </Box>
            
            
        </Box>

    );
};

export default Loading;