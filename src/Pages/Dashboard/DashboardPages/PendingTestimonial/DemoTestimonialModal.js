import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaQuoteLeft } from 'react-icons/fa';
import { FaQuoteRight } from 'react-icons/fa';
import { Avatar } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 3,
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Testimonial demo
                    </Typography>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {name}
                    </Typography> */}
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <FaQuoteLeft style={{ color: "#d8d8d8", marginRight: 5 }} />
                        {testimonials[index]?.description}
                        <FaQuoteRight style={{ color: "#d8d8d8", marginLeft: 4 }} />
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>

                        <Avatar sx={{ width: 50, height: 50 }} alt="Travis Howard" src={testimonials[index]?.image} />

                        <Box>
                            <Typography id="modal-modal-description">
                                {testimonials[index]?.name}
                            </Typography>
                            <Typography id="modal-modal-description">
                                {testimonials[index]?.profession}
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
};

export default DemoTestimonialModal;