import { Alert, Button, Paper, Rating, TextField, Typography } from '@mui/material';
import { Box, fontWeight } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddTestimonial = () => {

    const [value, setValue] = React.useState(2);
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // submit form
    const onSubmit = data => {
        setLoading(false);
        setAlert(false)
        data.status = 'pending';
        data.rating = value;
        axios.post('https://fierce-meadow-12011.herokuapp.com/reviews', data).then(() => {
            // Swal.fire('Thank you for your review');
            setAlert(true);
            reset();
            setLoading(true)
        })
    };

    // input style
    const inputStyle = {
        width: '100%',
        mb: 3,
    };


    return (
        <>
            <Paper elevation={2} sx={{ px: 3, pt: 3, width: '47%' }}>

                <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2, fontSize: 21 }}>Your feedback</Typography>

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexWrap: 'wrap', columnGap: 20 }}>

                    <Box>
                        <TextField {...register("name", { required: true })} sx={inputStyle} id="outlined-basic" label="Your Name *" variant="outlined" />

                        <TextField {...register("profession", { required: true })} sx={inputStyle} id="outlined-basic" label="Your Profession *" variant="outlined" />


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
                    </Box>

                    <Box>
                        <TextField {...register("description", { required: true })} sx={inputStyle}
                            multiline
                            rows={5} id="outlined-basic" label="Your Message *" variant="outlined" />

                        {loading ?
                            <Button type='submit' sx={{ width: '100%', borderRadius: 0, mb: 2 }} variant='contained'>SUBMIT  </Button>
                            : <span>Loading...  </span>
                        }
                    </Box>

                </form>
                {
                    alert && <Alert severity="success" sx={{ fontStyle: 'italic' }}>Thank you for your review</Alert>
                }

            </Paper>

        </>
    );
};

export default AddTestimonial;