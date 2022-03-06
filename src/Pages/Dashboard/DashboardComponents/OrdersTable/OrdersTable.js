import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material'
import OrdersTableRow from '../OrdersTableRow/OrdersTableRow';

const OrdersTable = ({ allOrders, all }) => {
    const pendingOrders = allOrders?.filter(data => data.status === 'pending');

    return (
        < >
            <TableContainer sx={{ width: { xs: "90vw", md: '100%' }, height: '100%', overflow: 'scroll' }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Service Name</TableCell>
                            <TableCell>Provider</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            all ? pendingOrders.map(data => <OrdersTableRow key={data._id} data={data}></OrdersTableRow>) : pendingOrders.slice(0, 6).map(data => <OrdersTableRow key={data._id} data={data}></OrdersTableRow>)

                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default OrdersTable;