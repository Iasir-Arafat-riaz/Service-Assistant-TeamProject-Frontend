import React from "react";
// material ui card start
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, } from "@mui/material";
import "./AllProvider.css";
import { Link, useNavigate } from "react-router-dom";

const AllProviderChild = (props) => {
  const {
    Logo,
    LogoImg,
    ShopName,
    about,
    address,
    backgroundImage,
    bio,
    date,
    email,
    number,
    offerService,
    providerId,
    reviewUser,
    reviews,
    userName,
    AvgRating,
    _id
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
    const i = Math.floor(Math.random() * 5)
    return urls[i]
  };

  const navigate = useNavigate();

  const handleSeeDetails = id => {
    navigate(`/home/providerProfile/${id}`)
  };

  return (
    <Card sx={{ ml: 2 }} onClick={() => handleSeeDetails(_id)} style={{ border: "none", boxShadow: "none", cursor: 'pointer' }}>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
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
        <Avatar
          src={Logo}
          sx={{ borderRadius: "50%", height: 50, width: 50 }}
          alt="prvodierImage"
        />
      </Box>

      <CardContent sx={{ pt: 0 }}>

        <Typography gutterBottom variant="p" component="div">
          <span
            style={{
              backgroundColor: "#ff7043",
              padding: "2px 5px",
              color: "white",
              fontSize: '12px'

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
              fontSize: '12px'

            }}
          >
            Verified
          </span>
        </Typography>
        <Typography variant="body2" color="#363636" fontSize={12} >
          <span style={{ color: '#55acee' }}>{ShopName}</span>
        </Typography>
        <Typography variant="h6" color="#363636" fontSize={16} component="div">
          {bio.slice(0, 25)}
        </Typography>
        <Typography gutterBottom variant="p" component="div" sx={{ display: 'flex', alignItems: 'center', }}>
          <Rating name="read-only" value={parseFloat(AvgRating)} readOnly />
          <span style={{ color: '#767676', fontSize: '11px', marginLeft: '4px' }}>({reviewUser} Feedback)</span>
        </Typography>
        <Typography variant="p" color="#363636" fontSize={14} component="div">
          By <span style={{ color: '#55acee' }}>{userName}</span>
        </Typography>

      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, }}>
        <p style={{ fontSize: '14px' }}>{address}</p>
      </Box>
    </Card >
  );
};

export default AllProviderChild;
