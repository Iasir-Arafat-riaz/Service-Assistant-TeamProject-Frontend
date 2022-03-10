import React from 'react';
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { allData } from '../../../../redux/dataSlice/dataSlice';

const OrdersMessage = (props) => {
    const { data: { text }, time, displayName, photoURL, email, sender } = props.data;
    const { user } = useSelector(allData);


    return (
        <Box

            sx={{
                textAlign: sender === user.email ? "right " : 'left',
            }}
        >
            <Paper elevation={1} sx={{
                display: 'inline-block',
                my: 1,
                maxWidth: '90%',
                borderRadius: '10px',
                mr: sender === user.email ? 2 : 0,
                ml: sender === user.email ? 0 : 2
            }} className={` ${sender === user.email ? 'mr-2 md:mr-5' : 'ml- md:ml-5'}`}>
                <Stack direction='column'>
                    <Typography variant='subtitle1' component='span'
                        sx={{ wordBreak: " break-all", p: 1, px: 2, }}
                        className='break-all max-w-lg text-left p-2 px-3'>
                        <span>{text}</span>

                    </Typography>
                </Stack>
            </Paper>
            <Box dir='ltr' sx={{
                display: sender === user.email ? 'flex' : 'block',
                justifyContent: 'flex-end'
            }} className={sender === user.email ? "flex justify-end" : 'block'}>
                <Box sx={{ width: '40px' }}>
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        src={photoURL}

                    ></Avatar>
                </Box>
            </Box>


        </Box>
    );
};

export default OrdersMessage; 