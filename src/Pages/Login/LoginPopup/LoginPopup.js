import React from 'react';
import './LoginPopup.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import useFirebase from '../../../Hooks/useFirebase';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';

// 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '550',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2
};


const LoginPopup = ({ handleOpen, open, handleClose }) => {

    const { register, handleSubmit } = useForm();
    const { logInWithEmail } = useFirebase();
    const location = useLocation()
    const navigate = useNavigate()

    const onSubmit = data => {
        
        const info = { ...data, navigate: navigate, location: location, handleClose: handleClose }
        logInWithEmail(info);
    };


    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                {/* <Button onClick={handleClose} sx={{ mt: -5, position: 'absolute', zIndex: 999, }}><CloseIcon sx={{ boxShadow: 3, fontSize: 26, p: 1, borderRadius: '50%', backgroundColor: 'white', color: 'black' }} /></Button> */}

                <Box className="session login-popup">
                    <Box className="left">
                        <svg enable-background="new 0 0 300 302.5" version="1.1" viewBox="0 0 300 302.5" xmlns="http://www.w3.org/2000/svg">

                            <path className="st01" d="m126 302.2c-2.3 0.7-5.7 0.2-7.7-1.2l-105-71.6c-2-1.3-3.7-4.4-3.9-6.7l-9.4-126.7c-0.2-2.4 1.1-5.6 2.8-7.2l93.2-86.4c1.7-1.6 5.1-2.6 7.4-2.3l125.6 18.9c2.3 0.4 5.2 2.3 6.4 4.4l63.5 110.1c1.2 2 1.4 5.5 0.6 7.7l-46.4 118.3c-0.9 2.2-3.4 4.6-5.7 5.3l-121.4 37.4zm63.4-102.7c2.3-0.7 4.8-3.1 5.7-5.3l19.9-50.8c0.9-2.2 0.6-5.7-0.6-7.7l-27.3-47.3c-1.2-2-4.1-4-6.4-4.4l-53.9-8c-2.3-0.4-5.7 0.7-7.4 2.3l-40 37.1c-1.7 1.6-3 4.9-2.8 7.2l4.1 54.4c0.2 2.4 1.9 5.4 3.9 6.7l45.1 30.8c2 1.3 5.4 1.9 7.7 1.2l52-16.2z" />
                        </svg>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} className="log-in" autocomplete="off">
                        <h4>We are <span>Servicea2z</span></h4>
                        <p>Welcome back! Log in to your account to view today's clients:</p>
                        <Box className="floating-label">
                            <input  {...register("email", { required: true })} placeholder="Email" type="email" name="email" id="email" autocomplete="off" />
                            <label for="email">Email:</label>
                            <Box className="icon">

                                <svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

                                    <g transform="translate(0 -952.36)">
                                        <path d="m17.5 977c-1.3 0-2.4 1.1-2.4 2.4v45.9c0 1.3 1.1 2.4 2.4 2.4h64.9c1.3 0 2.4-1.1 2.4-2.4v-45.9c0-1.3-1.1-2.4-2.4-2.4h-64.9zm2.4 4.8h60.2v1.2l-30.1 22-30.1-22v-1.2zm0 7l28.7 21c0.8 0.6 2 0.6 2.8 0l28.7-21v34.1h-60.2v-34.1z" />
                                    </g>
                                    <rect className="st0" width="100" height="100" />
                                </svg>

                            </Box>
                        </Box>
                        <Box className="floating-label">
                            <input  {...register("password", { required: true })} placeholder="Password" type="password" name="password" id="password" autocomplete="off" />
                            <label for="password">Password:</label>
                            <Box className="icon">

                                <svg enable-background="new 0 0 24 24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                                    <rect className="st0" width="24" height="24" />
                                    <path className="st1" d="M19,21H5V9h14V21z M6,20h12V10H6V20z" />
                                    <path className="st1" d="M16.5,10h-1V7c0-1.9-1.6-3.5-3.5-3.5S8.5,5.1,8.5,7v3h-1V7c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5V10z" />
                                    <path className="st1" d="m12 16.5c-0.8 0-1.5-0.7-1.5-1.5s0.7-1.5 1.5-1.5 1.5 0.7 1.5 1.5-0.7 1.5-1.5 1.5zm0-2c-0.3 0-0.5 0.2-0.5 0.5s0.2 0.5 0.5 0.5 0.5-0.2 0.5-0.5-0.2-0.5-0.5-0.5z" />
                                </svg>
                            </Box>

                        </Box>
                        <button type="submit" >Log in</button>
                        <small>Don't have an account ?<Link to='/login' className="discrete"  > register </Link></small>
                    </form>
                </Box >
            </Box>
        </Modal >
    );
};

export default LoginPopup;