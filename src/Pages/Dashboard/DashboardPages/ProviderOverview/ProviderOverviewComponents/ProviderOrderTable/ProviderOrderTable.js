
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


const ProviderOrderTable = ({ data }) => {

    // //console.log(rows)
    return (
        < >
            <TableContainer sx={{ width: { xs: "90vw", md: '100%' }, height: '100%', overflow: 'scroll' }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Service Name</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => <ProviderTableRow key={row._id} row={row} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ProviderOrderTable;