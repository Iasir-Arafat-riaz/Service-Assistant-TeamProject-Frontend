import { MenuItem, TableCell, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const ProviderTableRow = ({ row }) => {
    const [status, setStatus] = useState(row.status === 'pending' && 'incomplete');
    console.log(row);
    const handleChange = e => {
        setStatus(e.target.value);
        if (e.target.value === 'completed') {
            axios.put(`http://localhost:5000/orders/changestatus/${row._id}`, { data: { updateStatus: 'completed' } })
        }
    }
    return (
        <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {row.orderInfo?.name}
            </TableCell>
            <TableCell >{row.orderInfo?.number}</TableCell>
            <TableCell >{row.orderInfo?.address}</TableCell>
            <TableCell >{row.Name}</TableCell>
            <TableCell sx={{ p: 0 }}>
                {
                    status === 'completed' ? <p style={{ color: 'green' }}>Completed</p> : <TextField
                        pt={20}
                        id="standard-select-currency"
                        select
                        size="small"
                        value={status}
                        onChange={handleChange}
                    >
                        <MenuItem value='completed'>complete</MenuItem>
                        <MenuItem value='incomplete'>Incomplete</MenuItem>
                    </TextField>
                }
            </TableCell>
        </TableRow>
    );
};

export default ProviderTableRow;