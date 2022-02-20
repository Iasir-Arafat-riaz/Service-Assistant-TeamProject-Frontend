import { TableCell, TableRow, } from '@mui/material';
import React from 'react';

const MyOrderTableRow = ({ row }) => {

    return (
        <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell >{row.calories}</TableCell>
            <TableCell >{row.fat}</TableCell>
            <TableCell >{row.carbs}</TableCell>
            <TableCell >{row.protein}</TableCell>
        </TableRow>
    );
};

export default MyOrderTableRow;