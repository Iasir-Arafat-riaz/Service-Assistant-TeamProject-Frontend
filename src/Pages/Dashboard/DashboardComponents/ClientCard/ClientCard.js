import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { BigHead } from "@bigheads/core";

const ClientCard = props => {
    const { id, avatar, displayName } = props.data;
    const currentId = props.currentId;
    const handleClick = props.handleClick;

    return (
        <Paper elevation={id === currentId ? 0 : 0} sx={{
            pb: 1, mb: 2,
            transition: 'all .3s ',
            background: id === currentId ? '#eae7fa78' : '#eae7fa36',
            borderLeft: '2px solid transparent',
            borderColor: id === currentId ? '#ff631b8a' : 'transparent'

        }} onClick={() => handleClick(id)}>
            <Stack direction='row'>
                <div style={{ width: '80px', }}>
                    <BigHead
                        {...avatar}
                    ></BigHead>
                </div>
                <Box>
                    <Typography mt={2} variant='h5'>{displayName}</Typography>
                    <Typography mt={2} variant='small'>{id}</Typography>
                </Box>
            </Stack>
        </Paper>
    );
};

export default ClientCard;