import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

const OrderChatCard = ({ data, handleChangeUser }) => {
    const { Name, Price, email, date, orderInfo, parentService, provider, _id } = data;
    return (
        <Paper onClick={() => handleChangeUser(data)} elevation={2} sx={{
            pb: 1, mb: 2,
            transition: 'all .3s ',
            // background: uid === currentId ? '#f3f3f3' : '#fff',
            // borderLeft: '2px solid transparent',
            // borderColor: uid === currentId ? '#ff631b8a' : 'transparent'

        }}  >
            <Stack direction='row'>
                <Stack direction='row' justifyContent='center' alignItems='center' style={{ width: '80px', }}>
                    <Avatar
                        src={parentService?.Image}
                    ></Avatar>
                </Stack>

                <Box>
                    <Typography mt={2} variant='h5'>{Name}</Typography>
                    {/* <Typography mt={2} variant='small'>{lastMessage?.data?.text ? lastMessage?.data?.text : 'New User'}</Typography> */}
                </Box>
            </Stack>
        </Paper>
    );
};

export default OrderChatCard;