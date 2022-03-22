import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import './WorkFlow.css';

const useStyles = makeStyles({

    icons: {
        textAlign: 'center',
        transform: 'none'
        // transform: 'rotate(-135deg)'
    },
    text: {
        marginLeft: '20px',
    },

    text2: {

        color: '#FF5E14',
        textAlign: 'center',

    },

});

const WorkFlow = () => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Box className='service-area' >
                <Grid
                    sx={{ mb: 5 }}
                    container
                    spacing={2}>
                    <Grid
                        item
                        xs={12}
                        md={4}>
                        <Box className={classes.text} >
                            <Typography
                                className='sub-title'
                            > STEPS
                            </Typography>

                            <Link to='/services'
                                style={{ textDecoration: 'none' }}>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#FF5E14',

                                    }}>How Service A2Z Works
                                </Typography>
                            </Link>

                            <Link to='/services'
                                style={{ textDecoration: "none" }}>
                                <Button
                                    type="submit"
                                    variant='contained'
                                    sx={{ borderRadius: 28, }}
                                    style={{ backgroundColor: "#FF5E14", }}
                                >Our Services
                                </Button>
                            </Link>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={2}>

                        <Box >
                            <Box className='position-1'>
                                <Box className="step-around">
                                    <Box className={classes.icons}>
                                        <AssignmentOutlinedIcon
                                            className='img-rotate'
                                            sx={{
                                                fontSize: '50px',
                                                borderStyle: 'none',
                                                height: 'auto ',
                                                maxWidth: '100%',
                                                verticalAlign: 'middle',
                                            }} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box className='step-section'>
                            <Box className={classes.text2}>
                                <Typography
                                    sx={{ fontWeight: 'bold', p: 1 }}>Describe Your Task
                                </Typography>
                            </Box>

                            <Typography sx={{ p: 1, textAlign: 'center' }}>
                                We explain to you how we serve your service. We Describe job responsibilities. Our professional representative will assist with the order procedure.
                            </Typography>

                        </Box>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={2}>
                        <Box >
                            <Box className='position-2'>
                                <Box className="step-around">
                                    <Box className={classes.icons}>
                                        <AccountCircleOutlinedIcon
                                            className='img-rotate'
                                            sx={{
                                                fontSize: '50px',
                                                borderStyle: 'none',
                                                height: 'auto ',
                                                maxWidth: '100%',
                                                verticalAlign: 'middle',
                                            }} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className='step-section'>
                            <Box className={classes.text2}>
                                <Typography
                                    sx={{ fontWeight: 'bold' }}>Choose a Tasker</Typography>
                            </Box>

                            <Typography sx={{ p: 1, textAlign: 'center' }}>Our representative will help you to choose a tasker or provider.  The provider will serve you your order.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={2}>
                        <Box >
                            <Box className='position-3'>
                                <Box className="step-around">
                                    <Box className={classes.icons}>
                                        <PsychologyOutlinedIcon
                                            className='img-rotate'
                                            sx={{
                                                fontSize: '50px',
                                                borderStyle: 'none',
                                                height: 'auto ',
                                                maxWidth: '100%',
                                                verticalAlign: 'middle',
                                            }} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className='step-section'>
                            <Box className={classes.text2}>
                                <Typography sx={{ fontWeight: 'bold' }} >Live Smarter</Typography></Box>
                            <Typography sx={{ p: 1, textAlign: 'center' }}>
                                Our chat system will help you to know your query in a short time. Our helpline executive will assist with your query and help you to choose a service.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider >
    );
};

export default WorkFlow;