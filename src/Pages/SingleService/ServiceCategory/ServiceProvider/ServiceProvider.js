import { Avatar, Button, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allData, serviceProviders } from '../../../../redux/dataSlice/dataSlice';

const ServiceProvider = ({ handleNext }) => {

    // const [providers, setProviders] = useState([]);
    const dispatch = useDispatch();
    const { providers, serviceProviderLoading } = useSelector(allData);

    useEffect(() => {
        dispatch(serviceProviders())
    }, [dispatch])

    // style
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
                serviceProviderLoading ?
                    <Box>
                        {[...new Array(3)].map((ske, index) => (
                            <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />

                        ))}
                    </Box>
                    :
                    <Box>
                        {
                            providers.map((provider, index) => <Box key={index} sx={[serviceProvider]}>

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
                    </Box>
            };
        </>
    );
};

export default ServiceProvider;