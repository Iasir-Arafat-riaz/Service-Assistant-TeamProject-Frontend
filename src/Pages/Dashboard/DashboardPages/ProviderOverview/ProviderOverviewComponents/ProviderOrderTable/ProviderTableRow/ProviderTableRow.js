import { MenuItem, TableCell, TableRow, TextField } from '@mui/material';
import React, { useState } from 'react';

const ProviderTableRow = ({row}) => {
    const [status, setStatus] = useState(row.status);
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
            <TableCell >{row.phone}</TableCell>
            <TableCell >{row.address}</TableCell>
            <TableCell >{row.quantity}</TableCell>
            <TableCell sx={{ p: 0 }}>
                <TextField
                    pt={20}
                    id="standard-select-currency"
                    select
                    size="small"
                    value={status}
                    onChange={handleChange}
                >
                    <MenuItem value='complete'>complete</MenuItem>
                    <MenuItem value='incomplete'>Incomplete</MenuItem>
                </TextField>
            </TableCell>
        </TableRow>
    );
};

export default ProviderTableRow;