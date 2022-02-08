import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import Rating from "react-rating";

const Testimonial = ({ testiominal }) => {
  const { name, image, description, rating, profession } = testiominal;

  return (
    <Paper elevation={3} sx={{ p: 5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "center",
          pb: 2,
        }}
      >
        <img src={image} width="60" alt="" />
        <Box>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">{profession}</Typography>
        </Box>
      </Box>

      <Typography
        variant="body"
        sx={{ lineHeight: 1.5, fontWeight: 500, color: "#7E7E7E" }}
      >
        <ImQuotesLeft style={{ color: "#151414", fontSize: 22 }} />
        {description}
        <ImQuotesRight style={{ color: "#151414", fontSize: 22 }} />
      </Typography>

      <br />
      <Rating
        style={{ marginTop: 13, color: "#FF5E14" }}
        emptySymbol={<AiOutlineStar />}
        fullSymbol={<AiFillStar />}
        initialRating={`${rating}`}
        readonly
      />
    </Paper>
  );
};

export default Testimonial;
