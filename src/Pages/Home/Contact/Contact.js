import { Button, Container, Grid, Paper, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import logo from '../../images/logo.png';
import CoLogo from "../../images/web-logo.png"
import React, { useEffect } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { VscCallOutgoing } from 'react-icons/vsc';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Contact = () => {


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {

        axios.post('https://fierce-meadow-12011.herokuapp.com/sendEmail', data)
            .then(function (response) {
                console.log(response);
                console.log(data)
            })
    };

    return (
        <Container sx={{ mt: -25, mb: 10 }} style={{ zIndex: '+9999' }}>
            <Paper elevation={5} style={{ zIndex: '+9999' }}>

                <Grid container spacing={2} style={{ zIndex: '+9999' }}>

                    <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #E8E8E8', display: 'flex', justifyContent: 'center' }}>

                        <Box sx={{ display: 'flex', alignItems: "center", gap: 1 }}>

                            <VscCallOutgoing style={{ fontSize: 25, color: '#FF5E14' }} />

                            <span>
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>+8801622118833</Typography>
                                <Typography variant='body2'>24/7 Customer Support</Typography>
                            </span>

                        </Box>

                    </Grid>

                    <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #E8E8E8' }}>

                        <Typography sx={{ display: 'flex ', alignItems: "center", fontWeight: 'bold', gap: 1, pt: 3, pb: 2, justifyContent: 'center' }} variant="h6">  <HiOutlineMail /> serviceweb@gmail.com</Typography>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <Box sx={{ display: 'flex ', justifyContent: 'center' }}>
                                <TextField  {...register("name")} sx={{ width: '90%', mb: 2 }} id="outlined-basic" label="Name" variant="outlined" />
                            </Box>

                            <Box sx={{ display: 'flex ', justifyContent: 'center' }}>
                                <TextField  {...register("email")} sx={{ width: '90%', mb: 2 }} id="outlined-basic" label="Email" variant="outlined" />
                            </Box>

                            <Box sx={{ display: 'flex ', justifyContent: 'center' }}>
                                <TextField  {...register("message")} sx={{ width: '90%' }}
                                    multiline
                                    rows={2} id="outlined-basic" label="Message" variant="outlined" />
                            </Box>

                            <Box sx={{ display: 'flex ', justifyContent: 'center' }}>
                                <Button type='submit' style={{ backgroundColor: '#FF5E14', width: '90%', margin: '15px 0 25px 0', color: '#fff', letterSpacing: 4 }} >SEND</Button>
                            </Box>


                        </form>


                    </Grid>

                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }} >
                        <Box sx={{ display: 'flex', alignItems: "center", gap: 1 }}>
                        <img width={100} src={logo} alt="" />
                            <span>
                            
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Dhaka,Banladesh</Typography>
                                <Typography variant='body2'> City Center, Motijheel</Typography>
                            </span>
                        </Box>

                    </Grid>

                </Grid>
            </Paper>
        </Container>
    );
};

export default Contact;