import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    // border: '2px solid #fff',
    boxShadow: 24,
};

// box style
const box = {
    display: "flex", justifyContent: 'space-between', alignItems: 'center', px: 2, background: "#F4F5F8", mb: 4, pt: 1
};

const serviceOption = {
    mb: 3, display: "flex", justifyContent: 'space-between', borderBottom: '2px solid #F4F5F8', pb: 1, px: 2
}


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


                    <Box sx={{ display: 'flex', justifyContent: 'center', boxShadow: 3, mb: 3 }}>
                        <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 22, fontWeight: 'bold', p: 2 }} component="h2">
                            AC servicing
                        </Typography>
                    </Box>

                    <Grid container spacing={0}>

                        <Grid item xs={12} md={12} lg={7}>

                            <Box sx={box}>

                                <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 16, mb: 2 }} component="h2">
                                    {matchService?.Title}
                                </Typography>

                                <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 16, mb: 2 }} component="h2">
                                    {matchService?.Key.length} Options Avilable
                                </Typography>

                            </Box>

                            {
                                matchService?.Key.map(service => <Box sx={serviceOption}>

                                    <Box >
                                        <Typography variant='h6' sx={{ fontSize: 16, letterSpacing: 1, fontWeight: 'bold' }}>{service?.Name}</Typography>
                                        <Typography variant='body2' sx={{ fontSize: 15 }}>{service?.Price}Tk</Typography>
                                    </Box>
                                    <Button sx={{ borderColor: "#FF5E14", color: "#FF5E14" }} variant='outlined'>Add +</Button>

                                </Box>)
                            }

                        </Grid>

                        <Grid item xs={12} md={12} lg={5} sx={{ background: "#F4F5F8" }}>

                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <img src="https://i.ibb.co/yPxy136/Screenshot-11.png" alt="cartImagw" />
                            </Box>
                            <Button variant='contained' sx={{ letterSpacing: 2, width: '100%', p: 1, background: "#FFE7DC", boxShadow: 0, borderRadius: 0 }}>PROCEED TO CHECKOUT</Button>

                        </Grid>

                    </Grid>

                </Box>
            </Modal>

        </>
    );
};

export default CategoryModal;