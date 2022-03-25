import { CardActionArea, Typography, CardMedia, CardContent, Grid, Card, Avatar, Chip, Button, IconButton, Stack, Tooltip, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import MessageIcon from '@mui/icons-material/Message';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { allData, parentServiceId, reviewServiceIndex } from '../../../../redux/dataSlice/dataSlice';

const MyOrdersCard = ({ service, notShow, index }) => {

    const [getProvider, setGetProvider] = useState({});
    const [loading, setLoading] = useState(true);
    const { user, singleServiceDetails, id } = useSelector(allData);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleRouteChange = (selectServiceId, index, service) => {
        navigate(`/dashboard/review/${selectServiceId}`);
        dispatch(reviewServiceIndex(parseInt(index) + 1));
        const data = { selectServiceId, email: user.email, providerEmail: service.providerEmail };
        dispatch(parentServiceId(data));
    };


    useEffect(() => {
        setLoading(true)
        axios.get(`https://dry-sea-00611.herokuapp.com/provider/${service.providerEmail}`)
            .then(res => {
                setGetProvider(res.data);
                setLoading(false);
            })
    }, [])
    return (

        <Card sx={{ mb: 4, height: notShow ? 'initial' : '100%' }}>

            <CardMedia
                component="img"
                height="140"
                image={service?.parentService?.Image}
                alt="green iguana"
            />

            <CardContent>

                <Typography sx={{ fontSize: 22 }} gutterBottom variant="h5" component="div">
                    {service?.parentService?.Title}
                </Typography>

                <Typography sx={{ fontSize: 15, fontWeight: 'bold', mb: 1 }} variant="h6">Status: {service.status}</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Typography sx={{ fontSize: 15, fontWeight: 'bold', mb: 1 }} variant="h6">{service?.Name}</Typography>

                    <Typography sx={{ fontSize: 15, fontWeight: 'bold' }} variant="h6">Price: {service?.Price} tk</Typography>

                </Box>

                <Typography sx={{ fontSize: 15, fontWeight: 'bold' }} variant="h6">Service provider -</Typography>


                {
                    loading ? <Skeleton animation="wave" sx={{ height: 70 }} /> : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mt: 1, border: '1px solid #d0d0d0', borderRadius: 6 }}>
                        <Stack direction='row' alignItems='center'>
                            <Avatar alt="Remy Sharp" src={getProvider?.photoURL} />
                            <Stack sx={{ ml: 1 }}>
                                <Typography sx={{ fontSize: 15 }} variant="h6">{getProvider?.displayName}</Typography>
                                <Typography sx={{ fontSize: 13 }} variant="h6">{getProvider?.email}</Typography>
                            </Stack>
                        </Stack>
                        {
                            !notShow && service?.provider?.email !== service.email && <Tooltip title='Chat with this provider'><IconButton sx={{ mr: 2 }} component={NavLink} to={`/dashboard/ordersChat/${service._id}`} ><MessageIcon sx={{ color: '#ff5e14' }}></MessageIcon></IconButton></Tooltip>
                        }

                    </Box>
                }

                <Typography sx={{ fontSize: 15, fontWeight: 'bold', mt: 1 }} variant="h6">Order info -</Typography>


                <Box>
                    <Typography sx={{ fontSize: 15 }} variant="h6">Name:- {service?.orderInfo?.name}</Typography>

                    <Typography sx={{ fontSize: 15 }} variant="h6">Phone:- {service?.orderInfo?.number}</Typography>

                    <Typography sx={{ fontSize: 15 }} variant="h6">Adress:- {service?.orderInfo?.address}</Typography>
                </Box>

                <Button to={`/dashboard/review/${service.selectServiceId}`} onClick={() => handleRouteChange(service.selectServiceId, index, service)} style={{ marginTop: 10, display: 'block', letterSpacing: 2, textAlign: 'center' }} variant="outlined" color='warning'>WRITE A REVIEW?</Button>

            </CardContent>
        </Card>
    );
};

export default MyOrdersCard;