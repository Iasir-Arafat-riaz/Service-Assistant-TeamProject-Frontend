import { TableCell, FormControl, MenuItem, TextField, TableRow, } from '@mui/material';
import React, { useState } from 'react';

const OrdersTableRow = ({ row }) => {
    const [status, setStatus] = useState(row.protein);
    const handleChange = e => {
        setStatus(e.target.value);
    }


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
            <TableCell sx={{ p: 0 }}>
                <TextField
                    pt={20}
                    id="standard-select-currency"
                    select
                    size="small"
                    value={status}
                    onChange={handleChange}
                >
                    <MenuItem value='approve'>Approve</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                </TextField>
            </TableCell>
        </TableRow>
    );
};

export default OrdersTableRow;