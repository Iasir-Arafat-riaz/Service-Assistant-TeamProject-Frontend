import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const ContactInfo = () => {

    const contactInfo = [
        {
            "icon": 'https://i.ibb.co/6HTPC31/mapicon.png',
            "name": "Mailing Address",
            "desc": "Dhaka,Banladesh City Center, Motijheel",
            "id": 1
        },
        {
            "icon": ' https://i.ibb.co/kBVvKKG/emailicon.png',
            "name": "Email Info",
            "desc": "servicea2zweb@gmail.com",
            "id": 2
        },
        {
            "icon": "https://i.ibb.co/JC6CwVT/phoneicon.png",
            "name": "Phone Number",
            "desc": "+8801622118833",
            "id": 3
        }
    ]

    return (
        <Container sx={{ mt: 10 }}>


            <Typography variant='h4' sx={{ fontWeight: 'bold', letterSpacing: 2, textAlign: 'center', color: "#113849", fontSize: '35px' }}>Contact Information</Typography>

            <Typography variant='body2' sx={{ textAlign: 'center', display: 'block', mb: 5, mt: 2 }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, officiis.</Typography>

            <Box container sx={{ columnGap: 5, display: { md: 'flex', xs: 'block' } }} className="contact_us">

                {
                    contactInfo.map(contact => <Grid item sx={{ boxShadow: 2, mb: 2, p: 2, borderRadius: 5, borderBottom: '2px solid #FF5E14', width: { md: 360, xs: "100%" } }} >

                        <Box sx={{ p: 2 }}>

                            <Box sx={{ height: 84, width: 84, borderRadius: '50%', backgroundColor: '#F5F6FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                <img src={contact.icon} height="50" width="50" alt="contactIcon" style={{ marginLeft: 50 }} />

                            </Box>

                            <Box>
                                <Typography sx={{ mt: 2, mb: 1, letterSpacing: 1, fontWeight: 'bold' }} variant='h6'>{contact.name}</Typography>

                                <Typography variant='body2'>{contact.desc}</Typography>
                            </Box>


                        </Box>

                    </Grid>

                    )
                }
            </Box>

        </Container>
    );
};

export default ContactInfo;