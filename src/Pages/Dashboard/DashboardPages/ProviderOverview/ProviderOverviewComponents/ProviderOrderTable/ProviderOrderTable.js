
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material'
import ProviderTableRow from './ProviderTableRow/ProviderTableRow';


const ProviderOrderTable = () => {
    function createData(name, phone, address, quantity, status) {
        return { name, phone, address, quantity, status };
    }
    const rows = [
        createData('Iasir Arafat Riaz', "01654214564", "south mugdha", 1, 'incomplete'),
        createData('Md Sagar Ali', "016456814564", 'kalabagan', 2, 'incomplete'),
        createData('Naimur Rahman ', '01554214564', 'jatrabari', 1, 'incomplete'),
        createData('Mahfujur Rahman', '01954245542', 'malibag', 2, 'complete'),
        createData(' Rakibul hoque', "01854214564", 'dhanmondhi', 3, 'complete'),
        createData('Kawser Ali', '01475865658', 'demra', 2, 'incomplete'),
    ];
    // console.log(rows)
    return (
        < >
            <TableContainer sx={{ width: { xs: "90vw", md: '100%' }, height: '100%', overflow: 'scroll' }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                       {rows.map((row,index)=><ProviderTableRow key={index} row={row} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ProviderOrderTable;