import { Paper, Typography, Button, Box, Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router-dom';
import CategoryModal from '../CategoryModal/CategoryModal';

const ServiceCategory = ({ service }) => {

    const [services, setServices] = useState([]);
    const { serviceId } = useParams();
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [open, setOpen] = React.useState(false);


    const handleOpen = index => {
        setOpen(true);
        setIndex(index);
    };

    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios.get('https://fierce-meadow-12011.herokuapp.com/singleservice').then(res => {
            setServices(res.data);
            setLoading(false);
        })
    }, []);

    const matchService = services?.find(service => service.parentService == serviceId);

    // box style
    const box = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#f8f8f8',
        mb: 3,
        borderRadius: 2
    };

    return (
        <>
            {loading ?
                <Box>
                    {
                        [...new Array(6)].map(() => <Skeleton sx={{ height: 70, mb: 3 }} animation="wave" />)
                    }
                </Box>
                :
                <Paper elevation={3} sx={{ py: 5, px: 2, background: "#fff" }}>


                    <Typography variant='h5' sx={{ fontWeight: "bold" }}>{service.Title}</Typography>
                    <Button variant="outlined" sx={{ mb: 3, p: 1, fontSize: 17, mt: 2, border: '1px solid #FF5E14', color: "#FF5E14" }}>{service.Rating} out of 5</Button>


                    {
                        matchService?.allServices?.map((service, index) => <Box
                            onClick={() => handleOpen(index)}
                            sx={box} >
                            <img type="button" src={service.Image} width="60" alt={service.Title} />
                            <Typography variant="h6" sx={{ fontSize: 15, fontWeight: 'bold', color: "black" }}>{service.Title}</Typography>
                            <ArrowForwardIosIcon sx={{ fontSize: 16, mr: 2 }} />
                        </Box>)
                    }

                </Paper>
            }
            {/* Modal */}
            <CategoryModal
                index={index}
                open={open}
                service={matchService}
                handleClose={handleClose}
                handleOpen={handleOpen}
            />
        </>
    );
};

export default ServiceCategory;