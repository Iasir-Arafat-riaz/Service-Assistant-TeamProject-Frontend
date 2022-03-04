import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allData, getAllUser } from '../../../../../redux/dataSlice/dataSlice';
import SendIcon from '@mui/icons-material/Send';
const useStyles = makeStyles({
    root: {
        fontWeight: 600
    },
});

const AppointmentRequest = () => {


    const [providerEmail, setProviderEmail] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        axios.get(`https://fierce-meadow-12011.herokuapp.com/provider/appointment/kawsarm104@gmail.com`)
            .then(res => {
                setProviderEmail(res.data)
                console.log("provider email", res.data)
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
                        <Grid item md={6}>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography className={classes.root}>Service Name: {appointment.Name}</Typography>
                                        <Typography className={classes.root}>Price: {appointment.Price} BDT</Typography>
                                        <Typography className={classes.root}>Provider Name: {appointment.provider.displayName}</Typography>
                                        <Typography className={classes.root}>Payment Status: {appointment.payment.toString()}</Typography>
                                        {/* <Typography>Service Category:
                                            {appointment.parentService.Title}</Typography> */}
                                        <Typography className={classes.root}>Order Status: {appointment.status}</Typography>
                                        <Divider />
                                        <Typography className={classes.root}>Customer Information:</Typography>
                                        <Typography className={classes.root}>Customer Name: {appointment.orderInfo.name}</Typography>
                                        <Typography className={classes.root}>Contact: {appointment.orderInfo.number}</Typography>
                                        <Typography className={classes.root}>Address: {appointment.orderInfo.address}</Typography>
                                        <Button variant="outlined" color="error" endIcon={<SendIcon />}>Reply</Button>
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