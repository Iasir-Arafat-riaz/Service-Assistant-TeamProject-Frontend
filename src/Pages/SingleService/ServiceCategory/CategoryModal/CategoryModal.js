import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

const CategoryModal = ({ open, handleOpen, handleClose, index, service }) => {

    const matchService = service?.allServices[index];

    return (

        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>


                    <Grid container spacing={2}>
                        <Grid item xs={7}>

                            <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 19, mb: 2 }} component="h2">
                                    {matchService?.Title}
                                </Typography>

                                <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 15, mb: 2, color: "#EEEEF4" }} component="h2">
                                    {matchService?.Key.length} Options Avilable
                                </Typography>

                            </Box>

                            {
                                matchService?.Key.map(service => <Box sx={{ mb: 2, display: "flex", justifyContent: 'space-between', borderBottom: '2px solid #F4F5F8', pb: 1 }}>
                                    <Box >
                                        <Typography variant='h6' sx={{ fontSize: 16, letterSpacing: 1, fontWeight: 'bold' }}>{service?.Name}</Typography>
                                        <Typography variant='body2' sx={{ fontSize: 15 }}>{service?.Price}Tk</Typography>
                                    </Box>
                                    <Button sx={{ borderColor: "#FF5E14", color: "#FF5E14" }} variant='outlined'>Add +</Button>

                                </Box>)
                            }

                        </Grid>

                        <Grid item xs={5}>
                        </Grid>

                    </Grid>

                </Box>
            </Modal>

        </>
    );
};

export default CategoryModal;