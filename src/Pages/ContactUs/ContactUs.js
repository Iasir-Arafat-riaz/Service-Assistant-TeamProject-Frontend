import React from "react";
import Navigation from "../SharedRoute/Navigation/Navigation";
import Contact from "../Home/Contact/Contact";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
const ContactUs = () => {


  return (

    <>

      <Navigation />

      <Box
        sx={{
          backgroundImage: `url(https://i.ibb.co/YP95Zjt/contact-us-banner.jpg)`,
          height: '50vh',
          objectFit: 'cover',
          backgroundSize: 'cover'
        }}
      >
      </Box>

      {/* contact info */}
      <ContactInfo />
      {/* contact form */}
      <ContactForm />



    </>

  );
};

export default ContactUs;
