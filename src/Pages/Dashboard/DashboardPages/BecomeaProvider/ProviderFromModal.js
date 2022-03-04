import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { allData } from '../../../../redux/dataSlice/dataSlice';
import axios from 'axios';

// modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', md: 400 },
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    // p: 2
};

const ProviderFromModal = ({ handleOpenModal, open, handleCloseModal, id, category }) => {


    const { user } = useSelector(allData);
    const { register, handleSubmit, reset } = useForm();

    // input style
    const inputStyle = {
        width: '100%',
        mb: 2,
    };



    // submit form
    const onSubmit = data => {
        axios.post('https://fierce-meadow-12011.herokuapp.com/provider', { ...category, data, image: user.photoURL }).then(() => {
            reset();
            handleCloseModal();
        })
    };



    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" sx={{ mb: 0, boxShadow: 3, p: 1, textAlign: 'center' }} component="h2">
                        Please give this information
                    </Typography>

                    <Button onClick={handleCloseModal} sx={{ mt: -16, ml: -4 }}><CloseIcon sx={{ boxShadow: 3, fontSize: 26, p: 1, borderRadius: '50%', backgroundColor: 'white', color: 'black' }} /></Button>

                    <Box sx={{ p: 2 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <TextField sx={inputStyle} id="outlined-basic" label="Name *" variant="outlined" {...register("name", { required: true })} />

                            <TextField type="number" sx={inputStyle} id="outlined-basic" label="Phone number *" variant="outlined" {...register("number", { required: true })} />

                            <TextField sx={inputStyle}
                                {...register("email", { required: true })}
                                id="outlined-error"
                                label="Email"
                                defaultValue={user.email}
                            />




                            <TextField sx={inputStyle} id="outlined-basic" label="Your address where you available for deliver *" variant="outlined" {...register("address", { required: true })} />

                            <TextField sx={inputStyle} id="outlined-multiline-static"
                                label="Why do you want to join this service as a provider *"
                                multiline
                                rows={3} {...register("qanswer", { required: true })} />


                            <Button type='submit' variant='outlined' sx={{ letterSpacing: 2, width: '100%' }}>SUBMIT</Button>

                        </form>

                    </Box>

                </Box>
            </Modal>
        </>
    );
};

export default ProviderFromModal;