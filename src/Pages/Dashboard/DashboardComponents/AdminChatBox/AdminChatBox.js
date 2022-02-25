import { Box, Grid, Input, Paper, Typography, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSocket from '../../../../Hooks/useSocket';
import { allData } from '../../../../redux/dataSlice/dataSlice';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import Message from '../Message/Message';
import { adminAvatar } from '../../../../utilities/bighead';

const AdminChatBox = props => {
    const { socket } = useSocket();
    const id = props.id;
    const data = useSelector(allData);
    const [messages, setMessages] = useState([]);
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const avatar = {}
    const onSubmit = data => {
        const mainData = { author: "admin", display: 'admin', avatar: { ...adminAvatar() }, type: "text", data, id, time: `${new Date()}` }
        console.log(mainData);
        socket.emit('message', mainData)
        setMessages(messages => [...messages, mainData])
        reset();
    }
    // main working of socket 
    useEffect(() => {
        console.log(id);
        socket.emit('join', { id });

        return () => {
            socket.emit('leave', id);
            setMessages([]);
        }
    }, [id]);
    useEffect(() => {
        socket.on("get-message", message => {
            console.log(message, 'bot')
            setMessages(messages => [...messages, message])
        });
    }, [])
    console.log(id);
    return (
        <Box>
            <Box height={"70vh"} sx={{ px: 1, overflow: 'scroll', background: '#eae7fa36' }}>
                {
                    id ?
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