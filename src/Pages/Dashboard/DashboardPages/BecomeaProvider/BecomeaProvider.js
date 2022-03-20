import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allData, loadServiceCategory } from '../../../../redux/dataSlice/dataSlice';
import Service from './Service';

const BecomeaProvider = () => {

    // data loaded

    const dispatch = useDispatch();
    const { allServices, serviceIsLoading } = useSelector(allData);

    useEffect(() => {
        dispatch(loadServiceCategory());
    }, [dispatch]);

    if (serviceIsLoading) {
        return <Typography variant='h6'>Loading...</Typography>
    }

    return (
        <>


            {
                allServices.map((service) => {

                    return (
                        <>
                            <Typography sx={{ pb: 3, pt: 4 }} variant="h5" gutterBottom component="div">{service.Category}</Typography>

                            <Grid
                                container
                                spacing={2}
                            >

                                {
                                    service.Services.map((category, index) => (
                                        <Service
                                            key={index}
                                            category={category}
                                        />
                                    ))}

                            </Grid>
                        </>
                    )
                })
            }



        </>
    );
};

export default BecomeaProvider;