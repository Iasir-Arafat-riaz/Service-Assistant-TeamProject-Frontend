import { Paper, Typography, Button, Box, Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router-dom';
import CategoryModal from '../CategoryModal/CategoryModal';
import { useDispatch, useSelector } from 'react-redux';
import { allData, singleService } from '../../../../redux/dataSlice/dataSlice';
import './serviceCategory.css';

const ServiceCategory = ({ service }) => {

    const { serviceId } = useParams();
    const [index, setIndex] = useState(0);
    const [open, setOpen] = React.useState(false);
    const { singleServiceDetails, singleServiceLoading } = useSelector(allData);
    const [selectService, setSelectService] = useState({});
    const matchService = singleServiceDetails?.find(service => service.parentService == serviceId);

    // open modal
    const handleOpenModal = (index, service) => {
        setOpen(true);
        setSelectService(service);
        setIndex(index);
    };



    // close modal
    const handleClose = () => setOpen(false);

    // box style
    const box = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#f8f8f8',
        mb: 3,
        borderRadius: 2,
        p: 2
    };

    return (
        <>
            {singleServiceLoading ?
                <Box>
                    {
                        [...new Array(6)].map((ske, index) => <Skeleton key={index} sx={{ height: 70, mb: 3 }} animation="wave" />)
                    }
                </Box>
                :

                <Paper
                    className="categoryBox"
                    elevation={3}
                    sx={{
                        py: 5,
                        px: 2,
                        mr: 5,
                        top: '30%',
                        minWidth: '345px'

                    }}>
                       <Typography
                        variant='h5'
                        sx={{
                            fontWeight: "bold",
                            color: 'darkblue',
                            marginBottom:"10px"
                        }}>
                        For Order Click Below
                    </Typography>
                    <Typography
                        variant='h5'
                        sx={{
                            fontWeight: "bold",
                            color: '#fff'
                        }}>
                        {service.Title}
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            mb: 3,
                            p: 1,
                            fontSize: 17,
                            mt: 2,
                            border: '1px solid #FFF',
                            color: "#FFF"
                        }}>
                        {service.Rating} out of 5
                    </Button>


                    {
                        matchService?.allServices?.map((service, index) => <Box
                            onClick={() => handleOpenModal(index, service)}
                            sx={box} key={index}>
                            {/* <img type="button" src={service.Image} width="60" alt={service.Title} /> */}
                            
                            <Typography variant="h6" sx={{ fontSize: 15, fontWeight: 'bold', color: "black" }}>{service.Title}</Typography>
                            <ArrowForwardIosIcon sx={{ fontSize: 16, mr: 2 }} />
                        </Box>)
                    }

                </Paper>
            }
            {/* Modal */}
            
            <CategoryModal
                selectServiceId={matchService.parentService}
                index={index}
                selectService={selectService}
                open={open}
                service={matchService}
                handleClose={handleClose}
                handleOpen={handleOpenModal}
            />
        </>
    );
};

export default ServiceCategory;