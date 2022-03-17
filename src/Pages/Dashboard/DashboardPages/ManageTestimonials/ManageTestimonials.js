import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import DemoTestimonialModal from '../PendingTestimonial/DemoTestimonialModal';
import { useDispatch, useSelector } from 'react-redux';
import { allData, approvedTestimonial, deleteTestimonails, deleteTestimonial, remaingTestimonials, websiteReviews } from '../../../../redux/dataSlice/dataSlice';
import swal from 'sweetalert';


const ManageTestimonials = () => {


    // index of reviews 
    const [index, setIndex] = React.useState(0);
    // opening modal
    const [open, setOpen] = React.useState(false);
    const handleOpenModal = index => {
        setOpen(true);
        setIndex(index);
    };
    const handleClose = () => setOpen(false);

    const dispatach = useDispatch();
    const { testimonials, testimonialLoading } = useSelector(allData);

    React.useEffect(() => {
        dispatach(websiteReviews());
    }, [dispatach]);


    // delete testimonial
    const handleDeleteTestimonial = id => {
        swal({
            text: "Are you sure?",
            buttons: true,
            icon: "warning",
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatach(deleteTestimonial({ id }))
                dispatach(deleteTestimonails(id));
            }
        })
    };


    // handle approve testimonial
    const handleApproveTestimonil = id => {
        // dispatach(approvedTestimonial({ id }))
        swal({
            text: "Are you sure? you want to approve this testomonial!",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatach(remaingTestimonials(id));
                    dispatach(approvedTestimonial({ id }))

                }
            });

    };

    if (testimonialLoading) {
        return <h3>Loading...</h3>
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