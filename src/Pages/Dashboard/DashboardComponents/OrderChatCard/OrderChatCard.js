import { Avatar, Box, Paper, Skeleton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderChatCard = ({ data, handleChangeUser, currentId }) => {
    const { Name, Price, email, date, orderInfo, parentService, providerEmail, _id } = data;
    const [buyerInfo, setBuyerInfo] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`https://service-assistant.adaptable.app/users/${email}`)
            .then(res => setBuyerInfo(res.data))
            .finally(() => setLoading(false));
    }, []);
    if (loading) {
        return <>
            <Skeleton animation="wave" height={80} />

        </>

    }
    const handleClick = () => {
        if (buyerInfo?._id) {

        }
        buyerInfo?._id ? handleChangeUser({
            photoURL: buyerInfo.photoURL,
            displayName: buyerInfo.displayName,
            email: data.email,
            provider: providerEmail,
            _id,
        }) : alert('Buyer info not found')
    }
    return (
        <Paper disabled onClick={handleClick} elevation={2} sx={{
            mb: 2,
            transition: 'all .3s ',
            background: _id === currentId ? '#f3f3f3' : '#fff',
            borderLeft: '2px solid transparent',
            borderColor: _id === currentId ? '#ff631b8a' : 'transparent'

        }}  >
            <Stack direction='row'>
                <Box  >
                    <img className='user-img' src={parentService.Image} alt={Name} />
                </Box>
                <Box ml={2} sx={{ flexGrow: 1 }} >
                    <Box>
                        <Typography variant='h5' component="span">{Name.slice(0, 20)}</Typography>
                        <Typography variant='body' component="span"> to {orderInfo.address}</Typography>

                    </Box>
                    <Box sx={{ display: 'inline-block', pr: 1, alignItems: 'center', justifyContent: 'space-between', gap: 1, mt: 1, border: '1px solid #d0d0d0', borderRadius: 6 }}>

                        <Stack direction='row' alignItems='center'  >
                            <Avatar alt={buyerInfo.displayName} sx={{ width: 30, height: 30 }} src={buyerInfo?.photoURL} />
                            <Stack sx={{ ml: 1 }}>
                                <Typography sx={{ fontSize: 15 }} variant="h6">{buyerInfo?.displayName}</Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </Paper>
    );
};

export default OrderChatCard;