import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addOrderInfo, allData } from '../../../../redux/dataSlice/dataSlice';

const OrderInfo = ({ handleNext }) => {


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const onSubmit = data => {
        dispatch(addOrderInfo(data));
        handleNext();
    };

    // input style
    const textField = {
        width: '100%',
        mb: 2
    };

    return (
        <form style={{ padding: 15 }} onSubmit={handleSubmit(onSubmit)}>

            <TextField sx={textField} id="outlined-basic" label="Name" variant="outlined"  {...register("name", { required: true })} />

            <TextField sx={textField} id="outlined-basic" label="Phone Number" variant="outlined" {...register("number", { required: true })} />

            <TextField sx={textField}
                {...register("address", { required: true })}
                id="outlined-multiline-static"
                label="Address"
                multiline
                rows={3}
            />

            <Button
                type='submit'
                style={{ borderRadius: 0, width: '100%', background: "#F48755", letterSpacing: 2 }}
                // onClick={handleNext}
                variant="contained"
            >
                NEXT
            </Button>


        </form>
    );
};

export default OrderInfo;