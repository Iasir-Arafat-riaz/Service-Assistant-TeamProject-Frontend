import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom"

const RecentlyView = (props) => {
  const { Category, Img, Id } = props.service
  const navigate = useNavigate()
  const handleRouteChange = () => {
    navigate(`/Home/service-details/${Id}`)
  };
  return (
    <Box onClick={handleRouteChange} sx={{ width: 250, p: 0, borderRadius: 3, mb: 1, mr: props.single ? 3 : 0, m: props.single ? 3 : '0 auto' }}>
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
