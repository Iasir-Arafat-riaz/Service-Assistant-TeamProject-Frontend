import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MyOrderTableRow from '../OrdersTableRow/MyOrderTableRow';

const MyOrdersTable = () => {
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('1 - 1.5 Ton', "Sabbir", "AC Repair Services", 1500, 'approve'),
        createData('Microwave Oven Servicing', "Rana", 'Appliance Repair', 950, 'pending'),
        createData('Basic Checkup', 'Ovi Ahamed', 'Painting & Renovation', 1200, 'approve'),
        createData('Microwave Oven Servicing', 'Mehedi', 'Beauty & Salon', 2200, 'pending'),
        createData('1Ton Partial - R22', "Sakib", 'AC Repair Services', 1700, 'pending'),
        createData('Basic Checkup', 'Mehedi', 'Painting & Renovation', 5000, 'approve'),
    ];
    return (
        < >
            <TableContainer sx={{ width: { xs: "90vw", md: '100%' }, height: '100%', overflow: 'scroll' }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Service Name</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => <MyOrderTableRow row={row}></MyOrderTableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default MyOrdersTable;