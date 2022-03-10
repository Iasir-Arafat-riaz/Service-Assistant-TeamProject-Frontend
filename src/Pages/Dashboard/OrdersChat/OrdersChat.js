import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useSocket from '../../../Hooks/useSocket';
import { addOrderChat, allData, changeOtherOrdersPosition, getOtherOrders, getProviderChatsDb, getSingleOrdersChat } from '../../../redux/dataSlice/dataSlice';
import ChatBoxHeader from '../DashboardComponents/ChatBoxHeader/ChatBoxHeader';
import MyOrdersCard from '../DashboardComponents/MyOrdersCard/MyOrdersCard';
import OrderChatCard from '../DashboardComponents/OrderChatCard/OrderChatCard';
import OrdersChatBox from '../DashboardComponents/OrdersChatBox/OrdersChatBox';

const OrdersChat = ({ single }) => {
    const dispatch = useDispatch()
    const { urlId } = useParams();
    const [client, setClient] = useState({});
    const [id, setId] = useState();
    const [orderInfo, setOrderInfo] = useState({});
    // const [otherOrders, setOtherOrders] = useState([]);
    const { socket } = useSocket();
    const { user, otherOrders } = useSelector(allData);

    //join with id for user chat
    useEffect(() => {
        if (urlId) {

            socket.emit('join', { uid: urlId });
        }
        return () => {
            socket.on('leave', urlId);
        }
    }, [urlId]);
    //get orders info
    useEffect(() => {
        //user chat order card
        if (urlId) {
            axios.get(`http://localhost:5000/orders/${urlId}`)
                .then(res => {
                    setOrderInfo(res.data);
                    setId(urlId)
                })
            dispatch(getSingleOrdersChat({ id: urlId }))
        }
        // for provider getting all other Order of provider
        if (user.role === 'provider') {
            dispatch(getOtherOrders({ email: user.email }))
            dispatch(getProviderChatsDb({ email: user.email }))
        }
    }, [user, urlId, dispatch]);

    // get info of provider
    const getClient = () => {
        axios.get(`http://localhost:5000/users/${orderInfo.providerEmail}`)
            .then(res => {
                setClient({
                    photoURL: res.data?.photoURL,
                    displayName: res.data?.displayName,
                    email: orderInfo.email,
                    provider: orderInfo.providerEmail,
                });
            })

    }
    //init client
    useEffect(() => {
        if (orderInfo?._id) {
            orderInfo?.providerEmail !== user.email ? getClient() : setClient(
                {
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    email: orderInfo.email,
                    provider: orderInfo.providerEmail,
                }
            )
        }
    }, [orderInfo])
    // join all order _id with server room
    useEffect(() => {
        let allId = []
        if (otherOrders.length && !single) {
            otherOrders.forEach(element => {
                allId = [...allId, element._id];
            });

            //join all user room
        }
        !urlId && socket.emit('joinAll', allId);
        return () => {
            socket.emit('leave', allId);
        }
    }, [otherOrders])

    // get all order message
    useEffect(() => {
        socket.on('get-order-message', data => {
            // change position
            dispatch(changeOtherOrdersPosition(data))
            //add message to state
            dispatch(addOrderChat(data))
        })
    }, [socket])

    if (orderInfo?.provider?.email === orderInfo?.email && orderInfo?.email === user.email) {
        return <Box>
            <Typography >You are the provider of this order and order this items </Typography>
        </Box>
    }
    const handleChangeUser = theData => {
        setId(theData._id);
        setClient(theData)
    }

    return (
        <Grid container spacing={2}>
            {
                single && <Grid item xs={12} md={4}>
                    {orderInfo?._id && <MyOrdersCard service={orderInfo} notShow></MyOrdersCard>}
                </Grid>
            }
            <Grid item xs={12} md={6}>
                <ChatBoxHeader user={client}></ChatBoxHeader>
                <OrdersChatBox client={client} id={id}></OrdersChatBox>
            </Grid>
            {
                !single && <Grid item xs={12} md={6}>
                    <Box height={"80vh"} sx={{ px: 1, overflow: 'scroll' }}  >
                        {
                            otherOrders.map(data => <OrderChatCard key={data?._id} currentId={id} handleChangeUser={handleChangeUser} data={data}></OrderChatCard>)
                        }
                    </Box>
                </Grid>
            }

        </Grid >
    );
};

export default OrdersChat;