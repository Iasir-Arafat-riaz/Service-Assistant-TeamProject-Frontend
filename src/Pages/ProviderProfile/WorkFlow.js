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

const useStyles = makeStyles({
    around: {
        backgroundColor: '#ffb600',
        width: '140px',
        height: '140px',
        borderRadius: '50px',
        lineHeight: '140px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        transform: 'rotate(135deg)',
        animation: 'toTopFromBottom 0.3s forwards'
    },
    icons: {
        textAlign: 'center',
        transform: 'rotate(220deg)'
    },
    task1: {
        marginTop: '70px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
    },
    task2: {
        marginTop: '170px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
    },
    task3: {
        marginTop: '240px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
    },
    text: {
        marginLeft: '20px',
        marginTop: '180px'
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
            <Box

                sx={{

                    backgroundImage: "url('https://i.ibb.co/Y3z6YTs/bg-curve.png')",
                    backgroundSize: 'auto',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingBottom: '100px',
                    mb: 3,
                    xs: { backgroundImage: 'none' }
                }}
            >
                <Grid
                    container
                    spacing={2}>
                    <Grid
                        item
                        xs={12}
                        md={4}>
                        <Box className={classes.text} >
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#022279'
                                }}> STEPS
                            </Typography>
                            {/* <Typography
                                variant='h4'
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#FF5E14'
                                }}>How Service A2Z Works
                                style={{textDecoration:'none'}}
                            </Typography> */}
                            <Link to='/services' style={{ textDecoration: 'none' }}>
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#FF5E14',

                                    }}>How Service A2Z Works
                                </Typography>
                            </Link>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={2}>
                        <Box className={classes.task1}>
                            <Box className={classes.around}>
                                <Box className={classes.icons}>
                                    <AssignmentOutlinedIcon
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

                        <Box className={classes.text2}>
                            <Typography
                                sx={{ fontWeight: 'bold', p: 1 }}>Describe Your Task
                            </Typography>
                        </Box>

                        <Typography sx={{ p: 1, textAlign: 'center' }}>
                            We explain to you how we serve your service. We Describe job responsibilities. Our professional representative will assist with the order procedure.
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={2}>
                        <Box className={classes.task2}>
                            <Box className={classes.around}>
                                <Box className={classes.icons}>
                                    <AccountCircleOutlinedIcon sx={{
                                        fontSize: '50px',
                                        borderStyle: 'none',
                                        height: 'auto ',
                                        maxWidth: '100% ',
                                        verticalAlign: 'middle ',

                                    }} />
                                </Box>
                            </Box>
                        </Box>
                        <Box className={classes.text2}>
                            <Typography
                                sx={{ fontWeight: 'bold' }}>Choose a Tasker</Typography>
                        </Box>
                        <Typography sx={{ p: 1, textAlign: 'center' }}>Our representative will help you to choose a tasker or provider.  The provider will serve you your order.
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={2}>
                        <Box className={classes.task3}>
                            <Box className={classes.around}>
                                <Box className={classes.icons}>
                                    <PsychologyOutlinedIcon sx={{
                                        fontSize: '50px',
                                        borderStyle: 'none',
                                        height: 'auto ',
                                        maxWidth: '100% ',
                                        verticalAlign: 'middle ',

                                    }} />
                                </Box>
                            </Box>
                        </Box>
                        <Box className={classes.text2}>
                            <Typography sx={{ fontWeight: 'bold' }} >Live Smarter</Typography></Box>
                        <Typography sx={{ p: 1, textAlign: 'center' }}>
                            Our chat system will help you to know your query in a short time. Our helpline executive will assist with your query and help you to choose a service.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider >
    );
};

export default WorkFlow;