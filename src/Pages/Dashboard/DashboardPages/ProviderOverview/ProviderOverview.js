import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CountUp from 'react-countup';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import OrdersTable from '../../DashboardComponents/OrdersTable/OrdersTable';
import RoundedServiceCart from '../../DashboardComponents/GraphCharts/RoundedServiceCart';
import ThisWeekChart from './ProviderOverviewComponents/ThisWeekChart/ThisWeekChart';


const ProviderOverview = () => {
    return (
        <>
            <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
                    <ThisWeekChart/>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >Sales</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}>
                                             <DirectionsCarIcon></DirectionsCarIcon>
                                             </IconButton>
                                </Box>
                                <Typography variant='h5' gutterBottom><CountUp end={2540} /></Typography>
                                <Typography color='red' variant='body1' component={'span'}>-3.25%</Typography>
                                <Typography variant='body1' component={'span'}> Since last week</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >Earning</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}
                                    > <AttachMoneyIcon></AttachMoneyIcon></IconButton>
                                </Box>
                                <Typography variant='h5' gutterBottom>$<CountUp end={4130} /></Typography>
                                <Typography color='hsl(120deg 30% 75%)' variant='body1' component={'span'}>2.8%</Typography>
                                <Typography variant='body1' component={'span'}> Since last week</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >Service Provider</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}
                                    > <HomeRepairServiceIcon></HomeRepairServiceIcon></IconButton>
                                </Box>
                                <Typography variant='h5' gutterBottom><CountUp end={347} /></Typography>
                                <Typography color='hsl(120deg 30% 75%)' variant='body1' component={'span'}>58</Typography>
                                <Typography variant='body1' component={'span'}> Added recently</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >Orders</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}
                                    > <LocalGroceryStoreIcon></LocalGroceryStoreIcon></IconButton>
                                </Box>
                                <Typography variant='h5' gutterBottom><CountUp end={554} /></Typography>
                                <Typography color='red' variant='body1' component={'span'}>-5.7%</Typography>
                                <Typography variant='body1' component={'span'}> Since last week</Typography>
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>
                
                <Grid item xs={12} md={3}>
                    <RoundedServiceCart></RoundedServiceCart>
                </Grid>
                <Grid item xs={12} md={9}>
                    <OrdersTable></OrdersTable>
                </Grid>

            </Grid>


        </>
    );
};

export default ProviderOverview;