import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrdersTable from '../../DashboardComponents/OrdersTable/OrdersTable'
import { CircularProgress, Stack } from '@mui/material';
const ManageAllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axios.get('https://fierce-meadow-12011.herokuapp.com/orders/pending')
            .then(res => setAllOrders(res.data))
            .finally(() => setLoading(false));
    }, []);
    return (
        <>
            {
                loading ? <Stack alignItems='center'><CircularProgress></CircularProgress></Stack> : <OrdersTable allOrders={allOrders} all></OrdersTable>
            }
        </>
    );
};

export default ManageAllOrders;