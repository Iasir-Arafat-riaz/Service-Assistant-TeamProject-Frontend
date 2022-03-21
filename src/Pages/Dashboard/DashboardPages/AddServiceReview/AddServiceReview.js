import axios from 'axios';
import swal from 'sweetalert';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Grid, Paper, Rating, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { allData, parentServiceId } from '../../../../redux/dataSlice/dataSlice';
import { singleService } from '../../../../redux/dataSlice/dataSlice';

const AddServiceReview = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleServiceDetails, user, reviewIndex, providerEmail } = useSelector(allData);
    const [value, setValue] = React.useState(0);
    const [openBox, setOpenBox] = useState(false);
    const [alert, setAlert] = useState(false);
    const [updating, setUpdateing] = useState(false);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset } = useForm();
    const [deleting, setDeleting] = useState(false);


    useEffect(() => {
        dispatch(singleService());
    }, [dispatch, loading, updating, deleting, alert, reviewIndex]);


    // input style
    const inputStyle = {
        width: '100%',
        mb: 3,
    };



    // add review to user 

    const matchService = singleServiceDetails?.find(service => parseInt(service?.parentService) === parseInt(id));
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const matchReviews = matchService?.Reviews?.find(review => review?.id === user.uid);

    // submit form
    const onSubmit = data => {

        // setLoading(false);
        data.userPhoto = user.photoURL;

        if (!matchReviews) {
            setLoading(false);
            axios.post(`http://localhost:5000/singleservice/addreview/${id}`, { ...data, rating: value, date, id: user.uid, serviceId: id }).then(() => {
                reset();
                setAlert(true);
                setLoading(true);
                const { user, review, rating, date, uid, userPhoto } = data;
                axios.post(`http://localhost:5000/providerdetials/addreview?email=${providerEmail.providerEmail}`, { rating: value, date, uid: uid, serviceId: id, userName: user, userRating: rating, userComment: review, userPhoto, });
            });
        } else {
            UpdateReview(data);
        }
    };

    // 

    // //console.log(user);
    const handleEditService = () => {
        setAlert(false);
        setOpenBox(true);
    };


    // handle delete review;


    // //console.log('first');
    const UpdateReview = (data) => {
        setUpdateing(true);
        // useEffect(() => {
        axios.put(`http://localhost:5000/singleservice/updatereview?parentId=${id}&&uid=${user.uid}`, { ...data, rating: value }).then(() => {
            reset();
            setUpdateing(false);
        });
        // }, [updating])
    };
    // deleteReview
    const DeleteReview = () => {

        swal({
            title: "Are you sure you want to delete?",
            // text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:5000/singleservice/deleteReview?parentId=${id}&&uid=${user.uid}`).then(res => {
                        setDeleting(false);
                        swal("Your review is deleted!", {
                            icon: "success",
                        });
                    })

                }
            });

        setDeleting(true);
        // useEffect(() => {

        // }, [])

    }
    // //console.log(matchService?.allServices)

    return (
        <>

            {/* add review form */}
            {!matchReviews && <Paper elevation={2} sx={{ px: 3, pt: 3, width: '47%' }}>

                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2, fontSize: 21 }}>Write a review for {matchService?.allServices[reviewIndex]?.Title}</Typography>

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: 'wrap', columnGap: 20 }}>

                    <Box sx={{ width: { xs: "100%", lg: '48%' } }}>

                        <TextField {...register("user", { required: true })} sx={inputStyle} id="outlined-basic" label="Your Name *" variant="outlined" />


                        <Box sx={{ mb: 2, border: '1px solid #c4c4c4', p: 0.8, borderRadius: 1, pl: 1.5 }}>
                            <label style={{ color: "#666666", display: 'bolck' }}>Rating *</label> <br />
                            <Rating
                                sx={{ mt: 0.5 }}
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </Box>

                        {
                            alert && <Alert severity="success" sx={{ fontStyle: 'italic' }}>Thanks  for your review</Alert>
                        }

                    </Box>

                    <Box sx={{ width: { xs: "100%", lg: '48%' } }}>
                        <TextField {...register("review", { required: true })} sx={inputStyle}
                            multiline
                            rows={5} id="outlined-basic" label="Your Message *" variant="outlined" />

                        {
                            loading
                                ?
                                <Button type='submit' sx={{ width: '100%', borderRadius: 0, mb: 2 }} variant='outlined'>SUBMIT  </Button>
                                :
                                <Button type='submit' sx={{ width: '100%', borderRadius: 0, mb: 2 }} variant='outlined'>Loading...  </Button>
                        }
                    </Box>

                </form>


            </Paper>
            }

            {/* my review */}

            <Grid container spacing={2}>

                <Grid item md={6} lg={4} xs={12}>


                    {
                        matchReviews && <Paper sx={{ p: 2, mb: 3, width: { xs: 300, lg: 400 } }} elevation={2}>

                            <Typography variant='h6'>Name:- {matchReviews?.user}</Typography>
                            <Typography variant='body2' sx={{ mt: 1 }}>Review:- {matchReviews.review}</Typography>

                            <Typography variant='body2' sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                                Rating:-  <Rating name="read-only" sx={{ fontSize: 15 }} value={matchReviews.rating} readOnly />
                            </Typography>



                            <Box sx={{ mt: 2 }}>

                                <Button sx={{ mr: 2 }} variant='outlined' onClick={handleEditService}>EDIT</Button>
                                <Button onClick={DeleteReview} variant='outlined'>DELETE</Button>

                            </Box>

                        </Paper>
                    }
                </Grid>

                {/* update form */}
                <Grid item lg={6} md={6} xs={12}>
                    {
                        openBox && <Paper elevation={3} sx={{ p: 2, width: { xs: 300, lg: 400 } }}>

                            <Button onClick={() => setOpenBox(false)} sx={{ mt: -6, ml: -4 }}>
                                <CloseIcon
                                    sx={{ boxShadow: 3, fontSize: 26, p: 1, borderRadius: '50%', backgroundColor: 'white', color: 'black' }}
                                />
                            </Button>

                            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: 'wrap', columnGap: 20 }}>

                                <Typography variant='h6' sx={{ mb: 3, fontSize: 19, letterSpacing: 1 }}>Update your review.</Typography>

                                <Box sx={{ width: { xs: "100%" } }}>

                                    <TextField {...register("user", { required: true })} sx={inputStyle} id="outlined-basic" label="Your Name *" variant="outlined" />


                                    <Box sx={{ mb: 2, border: '1px solid #c4c4c4', p: 0.8, borderRadius: 1, pl: 1.5 }}>
                                        <label style={{ color: "#666666", display: 'bolck' }}>Rating *</label> <br />
                                        <Rating
                                            sx={{ mt: 0.5 }}
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                        />
                                    </Box>



                                </Box>

                                <Box sx={{ width: { xs: "100%" } }}>
                                    <TextField {...register("review", { required: true })} sx={inputStyle}
                                        multiline
                                        rows={5} id="outlined-basic"
                                        label="Your Message *" variant="outlined" />

                                    <Button type='submit' sx={{ width: '100%', borderRadius: 0, mb: 2, letterSpacing: 1 }} variant='outlined'>UPDATE</Button>
                                </Box>


                            </form>

                            {
                                alert && <Alert severity="success" sx={{ fontStyle: 'italic' }}>Your review updated</Alert>
                            }

                        </Paper>
                    }
                </Grid>
            </Grid>

        </>
    );
};

export default AddServiceReview;