import React from "react";
import Button from "@mui/material/Button";
import Navigation from "../SharedRoute/Navigation/Navigation";
const ContactUs = () => {
  return (
    <div>
      <Navigation />
      <div style={{ marginTop: "100px" }}>
        <h1>Contact Us</h1>
        <Button variant="contained">Hello World</Button>
      </div>
    </div>
  );
};

export default ContactUs;
