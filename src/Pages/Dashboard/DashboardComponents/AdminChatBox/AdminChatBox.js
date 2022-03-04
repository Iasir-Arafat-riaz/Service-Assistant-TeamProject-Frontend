import { Box, Grid, Input, Paper, Typography, Stack, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSocket from '../../../../Hooks/useSocket';
import { addChat, allData, postChat } from '../../../../redux/dataSlice/dataSlice';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import Message from '../Message/Message';
import ReactScrollableFeed from 'react-scrollable-feed'

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

        // send data
        dispatch(postChat(mainData));
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
        <>
            <Box sx={{ px: 1, height: '65vh', background: '#eae7fa36' }}>
                <ReactScrollableFeed>
                    {
                        uid ?
                            messages.map((messageData, index) => <Message key={messageData.time + index} data={messageData}></Message>) : <Stack
                                sx={{ height: '100%', }}
                                justifyContent='center'
                                alignItems='center'
                            ><Typography variant='body'>please select a user to chat</Typography></Stack>
                    }
                </ReactScrollableFeed>
            </Box>
            <Box height={"10vh"} m={0} sx={{ m: 0, overflow: 'scroll' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Paper elevation={1} sx={{
                        pl: 2, py: .2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Input disabled={uid ? false : true} sx={{ flexGrow: 1, mr: 2 }} {...register("text", { required: true })} color="warning" placeholder='Lets Chat' />
                        <IconButton type='submit' disabled={uid ? false : true} variant="contained" color="warning">
                            <SendIcon />
                        </IconButton>
                    </Paper>
                </form>
            </Box>
        </ >
    );
};

export default AdminChatBox;