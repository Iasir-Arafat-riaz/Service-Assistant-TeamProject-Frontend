import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom"

const RecentlyView = ({ Category, Img, Id }) => {
  const navigate = useNavigate()
  const handleRouteChange = () => {
    navigate(`/Home/service-details/${Id}`)
  };
  return (
    <Box onClick={handleRouteChange} sx={{ width: 250, p: 0, borderRadius: 3, mb: 1, mr: 3 }}>
      <Paper
        elevation={2}
        sx={{
          backgroundImage: `url(${Img})`,
          height: 185,
          backgroundSize: "cover",
          borderRadius: 3,
        }}
      ></Paper>

      <Typography
        variant="h6"
        sx={{ fontSize: 18, fontWeight: "bold", textAlign: "center", mt: 1 }}
      >
        {Category}
      </Typography>
    </Box>
  );
};

export default RecentlyView;
