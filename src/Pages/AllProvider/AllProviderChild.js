import React from "react";
// material ui card start
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, CardHeader } from "@mui/material";
import "./AllProvider.css";
import { Link } from "react-router-dom";

const AllProviderChild = (props) => {
  const {
    displayName,
    email,
    image,
    photoURL,
    role,
    rating,
    createdAt,
    uid,
    _id,
  } = props.provider;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const randomImage = () => {
    const urls = [
      "https://i.ibb.co/y5jq6XV/cardentingpainting.jpg",
      "https://i.ibb.co/j9Nv898/glass.jpg",
      "https://i.ibb.co/bBbvJMF/1617102282-unnamed.jpg",
      "https://i.ibb.co/Zhy4K3M/1613631861-Veneer-with-polish.jpg",
      "https://i.ibb.co/PCT5Mmp/manSalon.jpg",
    ];
    const i = Math.floor(Math.random()*5)
    return urls[i]
  };
  return (
    <Card sx={{ ml: 2 }} style={{ border: "none", boxShadow: "none" }}>
      <Box
        sx={{
          backgroundImage: `url(${
            image
              ? image
              : randomImage()
          })`,
          width: "100%",
          height: "200px",
          backgroundSize: "cover",
          objectFit: "cover",
        }}
      ></Box>
      <Box
        sx={{
          height: 50,
          width: 50,
          p: 0.5,
          ml: 2,
          mt: -3,
          zIndex: 5500,
          borderRadius: "50%",
          backgroundColor: "#fff",
        }}
      >
        <img
          src={photoURL}
          style={{ borderRadius: "50%", height: 50, width: 50 }}
          alt="prvodierImage"
        />
      </Box>

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {displayName}
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          <span
            style={{
              backgroundColor: "#ff7043",
              padding: "2px 5px",
              color: "white",
            }}
          >
            Featured
          </span>
          <span
            style={{
              backgroundColor: "#28a745",
              padding: "2px 5px",
              color: "white",
              marginLeft: "7px",
            }}
          >
            Verified
          </span>
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          <Rating name="read-only" value={rating} readOnly />
        </Typography>
        <Typography variant="h6" color="#363636" component="div">
          A Place Where We .....
        </Typography>
      </CardContent>

      <>
        <div></div>
      </>

      <Link
        to={`/dashboard/allprovider/${_id}`}
        title={`Click to view more details about ${displayName}`}
        style={{ textDecoration: "none" }}
      >
        <div style={{ display: "flex", justifyContent: "space-around", alignItems:"center" }}>
          <div>Manchester, UK</div>
          <div>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon onClick={handleClick}></MoreVertIcon>
                </IconButton>
              }
            />
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default AllProviderChild;
