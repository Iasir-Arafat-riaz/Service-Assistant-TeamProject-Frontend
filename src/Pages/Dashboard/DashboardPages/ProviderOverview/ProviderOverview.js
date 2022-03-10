import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CountUp from 'react-countup';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import OrdersTable from '../../DashboardComponents/OrdersTable/OrdersTable';
import RoundedServiceCart from '../../DashboardComponents/GraphCharts/RoundedServiceCart';
import ThisWeekChart from './ProviderOverviewComponents/ThisWeekChart/ThisWeekChart';
import ProviderOrderTable from './ProviderOverviewComponents/ProviderOrderTable/ProviderOrderTable';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { allData, } from '../../../../redux/dataSlice/dataSlice';
import { recentMoment, todayEarning, totalApproveOrders, totalEarning, totalOrders, totalSales } from '../../../../utilities/dataAnalize';


const ProviderOverview = () => {
    const { user } = useSelector(allData);
    const [approve, setApprove] = useState([])
    const [allInfo, setAllInfo] = useState({
        last7Days: [],
        last7DaysSales: 0,
    })

    useEffect(() => {
        const pendingOrders = axios.get(`http://localhost:5000/provider/pending/appointment/${user.email}`);
        const approvedOrders = axios.get(`http://localhost:5000/provider/approved/appointment/${user.email}`);
        const completedOrders = axios.get(`http://localhost:5000/provider/completed/appointment/${user.email}`);
        axios.all([pendingOrders, approvedOrders, completedOrders])
            .then(
                axios.spread((...responses) => {
                    const pendingOrdersData = responses[0].data
                    const approvedOrdersData = responses[1].data
                    const completedOrdersData = responses[2].data
                    console.log(approvedOrdersData);
                    setApprove(approvedOrdersData)
                    setAllInfo({
                        last7Days: recentMoment(approvedOrdersData),
                        last7DaysSales: totalEarning(approvedOrdersData),
                        todayEaring: todayEarning(approvedOrdersData),
                        ongoingOrders: approvedOrdersData.length,
                        totalServed: completedOrdersData.length,
                        pendingOrders: pendingOrdersData.length,
                    })
                })
            )
    }, [user])
    console.log(allInfo);
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                    <ThisWeekChart data={allInfo.last7Days} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >This Week Sales</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}>
                                        <AttachMoneyIcon></AttachMoneyIcon>
                                    </IconButton>
                                </Box>
                                <Typography variant='h5' gutterBottom><CountUp end={allInfo.last7DaysSales} />Tk</Typography>
                                <Typography color='red' variant='body1' component={'span'}>Bad</Typography>
                                <Typography variant='body1' component={'span'}> Since last week</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >Today's Earning</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}
                                    > <AttachMoneyIcon></AttachMoneyIcon></IconButton>
                                </Box>
                                <Typography variant='h5' gutterBottom><CountUp end={allInfo.todayEaring} />Tk</Typography>
                                <Typography color='hsl(120deg 30% 75%)' variant='body1' component={'span'}>Good</Typography>
                                <Typography variant='body1' component={'span'}> Since last week</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >Ongoing Orders</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}
                                    > <HomeRepairServiceIcon></HomeRepairServiceIcon></IconButton>
                                </Box>
                                <Typography variant='h5' gutterBottom><CountUp end={allInfo.ongoingOrders} /></Typography>
                                <Typography color='hsl(120deg 30% 75%)' variant='body1' component={'span'}><CountUp end={allInfo.pendingOrders} /></Typography>
                                <Typography variant='body1' component={'span'}> Pending Orders</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Typography variant='body1' >Total Served</Typography>
                                    <IconButton
                                        sx={{
                                            background: 'hsl(215deg 69% 90%)',
                                            color: 'hsl(215deg 70% 71%)'
                                        }}
                                    > <LocalGroceryStoreIcon></LocalGroceryStoreIcon></IconButton>
                                </Box>
                                <Typography variant='h5' gutterBottom><CountUp end={allInfo.totalServed} /></Typography>

                                <Typography variant='body1' component={'span'}> LifeTime Orders</Typography>
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>


                <Grid item xs={12} md={12}>
                    <ProviderOrderTable data={approve} />
                </Grid>

            </Grid>


        </>
    );
};

export default ProviderOverview;