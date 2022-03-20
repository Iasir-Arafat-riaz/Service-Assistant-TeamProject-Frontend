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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import UpdateMyProfile from './UpdateMyProfile';

const MyProfile = () => {
    const [profile, setProfile] = useState(null)
    const { user } = useSelector(allData);

    useEffect(() => {
        const api = `https://dry-sea-00611.herokuapp.com/users/${user.email}`
        axios.get(api).then(res => {
            console.log(res)
            setProfile(res.data)
            console.log(res.data,"== got user profile")
        })
    }, [user?.email]);

    // mui modal 
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid white',
    boxShadow: 24,
    p: 4,
  };
    
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
          
  

        
         
          <Typography gutterBottom variant="h6" component="p">
            <p onClick={handleOpen}>Update Information?</p>
          </Typography>


        </CardContent>
        
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <UpdateMyProfile email={user.email}></UpdateMyProfile>
        </Box>
      </Modal>
        
        
          <>
 

</>
      </Card>
    );
};

export default MyProfile;