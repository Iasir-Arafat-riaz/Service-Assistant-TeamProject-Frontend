import { Box, Grid, Input, Paper, Typography, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSocket from '../../../../Hooks/useSocket';
import { addChat, allData } from '../../../../redux/dataSlice/dataSlice';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import Message from '../Message/Message';

const AdminChatBox = props => {
    const { socket } = useSocket();
    const dispatch = useDispatch();
    const uid = props.uid;
    const { user, allChat } = useSelector(allData);
    const [messages, setMessages] = useState([]);
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const avatar = {}
    const onSubmit = data => {
        const mainData = { author: "admin", display: 'admin', photoURL: 'https://i.ibb.co/bL20gPC/admin-icon-png-12.png', type: "text", data, uid, email: user.email, time: `${new Date()}`, }
        dispatch(addChat(mainData))
        socket.emit('message', mainData)
        reset();
    }
    // main working of socket 
    useEffect(() => {
        const thisChat = allChat.filter(data => data.uid === uid)
        setMessages(thisChat);
        // socket.emit('join', { id });
        return () => {
            // socket.emit('leave', id);
            setMessages([]);
        }
    }, [uid, allChat]);

    return (
        <Box>
            <Box height={"70vh"} sx={{ px: 1, overflow: 'scroll', background: '#eae7fa36' }}>
                {
                    uid ?
                        messages.map(messageData => <Message key={messageData.time} data={messageData}></Message>) : <Stack
                            sx={{ height: '100%', }}
                            justifyContent='center'
                            alignItems='center'
                        ><Typography variant='body'>please select a user to chat</Typography></Stack>
                }
            </Box>
            <Box height={"10vh"} m={0} sx={{ m: 0, overflow: 'scroll' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Paper elevation={3} sx={{ pl: 2, py: .2 }}>
                        <Grid container spacing={2}  >
                            <Grid item xs={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Input {...register("text", { required: true })} color="warning" placeholder='Write something' sx={{ width: '100%', }} />
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>

                                <Button type='submit' variant="contained" color="warning" endIcon={<SendIcon />}>
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </Box>
        </Box >
    );
};

export default AdminChatBox;