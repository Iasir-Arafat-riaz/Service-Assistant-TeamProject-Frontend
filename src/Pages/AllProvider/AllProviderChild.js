import React from 'react';
// material ui card start 
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, CardHeader } from '@mui/material';
import './AllProvider.css'
import { Link } from 'react-router-dom';

const AllProviderChild = (props) => {
    const {displayName,email,image, photoURL, role,rating, createdAt,uid,_id} = props.provider
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
    return (
      <Link to={`/dashboard/allprovider/${_id}`} title={`Click to view more details about ${displayName}`} style={{ textDecoration: "none" }}>
        <Card  sx={{ml:2}}>
        <CardMedia
          component="img"
          style={{width:"100%"}}
          height="250"
          image={image}
          alt="advocate pic"
        />
        <Avatar
  alt="Remy Sharp"
  src={photoURL}
  sx={{ width: 50, height: 50, mt: -3, ml:2 }}
/>
        
        <CardContent>
       
          <Typography gutterBottom variant="h6" component="div">
            {displayName} 
          </Typography>
          <Typography gutterBottom variant="p" component="div">
           <span style={{backgroundColor:"#ff7043", padding:2, color:"white"}}>Featured</span>
           <span style={{backgroundColor:"#28a745", padding:2, color:"white", marginLeft:"7px"}}>Verified</span>
          </Typography>
          <Typography gutterBottom variant="p" component="div">
          <Rating name="read-only" value={rating} readOnly />
          </Typography>
          <Typography  variant="h6" color="text.primary" component="div">
          A Place Where We Care Life
          </Typography>
        </CardContent>
        
        
          <>
          <div >
          
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ }}>
          <Box className="footer-social-icon" style={{display:"flex",padding:"5px",}}>
                            <span style={{color:"black",marginTop:"3px"}}> Share: </span>
                            <span style={{marginLeft:"3px",marginTop:"2px"}}>

                            <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                            <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                            <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                            </span>
                        </Box>
                        </Typography>
      </Popover>
    </div>

</>

   <CardHeader
           
       
       action={
         <IconButton aria-label="settings">
           <MoreVertIcon onClick={handleClick}>
        </MoreVertIcon>
         </IconButton>
       }
       
    
     />
     
      </Card>
</Link>
    );
};

export default AllProviderChild;
