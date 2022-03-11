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

    // let parentId; 

    // comment-out from riaz for data undefined
    // dispatch(reviewServiceIndex(index));
    //comment for id
    // dispatch(reviewServiceIndex(parseInt(index) + 1));
    // const data = { selectServiceId, email: user.email };
    // dispatch(parentServiceId(data));
    // //console.log(index)
    // const id = JSON?.parse(localStorage?.getItem("parentId"));
    localStorage.setItem('parentId', JSON.stringify(id))
    // parentId = selectServiceId

    // const matchService = singleServiceDetails?.find(service => parseInt(service?.parentService) === parseInt(parentId));
    // console.log(parentId)

    // console.log(parentId)
    // // dispatch(parentServiceId(parentId))
    // const matchReviews = matchService?.Reviews?.find(review => review?.id == user.uid);
    // console.log(matchReviews);
    // console.log(singleServiceDetails);

    // // //console.log(matchService.Reviews);
    // console.log(matchReviews)
    const handleOnload = id => {
        const matchService = singleServiceDetails?.find(service => parseInt(service?.parentService) === parseInt(id));
        console.log(matchService)
    }

    return (
        <>
            <Grid container spacing={2}>


                {
                    savedService?.map((service, index) => <Grid item key={index} xs={12} md={6} lg={4}>
                        <MyOrdersCard service={service}></MyOrdersCard>
                    </Grid>
                    )
                }

            </Grid>
            
        </>
    );
};

export default MyOrdersTable;