import * as React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Grid, IconButton } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

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
    console.log("card clicked");
    navigate(`/Home/service-details/${id}`);
  };
  return (
    <>
    
      <Grid item xs={12} sm={6} md={4} className={classes.root}>
        <Card sx={{}} className={classes.cardHeight}>
          <CardActionArea onClick={() => handleCardClick(Id)}>
            <CardMedia component="img" height="200px" image={Img} alt={Name} />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {Name.slice(0-23)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

    </>
  );
};

export default ServiceCard;
