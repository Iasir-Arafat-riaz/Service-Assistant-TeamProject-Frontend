import { TableCell, TableRow } from '@mui/material';
import React from 'react';

const Provider = ({ provider }) => {

    return (

        <div>

            <TableCell component="th" scope="row">
                {provider?.data?.number}
            </TableCell>
            <TableCell align="right">{provider?.data?.email}</TableCell>
            <TableCell align="right">{provider?.data?.address}</TableCell>
            <TableCell align="right">{provider?.data?.qanswer}</TableCell>
            {/* <TableCell align="right">{row.protein}</TableCell> */}
        </div>
    );
};

export default Provider;