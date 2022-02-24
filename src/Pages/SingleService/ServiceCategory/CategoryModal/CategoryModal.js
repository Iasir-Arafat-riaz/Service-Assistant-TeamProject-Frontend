import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, allData } from '../../../../redux/dataSlice/dataSlice';
import axios from 'axios';
import ServiceProvider from '../ServiceProvider/ServiceProvider';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

// box style
const box = {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 2,
    background: "#F4F5F8",
    mb: 4,
    pt: 1
};

const serviceOption = {
    mb: 3,
    display: "flex",
    justifyContent: 'space-between',
    borderBottom: '2px solid #F4F5F8',
    pb: 1,
    px: 2
};


const steps = ['Select category', 'Select a provider', 'Payment'];

const CategoryModal = ({ open, handleOpen, handleClose, index, service }) => {


    // stpper function
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };


    const matchService = service?.allServices[index];

    const dispatch = useDispatch();
    const handleAddToCart = (service) => {
        dispatch(addToCart(service))
    };





    const { singleServiceDetails } = useSelector(allData);

    console.log(activeStep)

    return (

        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>


                    <Box sx={{ display: 'flex', justifyContent: 'center', boxShadow: 3, mb: 3 }}>
                        <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 22, fontWeight: 'bold', p: 2 }} component="h2">
                            AC servicing
                        </Typography>
                    </Box>

                    <Button onClick={handleClose} sx={{ mt: -25, ml: -4 }}><CloseIcon sx={{ boxShadow: 3, fontSize: 26, p: 1, borderRadius: '50%', backgroundColor: 'white', color: 'black' }} /></Button>
                    <Grid container spacing={0}>

                        <Box sx={{ width: '100%' }}>
                            <Stepper nonLinear activeStep={activeStep}>
                                {steps.map((label, index) => (
                                    <Step key={index} completed={completed[index]}>
                                        <StepButton color="inherit" >
                                            {label}
                                        </StepButton>
                                    </Step>
                                ))}
                            </Stepper>
                            <div>
                                <React.Fragment>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        {/* <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button> */}
                                        {/* <Box sx={{ flex: '1 1 auto' }} /> */}
                                        {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                                            Next
                                        </Button> */}

                                    </Box>
                                </React.Fragment>
                            </div>
                        </Box>


                        {activeStep === 0 ? <Grid item xs={12} md={12} lg={7}>

                            <Box sx={box}>

                                <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 16, mb: 2 }} component="h2">
                                    {matchService?.Title}
                                </Typography>

                                <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 16, mb: 2 }} component="h2">
                                    {matchService?.Key.length} Options Avilable
                                </Typography>

                            </Box>

                            {
                                matchService?.Key.map(service => <Box key={service.Name} sx={serviceOption}>

                                    <Box>

                                        <Typography variant='h6' sx={{ fontSize: 16, letterSpacing: 1, fontWeight: 'bold' }}>{service?.Name}</Typography>

                                        <Typography variant='body2' sx={{ fontSize: 15 }}>{service?.Price}Tk</Typography>

                                    </Box>

                                    <Button sx={{ borderColor: "#FF5E14", color: "#FF5E14" }} variant='outlined' onClick={handleNext}>NEXT</Button>

                                </Box>)
                            }

                        </Grid>
                            :
                            activeStep === 1 ?
                                <Grid item xs={12} md={12} lg={7}>
                                    <ServiceProvider handleNext={handleNext} />
                                </Grid>
                                :
                                activeStep === 2
                                    ?
                                    <Grid item xs={12} md={12} lg={7}>

                                    </Grid>
                                    : ' '
                        }



                        <Grid item xs={12} md={12} lg={5} sx={{ background: "#F4F5F8" }}>

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                <img style={{ margin: '75px 0' }} src="https://i.ibb.co/gzTXmwt/Screenshot-15.png" alt="cartImagw" />


                                {/* <Grid container>
                                    <Grid item md={7}>
                                        <Typography variant='h6' sx={{ fontSize: 16, letterSpacing: 1, fontWeight: 'bold' }}>1 - 1.5 Ton</Typography>
                                    </Grid>
                                    <Grid item md={5}>
                                        <Typography variant='body2' sx={{ fontSize: 15 }}>500Tk</Typography>
                                    </Grid>
                                </Grid> */}
                            </Box>
                            <Button onClick={handleBack} style={{ letterSpacing: 2, width: '100%', padding: 6, background: "#fc7c41e0", borderRadius: 0, color: "#fff" }}>back</Button>

                        </Grid>

                    </Grid>

                </Box>
            </Modal>

        </>
    );
};

export default CategoryModal;