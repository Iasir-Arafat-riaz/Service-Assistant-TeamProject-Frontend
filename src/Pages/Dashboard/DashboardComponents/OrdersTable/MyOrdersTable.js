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
        createData('Frozen yoghurt', "Sabbir", "AC Repair Services", 24, 'approve'),
        createData('Ice cream sandwich', "Rana", 'Appliance Repair', 37, 'pending'),
        createData('Eclair', 'Ovi Ahamed', 'Painting & Renovation', 24, 'approve'),
        createData('Rana', 'Mehedi', 'Beauty & Salon', 24, 'pending'),
        createData('Ice cream sandwich', "Sakib", 'AC Repair Services', 37, 'pending'),
        createData('Rana', 'Mehedi', 'Painting & Renovation', 24, 'pending'),
    ];
    return (
        < >
            <TableContainer sx={{ width: { xs: "90vw", md: '100%' }, height: '100%', overflow: 'scroll' }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Service Name</TableCell>
                            <TableCell>Provider</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Image</TableCell>
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