import { Button, Container, Grid, Paper, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import logo from '../../images/logo.png';
import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { VscCallOutgoing } from 'react-icons/vsc';

const Contact = () => {

    const handleSendEmail = async () => {




    }

    return (
        <Container sx={{ mt: -25, mb: 10 }} style={{ zIndex: '+9999' }}>
            <Paper elevation={5} style={{ zIndex: '+9999' }}>
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

                        <Typography sx={{ display: 'flex ', alignItems: "center", fontWeight: 'bold', gap: 1, pt: 3, pb: 2, justifyContent: 'center' }} variant="h6">  <HiOutlineMail /> service@gmail.com</Typography>

                        <TextField sx={{ width: '90%', mb: 2 }} id="outlined-basic" label="Name" variant="outlined" />
                        <TextField sx={{ width: '90%', mb: 2 }} id="outlined-basic" label="Email" variant="outlined" />

                        <TextField sx={{ width: '90%' }} id="outlined-basic" label="Message" variant="outlined" />

                        <Button onClick={handleSendEmail} sx={{ backgroundColor: '#FF5E14', width: '90%', mt: 2, mb: 3, color: '#fff', letterSpacing: 4 }} variant="contained">SEND</Button>

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