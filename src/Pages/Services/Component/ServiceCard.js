import * as React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { CardActionArea } from "@mui/material";

const useStyles = makeStyles({
  root: {
    marginBottom: "20px",
    boxShadow: "none",
  },
  cardHeight: {
    display: "flex",
    flexDirection: "column",
    minHeight: "300px",
    justifyContent: "space-between",
  },
});

const ServiceCard = ({ Name, Img, Id }) => {
  const classes = useStyles();

  const handleCardClick = (id) => {
    console.log("card clicked");
  };
  return (
    <Grid item xs={12} sm={6} md={4} classes={classes.root}>
      <Card className={classes.cardHeight}>
        <CardActionArea onClick={() => handleCardClick(Id)}>
          <CardMedia component="img" height="200px" image={Img} alt={Name} />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {Name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ServiceCard;
