import { Box, Button, Container, Grid, MenuItem, Modal, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const areas = [
    {
        value: 'Mohammadpur',
    },
    {
        value: 'Kotwali',
    },
    {
        value: 'Gulshan',
    },
    {
        value: 'Mirpur',
    },
    {
        value: 'Khulshi',
    },
    {
        value: 'Badda',
    },
    {
        value: 'Munshiganj',
    },
    {
        value: 'Savar',
    },
    {
        value: 'Uttara',
    },
    {
        value: 'Halishahar',
    },
    {
        value: 'Potenga',
    },
];

const RequestService = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [area, setArea] = useState('');
    const handleChange = (event) => {
        setArea(event.target.value);
    };

    const onSubmit = data => {

        axios.post('https://dry-sea-00611.herokuapp.com/serviceReqEmail', data)
            .then(function (response) {


            })
    };

    return (
        < >
            <Paper elevation={2} sx={{
                borderRadius: 2,
                px: 3
            }} >
                <Container>
                    <Grid container>
                        <Grid
                            item
                            md={4}
                            sx={{ mt: -15, }}
                            style={{ zIndex: '+1' }}>
                            <img
                                style={{ paddingLeft: '20px' }}
                                width="70%"
                                height='100%'
                                src='https://i.ibb.co/PzqvrVR/cus-removebg-preview-1.png' alt='customer'
                            />
                        </Grid>
                        <Grid item
                            md={8}
                            sx={{ py: 2 }}>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: 25,
                                    my: 2
                                }}>
                                Can't find your desired service? Let us know 24/7 in 47952
                            </Typography>
                            <Stack spacing={2} direction="row">
                                <Button
                                    onClick={handleOpen}
                                    style={{ backgroundColor: "#FF5E14", }}
                                    sx={{
                                        borderRadius: 2,
                                        p: 2,
                                        fontWeight: 'bold',
                                        me: 5
                                    }}
                                    variant='contained'>
                                    Request for Service
                                </Button>
                                <Button
                                    style={{ borderColor: "#FF5E14", }}
                                    href='tel:+8801308979234'
                                    sx={{
                                        borderRadius: 2,
                                        py: 2,
                                        px: 5,
                                        fontWeight: 'bold'
                                    }}
                                    variant='outlined'>
                                    <CallIcon sx={{ pr: 1 }} /> 47952
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '70%',
                            bgcolor: '#F4F5F8',
                            boxShadow: 24,
                            pb: 4,
                            borderRadius: 5
                        }}
                    >

                        <Box sx={{ display: 'flex', justifyContent: 'center', boxShadow: 3, mb: 3, }}>

                            <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 22, fontWeight: 'bold', p: 2 }} component="h2">
                                Request for service
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <Box sx={{ display: 'flex ', justifyContent: 'center' }}>
                                {/* <TextField  {...register("name")} sx={{ width: '90%', mb: 2 }} id="outlined-basic" label="Name" variant="outlined" /> */}
                                <TextField
                                    {...register("area")}
                                    id="outlined-select-currency"
                                    select
                                    label="Please select your area"
                                    value={area}
                                    size="small"
                                    onChange={handleChange}
                                    sx={{ width: '80%', mb: 2 }}
                                >
                                    {areas.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </Box>

                            <Box sx={{ display: 'flex ', justifyContent: 'center' }}>
                                <TextField
                                    {...register("message")}
                                    sx={{ width: '80%', mb: 2 }}
                                    multiline
                                    rows={2}
                                    id="outlined-basic"
                                    label="What kind of service do you need?"
                                    variant="outlined"
                                    helperText="AC Repair, Refrigerator, Home Shift, Electric etc. "
                                />
                            </Box>

                            <Box sx={{ display: 'flex ', justifyContent: 'center' }}>

                                <TextField
                                    {...register("name")}
                                    sx={{ width: '40%', mb: 2, mr: 1 }}
                                    id="outlined-basic"
                                    label="Your Name"
                                    variant="outlined"
                                    size="small"
                                />

                                <TextField
                                    {...register("contact")}
                                    sx={{ width: '40%', mb: 2 }}
                                    id="outlined-basic"
                                    label="Contact Number"
                                    variant="outlined"
                                    size="small"
                                />

                            </Box>



                            <Box sx={{ display: 'flex ', justifyContent: 'center' }}>
                                <Button type='submit' style={{ backgroundColor: '#FF5E14', width: '50%', margin: '15px 0 25px 0', color: '#fff', letterSpacing: 4 }} >Request</Button>
                            </Box>


                        </form>
                    </Box>
                </Container>

            </Modal>
        </>
    );
};

export default RequestService;