import { BigHead } from '@bigheads/core';
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Message = (props) => {
    const { author, data: { text }, time, avatar, displayName, photoURL, email } = props.data;

    return (
        <Box

            sx={{
                textAlign: author === 'admin' ? "right " : 'left',
            }}
        >
            <Paper elevation={1} sx={{
                display: 'inline-block',
                my: 1,
                borderRadius: '10px',
                maxWidth: '90%',
                mr: author === 'admin' ? 2 : 0,
                ml: author === 'admin' ? 0 : 2
            }} className={` ${author === 'admin' ? 'mr-2 md:mr-5' : 'ml- md:ml-5'}`}>
                <Stack direction='column'>
                    <Typography variant='subtitle1' component='span'
                        sx={{ wordBreak: " break-all", p: 1, px: 2 }}
                        className='break-all max-w-lg text-left p-2 px-3'>
                        <span>{text}</span>

                    </Typography>
                </Stack>
            </Paper>
            <Box dir='ltr' sx={{
                display: author === 'admin' ? 'flex' : 'block',
                justifyContent: 'flex-end'
            }} className={author === 'admin' ? "flex justify-end" : 'block'}>
                <Box sx={{ width: '50px' }}>
                    {
                        email ? <Avatar
                            src={photoURL}
                        ></Avatar> : <BigHead
                            {...avatar}
                        ></BigHead>
                    }

                </Box>
            </Box>


        </Box>
    );
};

export default Message;