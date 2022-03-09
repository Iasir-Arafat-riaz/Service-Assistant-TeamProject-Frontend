import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { allData}  from '../../../redux/dataSlice/dataSlice'
import axios from 'axios'
// material ui card start 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, CardHeader } from '@mui/material';

const MyProfile = () => {
    const [profile, setProfile] = useState(null)
    const { user } = useSelector(allData);

    useEffect(() => {
        const api = `http://localhost:5000/users/${user.email}`
        axios.get(api).then(res => {
            console.log(res)
            setProfile(res.data)
            console.log(res.data,"== got user profile")
        })
    }, [user?.email]);
    
    return (
        <Card  sx={{width:"40%",  alignItems:"center",  justify:"center"}}>
        <CardMedia
          component="img"
          style={{width:"100%",marginX:"30%"}}
          height="250"
          image={profile?.image}
          alt="user background pic"
        />
        <Avatar
  alt={user.displayName}
  src={user.photoURL}
  sx={{ width: 50, height: 50, mt: -3, ml:2 }}
/>
        
        <CardContent>
       
          <Typography gutterBottom variant="h6" component="div">   
            {user.displayName} 
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {user.email} 
          </Typography>
  

          <Typography gutterBottom variant="h6" component="div">
            {user.role} 
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {user.name} 
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Update Information?
          </Typography>


        </CardContent>
        
        
          <>
 

</>
      </Card>
    );
};

export default MyProfile;