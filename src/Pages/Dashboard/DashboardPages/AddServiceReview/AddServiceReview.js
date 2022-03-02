import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Paper, Rating, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { allData } from '../../../../redux/dataSlice/dataSlice';
import { singleService } from '../../../../redux/dataSlice/dataSlice';

const AddServiceReview = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleServiceDetails, user } = useSelector(allData);
    const [value, setValue] = React.useState(0);
    const [openBox, setOpenBox] = useState(false);
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset } = useForm();


    useEffect(() => {
        dispatch(singleService());
    }, [dispatch]);


    // input style
    const inputStyle = {
        width: '100%',
        mb: 3,
    };


    const matchService = singleServiceDetails?.find(service => parseInt(service?.parentService) === parseInt(id));
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const matchReviews = matchService?.Reviews?.find(review => review?.id === user.uid);

    // submit form
    const onSubmit = data => {

        setLoading(false);

        if (!matchReviews) {
            axios.post(`http://localhost:5000/singleservice/addreview/${id}`, { ...data, rating: value, date, id: user.uid, serviceId: id }).then(() => {
                reset();
                setAlert(true);
                setLoading(true);
            });
        } else {
            // console.log(data);
            axios.put(`http://localhost:5000/singleservice/updatereview?parentId=${id}&&uid=${user.uid}`, { ...data, rating: value }).then(() => {
                reset();
            });
        }
    };

    // 


    // console.log(user);
    const handleEditService = () => {
        setAlert(false);
        setOpenBox(true);
    };


    // handle delete review;


    // console.log('first');


    return (
        <>

            {!matchReviews && <Paper elevation={2} sx={{ px: 3, pt: 3, width: '47%' }}>

                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2, fontSize: 21 }}>Write a review for {matchService?.Title}</Typography>

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: 'wrap', columnGap: 20 }}>

                    <Box sx={{ width: { xs: "100%", lg: '48%' } }}>

                        <TextField {...register("name", { required: true })} sx={inputStyle} id="outlined-basic" label="Your Name *" variant="outlined" />


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


            {
                matchReviews && <Paper sx={{ p: 2, width: 400 }} elevation={2}>

                    <Typography variant='h6'>Name:- {matchReviews.name}</Typography>
                    <Typography variant='body2' sx={{ mt: 1 }}>Review:- {matchReviews.review}</Typography>

                    <Typography variant='body2' sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                        Rating:-  <Rating name="read-only" sx={{ fontSize: 15 }} value={matchReviews.rating} readOnly />
                    </Typography>



                    <Box sx={{ mt: 2 }}>

                        <Button sx={{ mr: 2 }} variant='outlined' onClick={handleEditService}>EDIT</Button>
                        <Button variant='outlined'>DELETE</Button>

                    </Box>

                </Paper>
            }

            {
                openBox && <Paper elevation={3} sx={{ p: 2, width: 400, mt: 5 }} >

                    <Button onClick={() => setOpenBox(false)} sx={{ mt: -6, ml: -4 }}>
                        <CloseIcon
                            sx={{ boxShadow: 3, fontSize: 26, p: 1, borderRadius: '50%', backgroundColor: 'white', color: 'black' }}
                        />
                    </Button>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: 'wrap', columnGap: 20 }}>

                        <Typography variant='h6' sx={{ mb: 3, fontSize: 19, letterSpacing: 1 }}>Update your review.</Typography>

                        <Box sx={{ width: { xs: "100%" } }}>

                            <TextField {...register("name", { required: true })} sx={inputStyle} id="outlined-basic" label="Your Name *" variant="outlined" />


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

                        <Box sx={{ width: { xs: "100%" } }}>
                            <TextField {...register("review", { required: true })} sx={inputStyle}
                                multiline
                                rows={5} id="outlined-basic" label="Your Message *" variant="outlined" />

                            <Button type='submit' sx={{ width: '100%', borderRadius: 0, mb: 2, letterSpacing: 1 }} variant='outlined'>UPDATE  </Button>
                        </Box>

                        {/* {loading ?
        <Button type='submit' sx={{ width: '100%', borderRadius: 0, mb: 2 }} variant='outlined'>SUBMIT  </Button>
        : <span>Loading...  </span>
    } */}

                    </form>

                </Paper>
            }

        </>
    );
};

export default AddServiceReview;