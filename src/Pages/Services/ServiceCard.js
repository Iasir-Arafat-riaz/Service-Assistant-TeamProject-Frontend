import * as React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { CardActionArea, Grid, CardContent, Card, Typography, CardMedia, Paper } from "@mui/material";
import { setItemInLocal } from "../../utils/utils";
import { Box } from "@mui/system";

const useStyles = makeStyles({
  root: {
    marginBottom: "50px",
    boxShadow: 2,
  },
  cardHeight: {
    display: "flex",
    flexDirection: "column",
    minHeight: "200px",
    justifyContent: "space-between",
  },
});

const ServiceCard = ({ Name, Img, Id }) => {

  const navigate = useNavigate();
  const classes = useStyles();

  const handleCardClick = (id) => {
    navigate(`/Home/service-details/${id}`);
    setItemInLocal({ Category: Name, Img, Id })
  };

  return (

    <>

      <Grid
        item xs={12} sm={6} md={4}
        onClick={() => handleCardClick(Id)}
        className={classes.root}
      >

        <Paper elevation={2} sx={{ width: { xs: '100%', md: '250px' }, borderRadius: 2 }}>

          <Box
            sx={{
              backgroundImage: `url(${Img})`,
              height: '150px', width: { xs: '100%', md: '250px' },
              backgroundSize: 'cover',
              borderRadius: 2
            }}>

          </Box>

        </Paper>

        <Typography sx={{
          color: 'rgba(0,0,0,.9)',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: 1.44,
          paddingBottom: '10px',
          textAlign: 'center',
          mt: 1,
        }} gutterBottom variant="h6" component="div">
          {Name.slice(0, 30)}
        </Typography>


      </Grid>

    </>
  );
};

export default ServiceCard;
