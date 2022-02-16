import React from 'react';
import { Area, AreaChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Box, Container, Stack, Grid, Paper, Typography, IconButton } from '@mui/material';

const data01 = [
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 500 },
    { name: 'Group D', value: 200 },
    { name: 'Group r', value: 400 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RoundedServiceCart = () => {
    return (
        <Paper elevation={3} >
            <Typography variant='body1' pt={2} ml={2}>Overall Service</Typography>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart >
                    <Pie
                        data={data01}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data01.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>

            </ResponsiveContainer>
            {
                data01.map((entry, i) =>
                    <Box px={2}>
                        <Stack
                            sx={{
                                borderTop: '1px solid #bfbfbf',
                                py: 1,
                            }}
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Box

                            >
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        background: COLORS[i],
                                        p: .8,
                                        borderRadius: '100%',
                                    }}  ></Box>
                                <Typography ml={1} component={'span'}>{entry?.name}</Typography>

                            </Box>
                            <Typography ml={1} component={'span'}>{entry?.value}</Typography>
                        </Stack>
                    </Box>)
            }
        </Paper>
    );
};

export default RoundedServiceCart;