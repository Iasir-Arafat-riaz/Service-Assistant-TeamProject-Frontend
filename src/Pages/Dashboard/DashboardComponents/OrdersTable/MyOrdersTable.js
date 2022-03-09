import { CardActionArea, Typography, CardMedia, CardContent, Grid, Card, Avatar, Chip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// comment-out from riaz for data undefined
import { allData, parentServiceId, reviewServiceIndex, singleService } from '../../../../redux/dataSlice/dataSlice';
// import { allData } from '../../../../redux/dataSlice/dataSlice';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
        fetch(`https://fierce-meadow-12011.herokuapp.com/myorder?email=${user.email}`).then(res => res.json()).then(data => {
            setSavedService(data);
            setLoading(false);
        })

    }, [user])


    if (loading) {
        return <h3>Loading...</h3>
    };

    // let parentId;
    // hanlde change route
    const handleRouteChange = (selectServiceId, index) => {

        navigate(`/dashboard/review/${selectServiceId}`);

        // comment-out from riaz for data undefined
        // dispatch(reviewServiceIndex(index));

        dispatch(reviewServiceIndex(parseInt(index) + 1));
        const data = { selectServiceId, email: user.email };
        dispatch(parentServiceId(data));
        // //console.log(index)
        // const id = JSON?.parse(localStorage?.getItem("parentId"));
        localStorage.setItem('parentId', JSON.stringify(id))
        // parentId = selectServiceId

    };
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

    // console.log(id)


    return (
        <>
            <Grid container spacing={2}>


                {
                    savedService?.map((service, index) => <Grid item key={index} xs={12} md={6} lg={4}>

                        <Card sx={{ maxWidth: 345, mb: 4 }}>

                            <CardActionArea>

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

                                    {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, border: '1px solid #d0d0d0', borderRadius: 6 }}>

                                        <Avatar alt="Remy Sharp" src={service.provider?.photoURL} />

                                        <Box>
                                            <Typography sx={{ fontSize: 15 }} variant="h6">{service?.provider?.displayName}</Typography>

                                            <Typography sx={{ fontSize: 13 }} variant="h6">{service?.provider?.email}</Typography>
                                        </Box>

                                    </Box> */}

                                    <Typography sx={{ fontSize: 15, fontWeight: 'bold', mt: 1 }} variant="h6">Order info -</Typography>


                                    <Box>
                                        <Typography sx={{ fontSize: 15 }} variant="h6">Name:- {service?.orderInfo?.name}</Typography>

                                        <Typography sx={{ fontSize: 15 }} variant="h6">Phone:- {service?.orderInfo?.number}</Typography>

                                        <Typography sx={{ fontSize: 15 }} variant="h6">Adress:- {service?.orderInfo?.address}</Typography>
                                    </Box>

                                    <span onClick={() => handleRouteChange(service.selectServiceId, index)} style={{ marginTop: 10, display: 'block', letterSpacing: 2, textDecoration: 'underline' }}>WRITE A REVIEW?</span>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    )
                }




            </Grid>
        </>
    );
};

export default MyOrdersTable;