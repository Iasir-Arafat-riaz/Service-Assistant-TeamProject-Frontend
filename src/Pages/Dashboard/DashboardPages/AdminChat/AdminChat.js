import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import AdminChatBox from '../../DashboardComponents/AdminChatBox/AdminChatBox';
import useSocket from '../../../../Hooks/useSocket'
import ClientCard from '../../DashboardComponents/ClientCard/ClientCard';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, allData, changeUserPosition, getAllUser } from '../../../../redux/dataSlice/dataSlice';

const AdminChat = () => {
    const [allClientLocal, setAllClientLocal] = useState([]);
    const [displayUsers, setDisplayUsers] = useState([]);
    const [uid, setUid] = useState();
    const { socket, saveUser, getAllClientLocal } = useSocket();
    const dispatch = useDispatch();
    const { user, allUser } = useSelector(allData);


    useEffect(() => {
        socket.on('user', user => {
            const getClients = saveUser(user);
            setAllClientLocal(getClients);
        });
        socket.on('get-message', message => {
            // add message change position of user 
            dispatch(addChat(message));
            dispatch(changeUserPosition(message))
        })
    }, [])
    useEffect(() => {
        dispatch(getAllUser())
        if (getAllClientLocal()) {
            setAllClientLocal(getAllClientLocal());
        }

    }, [])
    useEffect(() => {
        setDisplayUsers(allUser);
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
    const handleClick = id => {
        setUid(id)
    }
    return (
        <Box >
            <Grid container spacing={4}>

                <Grid item xs={12} md={5}>
                    <Box height={"80vh"} sx={{ px: 1, overflow: 'scroll' }}  >
                        {
                            displayUsers.map(userData => <ClientCard key={userData?.uid} user currentId={uid} data={userData} handleClick={handleClick}></ClientCard>)
                        }
                        <Typography variant='h6' gutterBottom>Random user</Typography>
                        {
                            allClientLocal.map(userData => <ClientCard key={userData.uid} currentId={uid} data={userData} handleClick={handleClick}></ClientCard>)
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={7}>
                    <AdminChatBox uid={uid}></AdminChatBox>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminChat;