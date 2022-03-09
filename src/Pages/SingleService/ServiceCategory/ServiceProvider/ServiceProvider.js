import { Avatar, Button, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, allData, selectedServiceAndProvider, serviceProviders } from '../../../../redux/dataSlice/dataSlice';

const ServiceProvider = ({ handleNext, category, parentService, selectServiceId, selectService }) => {

    const dispatch = useDispatch();
    const { providers, serviceProviderLoading, user } = useSelector(allData);

    useEffect(() => {
        dispatch(serviceProviders());
    }, [dispatch])

    console.log(parentService)
    // style
    // console.log(parentService)

    const serviceProvider = {
        mb: 3,
        display: "flex",
        justifyContent: 'space-between',
        borderBottom: '2px solid #F4F5F8',
        pb: 1,
        px: 2
    };
    // //console.log(parentService)

    const selectServiceProvider = provider => {
        // dispatch(addToCart({ ...category, email: user.email, payment: true, provider: provider }))
        const { email } = provider;
        dispatch(selectedServiceAndProvider({ ...category, email: user.email, payment: true, providerEmail: email, parentService: selectService, selectServiceId: selectServiceId, status: 'pending' }))
        handleNext();
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
                            <Skeleton key={index} variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />

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
                                <Button onClick={() => selectServiceProvider(provider)} sx={{ borderColor: "#FF5E14", color: "#FF5E14" }} variant='outlined' >NEXT</Button>
                            </Box>
                            )
                        }
                    </Box>
            };
        </>
    );
};

export default ServiceProvider;