import React from 'react';
// material ui card start 
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import CardHeader from '@mui/material/CardHeader';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AllProviderChild = (props) => {
    const {displayName,email,image, photoURL, role,rating, createdAt,uid,_id} = props.provider
    return (
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
        {/* <CardActions className="d-flex justify-content-end"> */}
          {/* <Link to={`/dashboard/alladvocates/${_id}`} style={{ textDecoration: "none" }}>
            <Button size="small" className="">View Details</Button>
          </Link> */}
           <CardHeader
       
       action={
         <IconButton aria-label="settings">
           <MoreVertIcon />
         </IconButton>
       }
    
     />
        {/* </CardActions> */}
      </Card>
    );
};

export default AllProviderChild;
/*
<Card className="" >
          <CardMedia
            component="img"
            style={{width:"100%"}}
            height="250"
            image={image}
            alt="advocate pic"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {displayName} 
            </Typography>
            <Typography gutterBottom variant="p" component="div">
             Specialized In: {category}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
             Fees: {advocate?.fees} BDT
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {textArea?.split(' ').slice(0, 8).toString().replace(/,/g, ' space')}
            </Typography>
          </CardContent>
          <CardActions className="d-flex justify-content-end">
            <Link to={`/dashboard/alladvocates/${_id}`} style={{ textDecoration: "none" }}>
              <Button size="small" className="">View Details</Button>
            </Link>
          </CardActions>
        </Card>
        */