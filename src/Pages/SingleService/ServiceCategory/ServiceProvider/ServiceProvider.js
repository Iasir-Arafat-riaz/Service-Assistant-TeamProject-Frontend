import { Avatar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect } from 'react';

const ServiceProvider = ({ handleNext }) => {
    const providers = [
        {
            name: 'kawsar',
            email: 'kawsarm104@gmail.com',
            password: 'service',
            role: 'user',
            createdAt: '1645690649685',
            displayName: 'Md Kawsar',
            photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GjQhgXpkTzuLXMI9vHQXhYMRHdyE3rsopoAvzq6CQ=s96-c',
            uid: 'HiDht97flTVPouFTWmFyjJ2x5dM2'
        },
        {
            email: 'naimurrhman53@gmail.com',
            createdAt: '1645333357723',
            displayName: 'Naimur Rahman',
            photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GiqAW3VCdrs-R44UCqrFdrW3GsVAluTP4NUZBb-EQ=s96-c',
            uid: 'P0XLyOGb5jS75dAe3AavyhLqigH3',
            role: 'admin'
        }
    ]
    useEffect(() => {
        axios.get('http://localhost:5000/users/finding/ids', {
            params: {
                data: [
                    "62121eb1cef8c7b4915a6923",
                    "6211cbf6bb809e9e3edb1859"
                ]
            }
        }).then(res => {
            console.log(res.data)
        })
    }, [])

    const serviceProvider = {
        mb: 3,
        display: "flex",
        justifyContent: 'space-between',
        borderBottom: '2px solid #F4F5F8',
        pb: 1,
        px: 2
    };

    return (

        <>

            <Box sx={{
                display: "flex",
                justifyContent: 'space-between',
                alignItems: 'center',
                background: "#F4F5F8",
                mb: 4,
                p: 2,
                fontSize: 16, letterSpacing: 1
            }} >Select a service provider</Box>

            {
                providers.map((provider, index) => <Box sx={[serviceProvider]}>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 50, height: 50 }} alt="Cindy Baker" src={provider.photoURL} />
                        <Box>
                            <Typography variant='h6' sx={{ fontSize: 16, letterSpacing: 1, fontWeight: 'bold' }}>{provider?.displayName}</Typography>

                            <Typography variant='body2' sx={{ fontSize: 15 }}>{provider?.email}</Typography>
                        </Box>

                    </Box>
                    <Button onClick={handleNext} sx={{ borderColor: "#FF5E14", color: "#FF5E14" }} variant='outlined' >NEXT</Button>

                </Box>
                )
            }
        </>
    );
};

export default ServiceProvider;