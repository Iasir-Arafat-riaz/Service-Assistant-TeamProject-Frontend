import { Container } from '@mui/material';
import React from 'react';
import MyOrdersTable from '../Dashboard/DashboardComponents/OrdersTable/MyOrdersTable';
import Navigation from '../SharedRoute/Navigation/Navigation';

const MyOrderPage = () => {
    return (
        <>
            <Navigation />
            <Container sx={{ mt: 20 }}>
                <MyOrdersTable />
            </Container>
        </>
    );
};

export default MyOrderPage;