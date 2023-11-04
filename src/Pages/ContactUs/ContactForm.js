import React, { useState } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { BsYoutube } from 'react-icons/bs';
import "./ContactForm.css"

import { Avatar, Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from "react-hook-form";
import Footer from '../SharedRoute/Footer/Footer';
import axios from 'axios';

const ContactForm = () => {


    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        setLoading(true);
        axios.post('https://service-assistant.adaptable.app//sendEmail', data)
            .then(function (response) {
                setLoading(false);
            })
    };

    // input style
    const inputStyle = {
        width: '90%',
        border: '2px solid #C2C8D7',
        padding: '12px',
        display: 'block',
        marginBottom: 10
        , borderRadius: '15px'
    };

    // avatar style
    const firstAvatar = {
        height: 66,
        width: 66,
        border: '3px solid #ffb600',
        visibility: { xs: "hidden", md: "visible" }
    }
    const secondAvatar = {
        height: 51,
        width: 51,
        border: '3px solid #ffb600',
        visibility: { xs: "hidden", md: "visible" }
    }
    const subButton = {
        letterSpacing: 2,
        padding: "5px 25px",
        border: '2px solid #C2C8D7',
        color: '#C2C8D7',
        marginTop: '15px'
    }

    

    return (
        <>

            <Container sx={{ mt: 10 }} className="contact_form">

                <Typography variant='h4' sx={{ fontWeight: 'bold', letterSpacing: 2, textAlign: 'center', fontSize: '35px', mb: 5, color: "#113849" }}>Contact Form</Typography>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Grid container spacing={2}>

                        <Grid item md={1}></Grid>

                        <Grid item xs={12} md={5}>

                            <input {...register("name", { required: true })} style={inputStyle} type="text" placeholder='Name' />
                            <input style={inputStyle} type="number" placeholder='Number' />

                        </Grid>


                        <Grid item xs={12} md={5}>

                            <input {...register("email", { required: true })} style={inputStyle} type="text" placeholder='Email' />
                            <input style={inputStyle} type="number" placeholder='Subject' />

                        </Grid>

                        <Grid item md={1}></Grid>
                        <Grid item md={1} ></Grid>

                        <Grid item md={10} xs={12}>

                            <textarea
                                {...register("message", { required: true })}
                                style={{ width: '95%', border: '2px solid #C2C8D7', borderRadius: '15px', padding: '12px', }}
                                placeholder='Message'
                                rows="8"
                            >
                            </textarea>

                            {
                                !loading
                                    ?
                                    <Button className='formSendBtn' type='submit' style={subButton} >SEND</Button>
                                    :
                                    <Button type='submit' style={subButton} >loading...</Button>
                            }

                        </Grid>

                        <Grid item md={1}></Grid>
                        <Grid item md={1}></Grid>

                        {/* people box */}





                        <Grid item md={10} sx={{ background: '#F8F5FF', borderRadius: 5, p: 4, zIndex: 9, mt: 10 }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', mt: -6 }}>

                                <Avatar sx={firstAvatar} alt="user image" src="https://i.ibb.co/vm49bq8/r-img3.png" />
                                <Avatar sx={firstAvatar} alt="Travis Howard" src="https://i.ibb.co/mFND2Sp/img2.png" />

                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 3 }}>

                                <Avatar sx={firstAvatar} alt="user image" src="https://i.ibb.co/QXhqJ82/r-img1.png" />

                                <Typography variant='h2' sx={{ fontWeight: 'bold', fontSize: '40px', textAlign: 'center' }}>
                                    Trusted by thousands of <br /> people all over the world
                                </Typography>

                                <Avatar sx={firstAvatar} alt="user image" src="https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859" />

                            </Box>


                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', mt: 4 }}>

                                <Avatar sx={secondAvatar} alt="user image" src="https://media.istockphoto.com/photos/young-handsome-man-with-beard-wearing-casual-sweater-standing-over-picture-id1212702108?k=20&m=1212702108&s=612x612&w=0&h=ZI4gKJi2d1dfi74yTljf4YhulA1nfhD3dcUFGH-NUkY=" />

                                <Box className="contactFormBox" sx={{ display: "flex", flexWrap: 'wrap', justifyContent: "center", columnGap: 5, rowGap: 3 }}>
                                    <Button className='socialMedia' style={{ background: "#1768D4", color: "#fff", padding: '8px 25px' }}> <a target="_blank" href="https://www.facebook.com/Service-A2Z-101461739182775" > <FaFacebookF style={{marginRight:"5px"}}/> Facebook </a>  </Button>

                                    <Button className='socialMedia' style={{ background: "#1EBCE9", color: "#fff", padding: '8px 25px', margin: '0 20px' }}> <a href="https://twitter.com/service_a2z_web"> <FaTwitter style={{marginRight:"5px"}}/>Twitter</a>   </Button>

                                    <Button className='socialMedia'   style={{ background: "#D63127", color: "#fff", padding: '8px 25px' }} > <a target="_blank" href="https://www.youtube.com/channel/UCRR0lgDJtkv7Hyikak8q01Q"><BsYoutube style={{marginRight:"5px"}} />Youtube </a> </Button>
                                </Box>

                                <Avatar sx={secondAvatar} alt="user image" src="https://i.ibb.co/0CHGDKx/img1.png" />

                            </Box>

                        </Grid>

                    </Grid>

                </form>




            </Container>


            {/* google map */}

            <Box>

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116834.00977805836!2d90.34928591682576!3d23.78077774431569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1647269650262!5m2!1sen!2sbd" width="100%" height="430" title='googlemap' style={{ border: 'none', marginTop: '-135px', zIndex: '-1000' }} allowfullscreen="" loading="lazy"></iframe>

            </Box>

            {/* footer */}
            <Footer />

        </>

    );
};

export default ContactForm;