import { Button, Grid, Paper, Stack, TextField } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";


const MakeAdmin = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack direction='column' elevation={2} >
                            <TextField type='email' sx={{ mb: 3 }} {...register("email")} label="Enter email" variant="standard" />
                            <Button type='submit' variant='contained'>Make Admin</Button>
                        </Stack>
                    </form>
                </Grid>
                <Grid item xs={12} md={6}>
                    <h2>Some Admin info</h2>
                </Grid>
            </Grid>


        </>
    );
};

export default MakeAdmin;