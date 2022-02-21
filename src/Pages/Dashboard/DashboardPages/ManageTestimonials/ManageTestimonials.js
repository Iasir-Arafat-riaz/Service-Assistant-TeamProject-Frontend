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
import Swal from 'sweetalert2';
import DemoTestimonialModal from '../PendingTestimonial/DemoTestimonialModal';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ManageTestimonials = () => {

    const [testimonials, setTestimonials] = React.useState([]);

    // index of reviews 
    const [index, setIndex] = React.useState(0);
    // opening modal
    const [open, setOpen] = React.useState(false);
    const handleOpenModal = index => {
        setOpen(true);
        setIndex(index);
    };
    const handleClose = () => setOpen(false);

    // data load
    React.useEffect(() => {
        axios.get('https://fierce-meadow-12011.herokuapp.com/reviews').then(res => setTestimonials(res.data))
    }, [testimonials]);

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
                    setTestimonials(testimonials)
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
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {testimonials.map((testimonial, index) => (
                            <TableRow
                                key={testimonial._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {testimonial.name}
                                </TableCell>
                                <TableCell align="right">{testimonial.profession}</TableCell>
                                <TableCell align="right">{testimonial.rating}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleOpenModal(index)} variant="outlined" >Demo</Button>
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        testimonial.status === 'approved'
                                            ?
                                            <Button onClick={() => handleDeleteTestimonial(testimonial._id)} style={{ border: "1px solid red", color: "red" }}>Delete</Button>
                                            :
                                            <Button onClick={() => handleApproveTestimonil(testimonial._id)} style={{ border: "1px solid green", color: "green" }}>Approve</Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* open demo testimonial modal */}
            <DemoTestimonialModal
                open={open}
                handleClose={handleClose}
                handleOpen={handleOpenModal}
                index={index}
                testimonials={testimonials}
            />

        </>
    );
};

export default ManageTestimonials;