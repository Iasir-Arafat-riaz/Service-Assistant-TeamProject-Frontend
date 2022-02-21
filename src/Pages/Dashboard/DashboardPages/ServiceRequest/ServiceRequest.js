import { Box, CardActions, CardHeader, CardMedia, Grid, IconButton, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';
const ServiceRequest = () => {
    const [serviceRequest, setServiceRequest] = useState([]);

    useEffect(() => {
        axios.get('https://fierce-meadow-12011.herokuapp.com/singleservice')
            .then(res => {
                setServiceRequest(res.data)
            })
    }, []);
    return (
        <div>
            <Grid container spacing={2}>
            {
               serviceRequest?.map((request) => 
              
                <Grid item md={4}
                    sx={{
                        borderRadius: '10px',
                        boxShadow: '0 4px 21px -12px rgba(0, 0, 0, 0.66)',
                        backgroundColor: '#18151f23'
                    }}>

                    <CardMedia
                        sx={{ margin: '5px 0px 10px 0px' }}
                        component="img"
                        height="100px"
                        image={request.image}
                        alt="Service Image"
                    />

                    <CardHeader
                        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="Avatar">
                            {request.avatar}
                        </Avatar>
                        }
                        title={<Typography>Service: {request.service}</Typography>}
                        sx={{ m: "-18px 0px" }}
                    />
                    <CardActions disableSpacing sx={{}}>
                        <IconButton aria-label="Category">
                            <CategoryIcon /><Link to='/services' style={{ textDecoration: 'none' }}> <Typography sx={{ paddingLeft: 1 }}> AC Repair Services</Typography></Link>
                        </IconButton>
                        <IconButton aria-label="Payment" sx={{paddingLeft: "0px"}}>
                            <AttachMoneyIcon /> <Typography>{request.price} BDT</Typography>
                        </IconButton>

                        <IconButton aria-label="Delete" sx={{color:'red', paddingLeft: "0px"}}>
                            <DeleteIcon />
                        </IconButton>

                    </CardActions>
                </Grid>

               ) }
               </Grid>
        </div>

    );
};

export default ServiceRequest;