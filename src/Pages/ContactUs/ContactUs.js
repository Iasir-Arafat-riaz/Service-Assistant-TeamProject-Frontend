import React from "react";
import Button from "@mui/material/Button";
import Navigation from "../SharedRoute/Navigation/Navigation";
import Contact from "../Home/Contact/Contact";
import { Box } from "@mui/system";
const ContactUs = () => {
  return (
    <Box>
      <Navigation />
      <div style={{ marginTop: "300px" }}>
       
        <Contact/>
      </div>
    </Box>
  );
};

export default ContactUs;
