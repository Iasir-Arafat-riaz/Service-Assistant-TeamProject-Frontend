import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, Divider, Grid, Typography, Box, Chip } from '@mui/material';
import { red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allData, getAllUser } from '../../../../../redux/dataSlice/dataSlice';
import SendIcon from '@mui/icons-material/Send';
const useStyles = makeStyles({
    root: {
        fontWeight: 600,
        marginBottom: '7px'
    },

});

const AppointmentRequest = () => {


    const [providerEmail, setProviderEmail] = useState([]);
    const classes = useStyles();
    const { user } = useSelector(allData)

    useEffect(() => {
        axios.get(`https://dry-sea-00611.herokuapp.com/provider/appointment/naimurrhman53@gmail.com`)
            .then(res => {
                setProviderEmail(res.data)
                
            })
    }, []);

    return (
        <div>
            <Grid container spacing={2}>
                {
                    providerEmail?.map(appointment =>
                        // <AppointmentDetails
                        // key={appointment._id}
                        // appointment={appointment}
                        // >

                        // </AppointmentDetails>
                        
                        <Grid item xs={12} md={4} lg={4}>
                            <Card sx={{mb: 3}}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', boxShadow: 3, }}>

                                    <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 'bold', p: 1 }}>
                                        Service Information
                                    </Typography>
                                </Box>

                                <CardActionArea>
                                    <CardContent>
                                        <Typography className={classes.root}>Service Name: {appointment.Name}</Typography>
                                        <Typography className={classes.root}>Price:  <Chip label={appointment.Price} size="small" variant="outlined" /></Typography>
                                        <Typography className={classes.root}>Payment Status: <Chip label={appointment.payment?.toString()} size="small" variant="outlined" /></Typography>
                                        {/* <Typography>Service Category:
                                            {appointment.parentService.Title}</Typography> */}
                                        <Typography className={classes.root}>Order Status: <Chip label={appointment.status} size="small" variant="outlined" /></Typography>
                                        <Divider />
                                        <Typography className={classes.root} sx={{ textAlign: 'center' }}>Customer Information</Typography>
                                        <Typography className={classes.root}>Customer: <span>{appointment.orderInfo.name}</span></Typography>
                                        <Typography className={classes.root}>Contact:  <Chip label={appointment.orderInfo.number} size="small" variant="outlined" /></Typography>
                                        <Typography className={classes.root}>Address: <span>{appointment.orderInfo.address}</span></Typography>
                                        <Typography className={classes.root}>Order Date: <span>{new Date(appointment?.date).toLocaleDateString()}</span></Typography>
                                        
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    );
};

export default AppointmentRequest;