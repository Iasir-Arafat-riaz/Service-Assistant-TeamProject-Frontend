import { Button, Container, Grid, Paper, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import logo from '../../images/logo.png';
import React, { useEffect } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { VscCallOutgoing } from 'react-icons/vsc';
import './Contac.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../../styles/dark.css';

const Contact = () => {


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {

        axios.post('http://localhost:5000/sendEmail', data)
            .then(function (response) {
                console.log(response);
                console.log(data)
            })
    };








    const handleAddDarkMode = () => {
        const element = document.body;
        element.classList.toggle("dark");
    };


    return (
        <Container sx={{ mt: -25, mb: 10 }} style={{ zIndex: '+9999' }}>
            <Paper elevation={5} style={{ zIndex: '+9999' }}>


                <Button onClick={handleAddDarkMode} variant='contained'>Dark mode</Button>

                <Grid container spacing={2} style={{ zIndex: '+9999' }}>

                    <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #E8E8E8', display: 'flex', justifyContent: 'center' }}>

                        <Box sx={{ display: 'flex', alignItems: "center", gap: 1 }}>

                            <VscCallOutgoing style={{ fontSize: 25, color: '#FF5E14' }} />

                            <span>
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>8 800 567.890.11</Typography>
                                <Typography variant='body2'>Mon-Fri 9am-6pm</Typography>
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
                                <Button type='submit' sx={{ backgroundColor: '#FF5E14', width: '90%', mt: 2, mb: 3, color: '#fff', letterSpacing: 4 }} variant="contained">SEND</Button>
                            </Box>

                        </form>


                    </Grid>

                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }} >
                        <Box sx={{ display: 'flex', alignItems: "center", gap: 1 }}>
                            <img src={logo} alt="" />
                            <span>
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Melbourne, Australia</Typography>
                                <Typography variant='body2'> 795 South Park Avenue</Typography>
                            </span>
                        </Box>

                    </Grid>

                </Grid>
            </Paper>
        </Container>
    );
};

export default Contact;