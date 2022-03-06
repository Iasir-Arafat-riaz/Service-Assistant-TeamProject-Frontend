import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, Paper, Rating } from '@mui/material';
import { RiDoubleQuotesL } from 'react-icons/ri';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    justifyContent: 'center',
};

const DemoTestimonialModal = ({ handleOpen, handleClose, open, testimonials, index }) => {

    // const { name, profession, description, rating } = testimonials[index];

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Paper elevation={3} sx={{ p: 3, width: 300, m: 1, borderRadius: 2 }}>

                        <RiDoubleQuotesL style={{ display: 'block', fontSize: 22, color: "#FF5E14" }} />

                        <Typography variant='body' sx={{ fontWeight: 400, color: "#7E7E7E", lineHeight: 1.5 }} >
                            {testimonials[index].description}
                        </Typography><br />

                        <Rating name="read-only" sx={{ fontSize: 17, mt: 1 }} value={testimonials[index].rating} readOnly />

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar alt={testimonials[index].name} src={testimonials[index].image} sx={{ width: 70, height: 70, border: '2px solid #C7C7C7' }} />
                        </Box>

                        <Box sx={{ display: 'grid', justifyContent: 'center', }}>

                            <Typography variant='h6' sx={{ fontSize: 18, fontWeight: 'bold' }}>{testimonials[index].name}</Typography>

                            <Typography sx={{ color: "#64748B", fontSize: 14 }} variant='body2'>{testimonials[index].profession}</Typography>

                        </Box>

                    </Paper>

                </Box>
            </Modal>
        </div>
    );
};

export default DemoTestimonialModal;