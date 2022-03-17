import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NotificationCard = ({ notification }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 1,
                borderBottom: "2px solid #F4F5F8",
                pb: 1,
                background: notification.seen ? 'white' : '#f4f5f8',
                cursor: 'pointer',
                color: '#000',
                textDecoration: 'none',
            }}
            component={NavLink}
            to={notification.link ? notification.link : '/home'}
        >
            <Avatar
                alt="notification image"
                sx={{ borderRadius: 1, width: 60, height: 60 }}
                src={notification?.image}
            />

            <Box>
                <Typography variant="h6" sx={{ fontSize: 14, textTransform: 'capitalize' }}>
                    {notification.message}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: 11 }}>
                    Date: {new Date(notification.time).toDateString()}
                </Typography>
            </Box>
        </Box>
    );
};

export default NotificationCard;