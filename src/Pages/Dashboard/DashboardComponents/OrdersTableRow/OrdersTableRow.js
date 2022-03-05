import { TableCell, FormControl, MenuItem, TextField, TableRow, Button, } from '@mui/material';
import { convertLength } from '@mui/material/styles/cssUtils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrdersTableRow = ({ data }) => {

    const [status, setStatus] = useState(data.status);

    const handleChange = e => {
        setStatus(e.target.value);
        const updateStatus = e.target.value;
        UpdateStatus(updateStatus);

        console.log(updateStatus);
    };

    const UpdateStatus = updateStatus => {
        useEffect(() => {
            axios.put(`http://localhost:5000/orders/changestatus/${data._id}`, { updateStatus })
        }, [updateStatus])
    }


    // update status 
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
                {/* {
                    status === 'pending'
                        ? */}
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