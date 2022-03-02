import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { BigHead } from "@bigheads/core";
import { useSelector } from 'react-redux';
import { allData } from '../../../../redux/dataSlice/dataSlice';

const ClientCard = props => {
    const { allChat } = useSelector(allData);
    const { uid, avatar, photoURL, displayName, email } = props.data;
    const currentId = props.currentId;
    const handleClick = props.handleClick;
    const allMessage = allChat.filter(data => data?.uid === uid);
    const lastMessage = allMessage[allMessage.length - 1];
    return (
        <Paper sx={{
            pb: 1, mb: 2,
            transition: 'all .3s ',
            background: uid === currentId ? '#eae7fa78' : '#eae7fa36',
            borderLeft: '2px solid transparent',
            borderColor: uid === currentId ? '#ff631b8a' : 'transparent'

        }} onClick={() => handleClick(uid)}>
            <Stack direction='row'>
                {
                    email ? <Stack direction='row' justifyContent='center' alignItems='center' style={{ width: '80px', }}>
                        <Avatar
                            src={photoURL}
                        ></Avatar>
                    </Stack> : <div style={{ width: '80px', }}>
                        <BigHead
                            {...avatar}
                        ></BigHead>
                    </div>
                }

                <Box>
                    <Typography mt={2} variant='h5'>{displayName}</Typography>
                    <Typography mt={2} variant='small'>{lastMessage?.data?.text ? lastMessage?.data?.text : 'New User'}</Typography>
                </Box>
            </Stack>
        </Paper>
    );
};

export default ClientCard;