import { Box, Button, Grid, IconButton, Menu, MenuItem, Paper, Popover, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeRole, makeAdmin } from '../../../../redux/dataSlice/dataSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './UserCard.css'
const UserCard = props => {
    const { displayName, _id, email, photoURL, role } = props.data;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const handleMakeAdmin = () => {
        if (window.confirm(`Are you sure to make ${email} admin? `)) {
            dispatch(makeAdmin({ role: 'admin', email }))
            dispatch(changeRole({ email, role: 'admin' }))
        }
    }
    const handleRemoveAdmin = () => {
        if (window.confirm(`Are you sure to remove ${email} as admin? `)) {
            dispatch(makeAdmin({ role: 'user', email }))
            dispatch(changeRole({ email, role: 'user' }))
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (
        <Grid item xs={12} lg={4} md={6}>
            <Paper component={Stack} sx={{ height: 'auto' }} direction='row' justifyContent='space-between' elevation={2}>
                <Stack direction='row'>
                    <Box  >
                        <img className='user-img' src={photoURL} alt={displayName} />
                    </Box>
                    <Box ml={2} sx={{ pb: 3 }}>
                        <Typography variant='h6'>{displayName}</Typography>
                        <Typography variant='small' component={'h5'} gutterBottom>{email}</Typography>
                        {
                            role === 'admin' ? <span className='admin-span'>Admin</span> : role === 'provider' ? <span className='provider-span'> Provider</span> : <span className='client-span'> User</span>
                        }
                    </Box>
                </Stack>
                <Stack alignItems='center' justifyContent='center'>
                    <IconButton onClick={handleClick} id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                </Stack>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        role === 'admin' ? <MenuItem onClick={handleClose}><Button sx={{ width: '100%', mt: .5, p: .5 }} onClick={handleRemoveAdmin} color="error">Remove Admin</Button></MenuItem> : <MenuItem onClick={handleClose}><Button sx={{ width: '100%', mt: .5, p: .5 }} onClick={handleMakeAdmin} color="error">Make admin</Button></MenuItem>
                    }
                </Menu>
            </Paper >
        </Grid >
    );
};

export default UserCard;