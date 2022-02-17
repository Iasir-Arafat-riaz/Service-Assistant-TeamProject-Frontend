import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import RecentlyView from './RecentlyView';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';

const RecentlyViews = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://fierce-meadow-12011.herokuapp.com/services').then(res => {
            setServices(res.data.slice(5, 9))
            setLoading(false);
        })
    }, []);



    return (

        <Container sx={{ mb: 8 }}>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Recently View</Typography>

            {loading
                ?
                <Box sx={{ display: 'flex', gap: 3 }}>
                    {[...new Array(4)].map(() => <Stack spacing={1} >
                        <Skeleton variant="rectangular" width={250} sx={{ borderRadius: 2 }} height={185} />
                    </Stack>
                    )}
                </Box>
                :
                <Box sx={{ display: 'flex', gap: 5 }}>
                    {
                        services.map(service => <RecentlyView
                            key={service._id}
                            service={service}
                        />)
                    }
                </Box>}

        </Container>

    );
};

export default RecentlyViews;