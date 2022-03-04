import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import AdminChatBox from '../../DashboardComponents/AdminChatBox/AdminChatBox';
import useSocket from '../../../../Hooks/useSocket'
import ClientCard from '../../DashboardComponents/ClientCard/ClientCard';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, allData, changeUserPosition, getAllUser, getChatFromDb } from '../../../../redux/dataSlice/dataSlice';
import ChatBoxHeader from '../../DashboardComponents/ChatBoxHeader/ChatBoxHeader';

const AdminChat = () => {
    const [allClientLocal, setAllClientLocal] = useState([]);
    const [uid, setUid] = useState();
    const [selectedUser, setSelectedUser] = useState({})
    const { socket, saveUser, getAllClientLocal } = useSocket();
    const dispatch = useDispatch();
    const { user, allUser } = useSelector(allData);


    useEffect(() => {
        socket.on('user', user => {
            //console.log(user);
            const getClients = saveUser(user);
            //console.log('get Clients', getClients);
            if (getClients) {
                setAllClientLocal(getClients);
            }
        });
        socket.on('get-message', message => {
            // add message change position of user 
            //console.log(message);
            dispatch(addChat(message));
            if (message.email) {
                dispatch(changeUserPosition(message))
            }

        })
    }, [])
    useEffect(() => {
        //local user 
        let allId = [];
        if (allClientLocal.length && user?.role === 'admin') {

            allClientLocal.forEach(element => {
                allId = [...allId, element.uid];
            });

            //join all user room
            socket.emit('joinAll', allId);
        }
        return () => {
            socket.emit('leave', allId);
        }
    }, [allClientLocal])
    useEffect(() => {
        dispatch(getAllUser())
        dispatch(getChatFromDb());

        if (getAllClientLocal()) {
            setAllClientLocal(getAllClientLocal());
        }

    }, [])
    useEffect(() => {
        // getting all userId  
        let allId = [];
        if (allUser.length && user?.role === 'admin') {

            allUser.forEach(element => {
                allId = [...allId, element.uid];
            });
            //join all user room
            socket.emit('joinAll', allId);
        }
        return () => {
            socket.emit('leave', allId);
        }
    }, [allUser, user])
    const handleClick = (id, user) => {
        setUid(id)
        setSelectedUser(user)
    }

    return (
        <Box >
            <Grid container spacing={4}>
                <Grid item xs={12} md={5}>
                    <Box height={"80vh"} sx={{ px: 1, overflow: 'scroll' }}  >
                        {
                            allUser?.length && allUser.map(userData => <ClientCard key={userData?.uid} user currentId={uid} data={userData} handleClick={handleClick}></ClientCard>)
                        }
                        <Typography variant='h6' gutterBottom>Random user</Typography>
                        {
                            allClientLocal && allClientLocal?.map(userData => <ClientCard key={userData.uid} currentId={uid} data={userData} handleClick={handleClick}></ClientCard>)
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                    <ChatBoxHeader user={selectedUser}></ChatBoxHeader>
                    <AdminChatBox uid={uid}></AdminChatBox>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminChat;