import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import AdminChatBox from '../../DashboardComponents/AdminChatBox/AdminChatBox';
import useSocket from '../../../../Hooks/useSocket'
import ClientCard from '../../DashboardComponents/ClientCard/ClientCard';

const AdminChat = () => {
    const [allClientLocal, setAllClientLocal] = useState([]);
    const [id, setId] = useState();
    const { socket, saveUser, getAllClientLocal } = useSocket();



    useEffect(() => {
        socket.on('user', user => {
            const getClients = saveUser(user);
            setAllClientLocal(getClients);
        });
    }, [socket])
    useEffect(() => {
        if (getAllClientLocal()) {
            setAllClientLocal(getAllClientLocal());
        }
    }, [])
    console.log('client ', allClientLocal);
    const handleClick = id => {
        console.log(id);
        setId(id)
    }
    return (
        <Box >
            <Grid container spacing={4}>

                <Grid item xs={12} md={6}>
                    <Box height={"80vh"} sx={{ px: 1, overflow: 'scroll' }}  >
                        {
                            allClientLocal.map(userData => <ClientCard currentId={id} data={userData} handleClick={handleClick}></ClientCard>)
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <AdminChatBox id={id}></AdminChatBox>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminChat;