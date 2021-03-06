import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Loading = () => {

    return (

        <Box sx={{ width: '100%', height: '100vh', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <Box>
                <img width="300" src="https://cdn.dribbble.com/users/3148081/screenshots/6176842/rocket.gif" alt="loadergif" />
                <Typography style={{ textAlign: "center", marginBottom: "10px" }} variant='h4'>Please Wait</Typography>
                <img style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} width="100" src='https://i.ibb.co/n8Wp01q/web-logo.png' alt="logo" />
            </Box>


        </Box>

    );
};

export default Loading;