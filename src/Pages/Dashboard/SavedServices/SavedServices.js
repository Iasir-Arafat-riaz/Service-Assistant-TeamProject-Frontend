import { CardActionArea, Typography, CardMedia, CardContent, Grid, Card, Button, Checkbox, Stepper, Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import StepContent from '@mui/material/StepContent';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { allData, serviceProviders } from '../../../redux/dataSlice/dataSlice';
import './SavedServices.css';
import SelectedServices from './SelectedServices/SelectedServices';
import OrderInfo from '../../SingleService/ServiceCategory/OrderInfo/OrderInfo';
import PaymentService from './PaymentService/PaymentService';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';




const steps = [
    {
        label: 'Select Service',
        step: 'First'
    },
    {
        label: 'My Selection',
        step: 'Second'
    },
    {
        label: 'Order Information',
        step: 'Third'
    },
    {
        label: 'Select Provider',
        step: 'Fourth'
    },
    {
        label: 'Payment',
        step: 'Fifth'
    },
];


const SavedServices = () => {

    const { providers, singleServiceDetail, orderInfo } = useSelector(allData);
    const [selectedService, setSelectedService] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [count, setCount] = useState(0);
    const [orderService, setOrderService] = useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { providers, serviceProviderLoading, singleServiceDetail, user } = useSelector(allData);

    useEffect(() => {
        if (singleServiceDetail._id) {
            dispatch(serviceProviders(singleServiceDetail.serviceProvider));
        }
    }, [dispatch, singleServiceDetail])


    const handleNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    // const [savedService, setSavedService] = useState([]);

    // const { providers, serviceProviderLoading, singleServiceDetail, user } = useSelector(allData);

    // useEffect(() => {
    //     if (singleServiceDetail._id) {
    //         dispatch(serviceProviders(singleServiceDetail.serviceProvider));
    //     }
    // }, [dispatch, singleServiceDetail])

    // input checked
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    // setCheckInput(false);
    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem('cartItems')));
        // const getItems = JSON.parse(localStorage.getItem("selectedService"));
    }, [count])

    const handleAddService = service => {
        setSelectedService([...selectedService, service])
        setCount(count + 1)
        // localStorage.setItem('selectedService', JSON.stringify(selectedService))
    };

    const handleDeleteSelectService = id => {
        swal({
            text: "Are you sure?",
            buttons: true,
            icon: "warning",
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const matchService = selectedService?.filter(service => service.subId !== id);
                localStorage.setItem('cartItems', JSON.stringify(matchService))
                setCount(count + 2);
                setSelectedService(matchService);
            }
        })
    };


    // select provider function
    const handleSelectedProvider = provider => {
        handleNextStep();
        for (const service of selectedService) {
            setOrderService([...orderService, { ...service, providerEmail: provider.email, orderInfo, date: new Date(), status: 'pending', }])
        };
    };

    // style
    const serviceProvider = {
        mb: 3,
        display: "flex",
        justifyContent: 'space-between',
        borderBottom: '2px solid #F4F5F8',
        pb: 1,
        px: 2
    };

    const stpperButton = {
        letterSpacing: 3,
        marginTop: 15,
        borderColor: "#FF5E14",
        color: "#FF5E14",
        borderRadius: 0,
    };



    return (
        <>
            {
                cartItems.length === 0 ? <Box>

                    <Typography variant='h6'>You don't saved any service</Typography>

                    <Button variant='outlined'
                        onClick={() => navigate('/services')}
                        style={{
                            borderColor: "#FF5E14",
                            color: "#FF5E14",
                            marginTop: 15,
                            letterSpacing: 2
                        }}>
                        SERVICES
                    </Button>

                </Box>
                    :
                    <Grid container className="save_service">

                        <Grid item xs={12} md={4} lg={2}>


                            <Box>

                                <Stepper activeStep={activeStep} orientation="vertical">
                                    {
                                        steps.map(({ step, label }, index) => (
                                            <Step key={label}>
                                                <StepLabel className={activeStep === index ? "selected_step" : null}>
                                                    <Typography className='step_text' variant='body2'>{label}</Typography>
                                                    <Typography variant="caption">{step} step</Typography>
                                                </StepLabel>
                                                <StepContent TransitionProps={{ unmountOnExit: false }} >

                                                </StepContent>
                                            </Step>
                                        ))
                                    }
                                </Stepper>

                                {
                                    selectedService.length > 0 && activeStep !== 4 && <Button variant='outlined' style={stpperButton} sx={{ width: { xs: "50%", lg: "90%" } }} onClick={handleNextStep}> NEXT </Button>
                                }

                                {
                                    activeStep > 0 && <Button sx={{ width: { xs: "50%", lg: "90%" } }} variant='outlined' style={stpperButton} onClick={handleBack}> BACK </Button>
                                }

                            </Box>


                        </Grid>

                        <Grid item xs={12} md={8} lg={10} sx={{ background: "#F4F5F8", height: "100vh", pl: 5, pt: 2 }}>

                            {
                                activeStep === 0 && <>

                                    <Typography variant='h6' sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}>Please select service</Typography>

                                    <Grid container spacing={3}>

                                        {
                                            cartItems?.map((service, index) => <Grid item key={service._id} lg={4} xs={12} xl={3}>


                                                <Card sx={{ width: "100%", mb: 4 }}>


                                                    <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image={service?.parentService?.Image}
                                                        alt="serviceImage"
                                                    />

                                                    <Checkbox sx={{ mt: '-75%', color: "#F9F9F9" }} onClick={() => handleAddService(service)} {...label} />

                                                    <CardContent>

                                                        <Typography gutterBottom variant="h6" component="div">
                                                            {service?.parentService?.Title}
                                                        </Typography>

                                                        <Typography sx={{ fontSize: 15, fontWeight: 'bold', mb: 1 }} variant="h6">Category: {service?.Name}</Typography>

                                                        <Typography sx={{ fontSize: 15, fontWeight: 'bold' }} variant="h6">Price: {service?.Price} tk</Typography>

                                                    </CardContent>

                                                </Card>
                                            </Grid>
                                            )
                                        }

                                    </Grid>
                                </>
                            }


                            {
                                activeStep === 1 && <SelectedServices
                                    selectedServices={selectedService}
                                    handleDeleteSelectService={handleDeleteSelectService}
                                />
                            }

                            {
                                activeStep === 2 && <Box sx={{ width: { lg: '60%', xl: "50%" }, background: "#fff", boxShadow: 1 }}>
                                    <Typography sx={{ ml: 2, pt: 1 }} variant='h6'>Order Information</Typography>
                                    <OrderInfo handleNext={handleNextStep} title="SUBMIT" />
                                </Box>
                            }

                            {
                                activeStep === 3 && <Box sx={{ width: { xs: "100%", md: '50%' }, boxShadow: 1, backgroundColor: "#fff", p: 2 }}>

                                    <Typography variant='h6' sx={{ fontSize: 18, mb: 2, letterSpacing: 1, fontWeight: 'bold', ml: 2, borderBottom: '2px solid #F4F5F8', }}>Select a provider </Typography>

                                    {
                                        providers.map((provider) => <Box key={provider._id} sx={serviceProvider}>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar sx={{ width: 50, height: 50 }} alt="privder image" src={provider.photoURL} />
                                                <Box>
                                                    <Typography variant='h6' sx={{ fontSize: 16, letterSpacing: 1, fontWeight: 'bold' }}>{provider?.displayName}</Typography>

                                                    <Typography variant='body2' sx={{ fontSize: 15 }}>{provider?.email}</Typography>
                                                </Box>

                                            </Box>

                                            <Button
                                                onClick={() => handleSelectedProvider(provider)}
                                                style={{
                                                    borderColor: "#FF5E14",
                                                    color: "#FF5E14"
                                                }}
                                                variant='outlined'
                                            >
                                                NEXT
                                            </Button>

                                        </Box>
                                        )
                                    }
                                </Box>
                            }


                            {
                                activeStep === 4 && <PaymentService
                                    handleNextStep={handleNextStep}
                                    orderService={orderService}
                                />
                            }



                        </Grid>




                    </Grid>
            }
        </>
    );
};

export default SavedServices;