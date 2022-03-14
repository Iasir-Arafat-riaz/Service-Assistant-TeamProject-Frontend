import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';

const ContactForm = () => {

    // input style
    const inputStyle = {
        width: '90%',
        border: '2px solid #C2C8D7',
        padding: '12px',
        display: 'block',
        marginBottom: 10
        , borderRadius: '15px'
    };

    return (

        <Container sx={{ mt: 10 }}>

            <Typography variant='h4' sx={{ fontWeight: 'bold', letterSpacing: 2, textAlign: 'center', fontSize: '35px', mb: 5 }}>Contact Information</Typography>


            <Grid container spacing={2}>

                <Grid item md={1}></Grid>

                <Grid item md={5}>

                    <input style={inputStyle} type="text" placeholder='Name' />
                    <input style={inputStyle} type="number" placeholder='Number' />

                </Grid>


                <Grid item md={5}>

                    <input style={inputStyle} type="text" placeholder='Email' />
                    <input style={inputStyle} type="number" placeholder='Subject' />

                </Grid>

                <Grid item md={1}></Grid>
                <Grid item md={1} ></Grid>

                <Grid item md={10} >

                    <textarea
                        style={{ width: '95%', border: '2px solid #C2C8D7', borderRadius: '15px', padding: '12px', }}
                        placeholder='Message'
                        rows="8"
                    >
                    </textarea>

                    <Button variant='outlined' sx={{ letterSpacing: 2, px: 3, mt: 2, mb: 3, border: '2px solid #C2C8D7', color: 'black' }}>SEND</Button>

                </Grid>

                <Grid item md={1}></Grid>

            </Grid>

        </Container>

    );
};

export default ContactForm;