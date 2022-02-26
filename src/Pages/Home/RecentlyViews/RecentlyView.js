import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const RecentlyView = ({ Name, Img }) => {
  return (
    <Box sx={{ width: 250, p: 0, borderRadius: 3, mb: 1 }}>
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
        {Name}
      </Typography>
    </Box>
  );
};

export default RecentlyView;
