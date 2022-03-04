import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import { bgcolor, Box } from '@mui/system';
import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const ChatBoxHeader = props => {
    //console.log(props.user);
    const { uid, avatar, photoURL, displayName, email } = props?.user;
    return (
        <Stack direction='row' px={2} py={1} justifyContent='space-between' alignItems='center' sx={{
            maxHeight: '10vh',
            background: '#d6d6d678'
        }}>
            <Stack direction='row' alignItems='center'>
                <Avatar src={photoURL} alt={displayName}></Avatar>
                <Typography ml={2}>{displayName}</Typography>
            </Stack>
            <Box>
                <IconButton>
                    <MoreHorizIcon></MoreHorizIcon>
                </IconButton>
            </Box>
        </Stack>
    );
};

export default ChatBoxHeader;