import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allData, saveService } from '../../../../redux/dataSlice/dataSlice';
import OrderInfo from '../../../SingleService/ServiceCategory/OrderInfo/OrderInfo';
import ServiceProvider from '../../../SingleService/ServiceCategory/ServiceProvider/ServiceProvider';



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


const steps = ['Selected service', 'Select a provider', 'Address', 'Payment'];

const SelectedServices = () => {

    const { user } = useSelector(allData);
    const [count, setCount] = React.useState(0);
    const navigate = useNavigate();
    // stpper function
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [selectedServices, setSelectedServices] = React.useState([]);
    const [category, steCategory] = React.useState({});

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



    const dispatch = useDispatch();



    React.useEffect(() => {
        setSelectedServices(JSON.parse(localStorage.getItem("selectedService")))
    }, [count])

    // console.log(selectedService)


    const handleStpperNext = category => {
        handleNext();
        steCategory(category);
    };


    // button style
    const button = {
        borderColor: "#FF5E14",
        color: "#FF5E14",
        marginRight: '15px'
    };

    const handleDeleteService = id => {
        // console.log(id)
        const matchService = selectedServices?.filter(service => service._id !== id);
        setCount(count + 1);
        // console.log(matchService);

        // localStorage.removeItem(matchService);
        // localStorage.setItem('')
        // localStorage.removeItem(matchService)
        localStorage.setItem('selectedService', JSON.stringify(matchService))
    }

    return (

        <Paper elevation={3} sx={{ p: 2 }}>







            <Box sx={{ width: '100%' }}>
                <Stepper sx={{ mb: 4 }} nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={index} completed={completed[index]}>
                            <StepButton color="inherit" >
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>

            </Box>


            {
                activeStep === 0
                    ?
                    <Box>

                        {
                            selectedServices?.map((service, index) => service?.email === user.email && <Box
                                sx={{ mb: 2, pb: 1, borderBottom: '1px solid #d0d0d0', display: 'flex', justifyContent: 'space-between' }}
                                key={index}
                            >

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                                    <img width='80' height='70' src={service?.parentService?.Image} alt={service.Title} />

                                    <Box>
                                        <Typography sx={{ fontSize: 17, mb: 0 }} variant="h6"> {service?.parentService?.Title}</Typography>
                                        <Typography sx={{ fontSize: 15 }} variant="h6"> {service?.Name}</Typography>
                                        <Typography sx={{ fontSize: 15 }} variant="h6"> {service?.Price} tk</Typography>
                                    </Box>

                                </Box>

                                <Button onClick={() => handleDeleteService(service._id)} variant='text'>
                                    <DeleteOutlineIcon sx={{ color: "black" }} />
                                </Button>

                            </Box>)

                        }


                    </Box>
                    :
                    activeStep === 1 ?
                        <Grid item xs={12} md={12} lg={7}>
                            <ServiceProvider category={category} handleNext={handleNext} />
                        </Grid>
                        :
                        activeStep === 3
                            ?
                            <Grid item xs={12} md={12} lg={7}>
                                {/* <Payment /> */}
                            </Grid>
                            : activeStep === 2
                                ?
                                <Grid item xs={12} md={12} lg={7}>
                                    <OrderInfo handleNext={handleNext} />
                                </Grid>
                                : ''
            }









        </Paper>
    );
};

export default SelectedServices;