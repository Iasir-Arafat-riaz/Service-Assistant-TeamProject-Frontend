import { Box, Grid, Input, Paper, Typography, Stack, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSocket from '../../../../Hooks/useSocket';
import { addOrderChat, allData, postChat, } from '../../../../redux/dataSlice/dataSlice';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import Message from '../Message/Message';
import ReactScrollableFeed from 'react-scrollable-feed'
import OrdersMessage from '../OrdersMessage/OrdersMessage';
const OrdersChatBox = ({ id, client }) => {
    const { socket } = useSocket();
    const dispatch = useDispatch();
    const { user, orderChats } = useSelector(allData);
    const [messages, setMessages] = useState([]);
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const { photoURL, displayName, email, provider } = client;
    
    const onSubmit = data => {
        const mainData = { sender: user?.email, photoURL: user.photoURL, data, id, buyerEmail: email, provider, time: `${new Date()}`, }
        
        // send data
        dispatch(postChat(mainData));
        dispatch(addOrderChat(mainData))
        socket.emit('order-message', mainData)
        reset();
    }
    // main working of socket 
    useEffect(() => {
        const thisChat = orderChats.filter(data => data.id === id)
        setMessages(thisChat);
        // socket.emit('join', { id });
        return () => {
            // socket.emit('leave', id);
            setMessages([]);
        }
    }, [id, orderChats]);
    return (
        <>
            <Box sx={{ px: 1, height: '65vh', background: '#eae7fa36' }}>
                <ReactScrollableFeed>
                    {
                        id ?
                            messages.map((messageData, index) => <OrdersMessage key={messageData.time + index} data={messageData}></OrdersMessage>) : <Stack
                                sx={{ height: '100%', }}
                                justifyContent='center'
                                alignItems='center'
                            ><Typography variant='body'>please select a order card to chat</Typography></Stack>
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
                        <Input disabled={id ? false : true} sx={{ flexGrow: 1, mr: 2 }} {...register("text", { required: true })} color="warning" placeholder='Lets Chat' />
                        <IconButton type='submit' disabled={id ? false : true} variant="contained" color="warning">
                            <SendIcon />
                        </IconButton>
                    </Paper>
                </form>
            </Box>
        </ >
    );
};

export default OrdersChatBox;