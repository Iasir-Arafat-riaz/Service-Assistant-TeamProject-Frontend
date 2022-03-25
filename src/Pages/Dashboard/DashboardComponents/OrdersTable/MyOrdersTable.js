import { CardActionArea, Typography, CardMedia, CardContent, Grid, Card, Avatar, Chip, Button, IconButton, Stack, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// comment-out from riaz for data undefined
import { allData, parentServiceId, reviewServiceIndex, singleService } from '../../../../redux/dataSlice/dataSlice';
// import { allData } from '../../../../redux/dataSlice/dataSlice';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MessageIcon from '@mui/icons-material/Message';
import { NavLink } from 'react-router-dom';
import Loading from '../../../SharedRoute/Loader/Loading';
import MyOrdersCard from '../MyOrdersCard/MyOrdersCard';

const MyOrdersTable = () => {

    // order 
    const [savedService, setSavedService] = useState([]);
    const { user, singleServiceDetails, id } = useSelector(allData);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(singleService());
    }, [dispatch])


    // data load
    useEffect(() => {
        setLoading(true)
        fetch(`https://dry-sea-00611.herokuapp.com/myorder?email=${user.email}`).then(res => res.json()).then(data => {
            setSavedService(data);
            setLoading(false);
        })

    }, [user])


    if (loading) {
        return <Loading></Loading>
    };

    const handleRouteChange = (selectServiceId, index, service) => {
        navigate(`/dashboard/review/${selectServiceId}`);
        dispatch(reviewServiceIndex(parseInt(index) + 1));
        const data = { selectServiceId, email: user.email, providerEmail: service.providerEmail };
        dispatch(parentServiceId(data));
    };


    if (savedService.length < 1) {
        return <Typography sx={{ fontSize: 22 }} gutterBottom variant="h5" component="div">
            There is no orders at this momemnt.
        </Typography>
    }


    return (
        <>
            <Grid container spacing={2}>


                {
                    savedService?.map((service, index) => <Grid item key={service._id} xs={12} md={6} lg={4}>

                        <MyOrdersCard service={service} index={index}></MyOrdersCard>
                    </Grid>
                    )
                }

            </Grid>

        </>
    );
};

export default MyOrdersTable;