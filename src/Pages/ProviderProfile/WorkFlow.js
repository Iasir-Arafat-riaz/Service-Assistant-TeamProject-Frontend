import { Box, Grid, Typography } from '@mui/material';
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
                    paddingBottom: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    mb:3
                }}
            >
                <Grid
                    container
                    spacing={2}>
                    <Grid
                        item
                        xs={12}
                        md={4}>
                        <Box className={classes.text}>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#022279'
                                }}> STEPS
                            </Typography>
                            <Typography
                                variant='h4'
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#FF5E14'
                                }}>How Service A2Z Works
                            </Typography>
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
                                sx={{ fontWeight: 'bold' }}>Describe Your Task
                            </Typography>
                        </Box>

                        <Typography>This helps us determine which Taskers are abest job.
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
                        <Typography>This helps us determine which Taskers are abest job.

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
                        <Typography>This helps us determine which Taskers are abest job.

                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider >
    );
};

export default WorkFlow;