import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useSocket from '../../../Hooks/useSocket';
import { addOrderChat, allData, changeOtherOrdersPosition, getOtherOrders } from '../../../redux/dataSlice/dataSlice';
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
        console.log(urlId);
        if (urlId) {
            console.log(urlId, 'in');
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
                    setClient({
                        photoURL: res.data?.provider?.photoURL,
                        displayName: res.data?.provider?.displayName,
                        email: res.data.email,
                        provider: res.data.provider
                    })
                    setId(urlId)
                    console.log(res);
                })
        }
        // for provider getting all other Order of provider
        if (user.role === 'provider') {
            console.log('provider');
            dispatch(getOtherOrders({ email: user.email }))
        }
    }, [user, urlId]);
    //init client
    useEffect(() => {
        // if (orderInfo?._id) {
        //     orderInfo?.provider.email === user.email && setClient(orderInfo)
        // }
    }, [orderInfo])
    console.log(otherOrders);
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
            console.log(data);
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
        setClient({
            photoURL: theData?.parentService?.Image,
            displayName: theData?.Name,
            email: theData.email,
            provider: theData.provider,
        })
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
                            otherOrders.map(data => <OrderChatCard key={data?._id} handleChangeUser={handleChangeUser} data={data}></OrderChatCard>)
                        }
                    </Box>
                </Grid>
            }

        </Grid >
    );
};

export default OrdersChat;