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
import { addToCart, allData, saveService } from '../../../../redux/dataSlice/dataSlice';
import './CategoryModal.css';
import ServiceProvider from '../ServiceProvider/ServiceProvider';
import Payment from '../../payment/Payment/Payment';
import OrderInfo from '../OrderInfo/OrderInfo';
import { useNavigate } from 'react-router-dom';


// modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflowY: 'scroll',
    overflowX: 'hidden',
    width: { xs: '100%', lg: '70%', xl: '50%' },
};

// box style
const box = {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 2,
    background: "#F4F5F8",
    mb: 4,
    pt: 1,

};

const serviceOption = {
    mb: 3,
    display: "flex",
    justifyContent: 'space-between',
    borderBottom: '2px solid #F4F5F8',
    pb: 1,
    px: 2
};


const steps = ['Select category', 'Select a provider', 'Address', 'Payment'];

const CategoryModal = ({ open, handleOpen, handleClose, index, service, selectService, selectServiceId }) => {

    const { user } = useSelector(allData);
    const navigate = useNavigate();
    const [category, steCategory] = React.useState({});
    // stpper function
    const [activeStep, setActiveStep] = React.useState(0);
    const [isAdded, setIsAdded] = React.useState(0);
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
                ?
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };


    const matchService = service?.allServices[index];

    const dispatch = useDispatch();

    const handleSaveService = (service, id) => {
        setIsAdded(id);
        dispatch(addToCart({ ...service, email: user.email, parentService: selectService, selectServiceId: selectServiceId }));
    };
    // handleReset
    const handleCloseModal = () => {
        handleClose();
        handleReset();
    };


    const handleStpperNext = category => {
        if(user.email == null) return navigate('/login')
        handleNext();
        steCategory(category);
    };


    // button style
    const button = {
        borderColor: "#FF5E14",
        color: "#FF5E14",
        marginRight: '15px'
    };

    // increase and decrease function
    function increaseValue(service, id) {
        var value = parseInt(document.getElementById('number').value, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        document.getElementById('number').value = value;
        handleSaveService(service, id);
    }

    function decreaseValue() {
        var value = parseInt(document.getElementById('number').value, 10);
        value = isNaN(value) ? 0 : value;
        // value < 1 ? value = 1 : '';
        if (value > 1) {
            value--;
        }
        document.getElementById('number').value = value;
    }

    return (

        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{maxHeight:600,overflowY:'scroll'}}>


                    <Box sx={{ display: 'flex', justifyContent: 'center', boxShadow: 3, mb: 3, }}>

                        <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 22, fontWeight: 'bold', p: 2 }} component="h2">
                        {matchService?.Title}
                        </Typography>

                    </Box>

                    <Button onClick={handleCloseModal} sx={{ mt: -20, ml: -1 }}><CloseIcon sx={{ boxShadow: 3, fontSize: 26, p: 1, borderRadius: '50%', backgroundColor: 'white', color: 'black' }} /></Button>

                    <Grid container spacing={0}>

                        <Box sx={{ width: '100%' }}>
                            <Stepper sx={{ mb: 1 }} nonLinear activeStep={activeStep}>
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

                                    </Box>
                                </React.Fragment>
                            </div>
                        </Box>


                        {
                            activeStep === 0 ? <Grid item xs={12} md={12} lg={7}>

                                <Box sx={box}>

                                    <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 16, mb: 2, letterSpacing: 1 }} component="h2">
                                        {matchService?.Title}
                                    </Typography>

                                    <Typography id="modal-modal-title" variant="h6" sx={{ fontSize: 16, mb: 2, letterSpacing: 1 }} component="h2">
                                        {matchService?.Key.length} Options Avilable
                                    </Typography>

                                </Box>

                                {
                                    matchService?.Key.map((service, index) => <Box key={service._id} sx={serviceOption}>

                                        <Box>

                                            <Typography variant='h6' sx={{ fontSize: 16, letterSpacing: 1, fontWeight: 'bold' }}>{service?.Name}</Typography>

                                            <Typography variant='body2' sx={{ fontSize: 15 }}>{service?.Price}Tk</Typography>

                                        </Box>

                                        <Box>

                                            {
                                                isAdded !== service.subId ? <Button
                                                    onClick={() => handleSaveService(service, service.subId)}
                                                    style={button} variant='outlined'>
                                                    SAVE
                                                </Button>

                                                    :

                                                    <form className='quatntity-button '>
                                                        <div class="value-button" id="decrease" onClick={decreaseValue} value="Decrease Value">-</div>
                                                        <input type="number" id="number" value="1" />
                                                        <div class="value-button" id="increase" onClick={() => increaseValue(service, service.subId)} value="Increase Value">+</div>
                                                    </form>
                                            }

                                            <Button style={button} variant='outlined' onClick={() => handleStpperNext(service)}
                                            >
                                                NEXT
                                            </Button>

                                        </Box>

                                    </Box>)
                                }

                            </Grid>
                                :
                                activeStep === 1 ?
                                    <Grid item xs={12} md={12} lg={7}>
                                        <ServiceProvider
                                            selectServiceId={selectServiceId}
                                            selectService={selectService}
                                            category={category}
                                            handleNext={handleNext}
                                        />
                                    </Grid>
                                    :
                                    activeStep === 3
                                        ?
                                        <Grid item xs={12} md={12} lg={7}>
                                            <Payment />
                                        </Grid>
                                        : activeStep === 2
                                            ?
                                            <Grid item xs={12} md={12} lg={7}>
                                                <OrderInfo handleNext={handleNext} />
                                            </Grid>
                                            : ''
                        }



                        <Grid item xs={12} md={12} lg={5} sx={{ background: "#F4F5F8" }}>

                            {
                                activeStep === 0 || activeStep === 1 || activeStep === 2 || activeStep === 3 ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                    <img style={{ margin: '75px 0' }} src="https://i.ibb.co/gzTXmwt/Screenshot-15.png" alt="cartImage" />

                                </Box>
                                    :
                                    <Box>

                                    </Box>
                            }

                            {
                                activeStep > 0 && <Button onClick={handleBack} style={{ letterSpacing: 2, width: '100%', padding: 6, background: "#fc7c41e0", borderRadius: 0, color: "#fff" }}>back</Button>
                            }



                        </Grid>

                    </Grid>

                </Box>
            </Modal>

        </>
    );
};

export default CategoryModal;