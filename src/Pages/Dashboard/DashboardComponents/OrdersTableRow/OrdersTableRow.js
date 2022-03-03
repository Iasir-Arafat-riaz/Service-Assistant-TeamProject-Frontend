import { TableCell, FormControl, MenuItem, TextField, TableRow, } from '@mui/material';
import React, { useState } from 'react';

const OrdersTableRow = ({ data }) => {
    const [status, setStatus] = useState(data.status);
    const handleChange = e => {
        setStatus(e.target.value);
    }
    return (
        <TableRow
            key={data._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {data?.Name.slice(0, 20)}
            </TableCell>
            <TableCell >{data?.provider.name ? data?.provider.name : data?.provider?.displayName}</TableCell>
            <TableCell >{data.orderInfo?.name}</TableCell>
            <TableCell >{data.Price}</TableCell>
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