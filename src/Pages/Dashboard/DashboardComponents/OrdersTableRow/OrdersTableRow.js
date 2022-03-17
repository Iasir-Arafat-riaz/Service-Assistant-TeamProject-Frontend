import { TableCell, FormControl, MenuItem, TextField, TableRow, Button, } from '@mui/material';
import { convertLength } from '@mui/material/styles/cssUtils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useSocket from '../../../../Hooks/useSocket';
import { sendNotification } from '../../../../redux/dataSlice/dataSlice';

const OrdersTableRow = ({ data }) => {

    const [status, setStatus] = useState(data.status);
    const { socket } = useSocket();
    const dispatch = useDispatch();
    const handleChange = e => {
        setStatus(e.target.value);
        const updateStatus = e.target.value;
        UpdateStatus(updateStatus);
        console.log(updateStatus);
    };
    console.log(data);
    const UpdateStatus = updateStatus => {
        axios.put(`https://dry-sea-00611.herokuapp.com/orders/changestatus/${data._id}`, { updateStatus })
            .then(res => {
                dispatch(sendNotification({
                    message: `your order for ${data.Name} is now on the way `,
                    image: data?.parentService?.Image,
                    email: data.email,
                }))
                // send notification to user 
                socket.emit('notification', {
                    message: `your order for ${data.Name} is now on the way `,
                    image: data?.parentService?.Image,
                    email: data.email,
                    seen: false,
                })
                //send to provider
                dispatch(sendNotification({
                    message: `your appointment ${data.Name} is approve by admin `,
                    image: data?.parentService?.Image,
                    email: data.providerEmail,
                    link: '/dashboard/provider/appointment'
                }))
                socket.emit('notification', {
                    message: `your appointment  ${data.Name} is approve by admin `,
                    image: data?.parentService?.Image,
                    email: data.providerEmail,
                    link: '/dashboard/provider/appointment',
                    seen: false,
                    time: new Date(),
                })
            })
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
            <TableCell >{data?.providerEmail}</TableCell>
            <TableCell >{data.orderInfo?.name}</TableCell>
            <TableCell >{data.Price}</TableCell>
            <TableCell sx={{ p: 0 }}>

                {
                    status === 'pending' ?
                        <TextField
                            pt={20}
                            id="standard-select-currency"
                            select
                            size="small"
                            value={status}
                            onChange={handleChange}
                        >
                            <MenuItem value='approved'>Approved</MenuItem>
                            <MenuItem value='pending'>Pending</MenuItem>
                        </TextField>
                        : <p>Approve</p>
                }

            </TableCell>
        </TableRow>
    );
};

export default OrdersTableRow;