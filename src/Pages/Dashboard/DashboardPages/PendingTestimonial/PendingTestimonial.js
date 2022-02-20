import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button } from '@mui/material';
import DemoTestimonialModal from './DemoTestimonialModal';
import Swal from 'sweetalert2';

const PendingTestimonial = () => {

    const [pendingTestimonials, setPendingTestimonials] = React.useState([]);

    // index of reviews 
    const [index, setIndex] = React.useState(0);
    // opening modal
    const [open, setOpen] = React.useState(false);
    const handleOpenModal = index => {
        setOpen(true)
        setIndex(index)
    };
    const handleClose = () => setOpen(false);

    // data load
    React.useEffect(() => {
        axios.get('https://fierce-meadow-12011.herokuapp.com/reviews').then(res => setPendingTestimonials(res.data))
    }, [pendingTestimonials]);

    // delete testimonial
    const handleDeleteTestimonial = id => {
        Swal.fire({
            title: 'Are you sure you want to delete?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const uri = `http://localhost:5000/reviews/${id}`;
                axios.delete(uri).then(() => {
                    setPendingTestimonials(pendingTestimonials)
                    Swal.fire(
                        'Deleted!',
                        'This testimonial has been deleted',
                        'success'
                    )
                })
            }
        })
    };

    // handle approve testimonial
    const handleApproveTestimonil = id => {
        axios.put(`http://localhost:5000/reviews/${id}`).then(() => {
            setPendingTestimonials(pendingTestimonials)
            Swal.fire(
                'Approved!',
                'This testimonial has been approved',
                'success'
            )
        });
    };


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Profession</TableCell>
                            <TableCell align="right">Rating</TableCell>
                            <TableCell align="right">Demo</TableCell>
                            <TableCell align="right">Approve</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingTestimonials?.map((testiominal, index) => testiominal?.status === 'pending' && (
                            <TableRow
                                key={testiominal._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {testiominal.name}
                                </TableCell>
                                <TableCell align="right">{testiominal.profession}</TableCell>
                                <TableCell align="right">{testiominal.rating}</TableCell>


                                <TableCell align="right">
                                    <Button onClick={() => handleOpenModal(index)} variant="outlined" >Demo</Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleApproveTestimonil(testiominal._id)} variant="outlined" sx={{ borderColor: "green", color: "green" }}>Approve</Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleDeleteTestimonial(testiominal._id)} variant="outlined" sx={{ borderColor: "red", color: "red" }}>Delete</Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* demo testimonial modal */}
            <DemoTestimonialModal
                index={index}
                testimonials={pendingTestimonials}
                open={open}
                handleOpen={handleOpenModal}
                handleClose={handleClose}
            />
        </>
    );
};

export default PendingTestimonial;