import axios from 'axios';
import { CardActionArea, Typography, CardMedia, CardContent, Grid, Card, Stack, IconButton, Menu, MenuItem, Button, Checkbox } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { allData } from '../../../redux/dataSlice/dataSlice';
import SelectedServices from './SelectedServices/SelectedServices';

const SavedServices = () => {

    const [savedService, setSavedService] = useState([]);
    const { user } = useSelector(allData);
    const [loading, setLoading] = useState(true);
    const [checkInput, setCheckInput] = useState(false);



    // input checked
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    // const email = 'mahfujglobal@gmail.com'
    useEffect(() => {
        axios.post('https://dry-sea-00611.herokuapp.com/saveservice/jwttoken', localStorage.getItem('idToken'))
    }, [])
    useEffect(() => {
        setLoading(true)
        fetch(`https://dry-sea-00611.herokuapp.com/saveservice?email=${user.email}`).then(res => res.json()).then(data => {
            setSavedService(data);
            setLoading(false);
        })

    }, [user])


    // //console.log(localStorage.getItem('idToken'));
    if (loading) {
        return <h3>Loading...</h3>
    };

    const selectedService = [];


    const handleCheckInput = e => {
        setCheckInput(e.target.checked);
    };

    const handleAddService = service => {
        // if (!checkInput) {
        //     return;
        // } else {
        selectedService.push({ ...service, email: user.email });
        // }
        localStorage.setItem('selectedService', JSON.stringify(selectedService))
        // //console.log(selectedService);
    };


    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={12} md={8} lg={8}>


                    <Grid container>

                        {
                            savedService?.map((service, index) => <Grid item key={index} lg={4}>
                                <Card sx={{ maxWidth: 345, mb: 4 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={service?.parentService?.Image}
                                            alt="green iguana"
                                        />

                                        <CardContent>

                                            <Typography gutterBottom variant="h5" component="div">
                                                {service?.parentService?.Title}
                                            </Typography>

                                            <Typography sx={{ fontSize: 15, fontWeight: 'bold', mb: 1 }} variant="h6">Category: {service?.Name}</Typography>

                                            <Typography sx={{ fontSize: 15, fontWeight: 'bold' }} variant="h6">Price: {service?.Price} tk</Typography>



                                            <Checkbox onClick={() => handleAddService(service)} {...label} />



                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            )
                        }

                    </Grid>

                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                    <SelectedServices />
                </Grid>

            </Grid>
        </>
    );
};

export default SavedServices;