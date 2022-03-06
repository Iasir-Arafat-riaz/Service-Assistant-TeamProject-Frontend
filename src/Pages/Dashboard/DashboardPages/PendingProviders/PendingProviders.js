import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Avatar, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { allData, getAllUser } from '../../../../redux/dataSlice/dataSlice';




const PendingProviders = () => {


    const [pendingProviders, setPendingProviders] = useState([]);
    const { allUser } = useSelector(allData);
    const [loading, setLoading] = useState(true);
    const [dataLoad, setDataLoad] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setDataLoad(true);
        axios.get(`http://localhost:5000/addprovider`).then(res => {
            setPendingProviders(res.data);
            setDataLoad(false);
        })
        dispatch(getAllUser());
    }, [dispatch, loading])

    // approve provider 
    const ApproveProvider = (email, id, parentId) => {
        const matchUser = allUser.find(user => user.email === email);
        setLoading(true);
        console.log(matchUser);
        axios.put(`http://localhost:5000/addprovider/approveprovider?uid=${matchUser?.uid}`).then(res => {
            axios.post(`http://localhost:5000/addprovider/addproviderkey/${parentId}`, { key: matchUser._id });
            axios.delete(`http://localhost:5000/addprovider/deleteprovider/${id}`);
            setLoading(false)
        })
    };

    // delete provider
    const deleteProvider = id => {
        setLoading(true);
        axios.delete(`http://localhost:5000/addprovider/deleteprovider/${id}`).then(res => {
            setLoading(false);
        })
    };



    if (dataLoad) {
        return <Typography variant='h6'>Loading...</Typography>
    };

    return (

        <>
            {
                pendingProviders.length === 0 && <Typography variant='h6'>No pending providers</Typography>
            }

            {
                pendingProviders.length !== 0 && <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead sx={{ boxShadow: 2 }}>
                            <TableRow>
                                <TableCell>Service Image</TableCell>
                                <TableCell>Service Name</TableCell>
                                <TableCell>Provider Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Approve</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pendingProviders.map((provider) => (
                                <TableRow
                                    key={provider._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Avatar sx={{ borderRadius: 0 }} src={provider?.Img} alt="serviceImage" />
                                    </TableCell>
                                    <TableCell >{provider?.Name}</TableCell>
                                    <TableCell >
                                        <Avatar src={provider?.image} alt="providerImage" />
                                    </TableCell>
                                    <TableCell >{provider?.data?.name}</TableCell>
                                    <TableCell >{provider?.data?.number}</TableCell>
                                    <TableCell >{provider?.data?.email}</TableCell>
                                    <TableCell >{provider?.data?.address}</TableCell>
                                    <TableCell >
                                        <Button variant="outlined" sx={{ letterSpacing: 1 }} onClick={() => ApproveProvider(provider.data.email, provider._id, provider.Id)}> APPROVE </Button>
                                    </TableCell>
                                    <TableCell >
                                        <Button variant="outlined" onClick={() => deleteProvider(provider._id)} sx={{ letterSpacing: 1 }}>DELETE </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    );
};

export default PendingProviders;