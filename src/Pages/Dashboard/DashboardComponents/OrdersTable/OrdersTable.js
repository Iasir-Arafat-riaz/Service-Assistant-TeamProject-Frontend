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

const OrdersTable = () => {
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData('AC Servicing', "Sabbir Rahman", "Shovo", 24, 'pending'),
        createData('Appliance Repair', "Rana Torafder", 'Najir', 37, 'pending'),
        createData('Painting & Renovation ', 'Ovi Ahamed', 'Rabbiul', 24, 'approve'),
        createData('Shifting', 'Mehedi', 'solaiman', 24, 'pending'),
        createData('Appliance Repair', "Rana Torafder", 'Najir', 37, 'pending'),
        createData('AC Servicing', 'Mehedi', 'solaiman', 24, 'pending'),
    ];
    // console.log(rows)
    return (
        < >
            <TableContainer sx={{ width: { xs: "90vw", md: '100%' }, height: '100%', overflow: 'scroll' }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Service Name</TableCell>
                            <TableCell>Provider</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => <OrdersTableRow row={row}></OrdersTableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default OrdersTable;