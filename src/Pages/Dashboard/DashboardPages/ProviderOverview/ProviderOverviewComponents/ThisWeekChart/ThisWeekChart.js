
import React from 'react';
import { Box, Container, Stack, Grid, Paper, Typography, IconButton } from '@mui/material';

import { Area, AreaChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    {
        "name": "1",
        "uv": 4000,
        "income": 2400,
        "amt": 2400
    },
    {
        "name": "2",
        "uv": 3000,
        "income": 1398,
        "amt": 2210
    },
    {
        "name": "3",
        "uv": 2000,
        "income": 9800,
        "amt": 2290
    },
    {
        "name": "4",
        "uv": 2780,
        "income": 3908,
        "amt": 2000
    },
    {
        "name": "5",
        "uv": 1890,
        "income": 4800,
        "amt": 2181
    },
    {
        "name": "6",
        "uv": 2390,
        "income": 3800,
        "amt": 2500
    },
    {
        "name": "7",
        "uv": 3490,
        "income": 4300,
        "amt": 2100
    }
]
const ThisWeekChart = () => {
    return (
        <Paper elevation={3} sx={{ p: 2, }} >
            <Typography gutterBottom variant='h6'>This Week</Typography>
            <ResponsiveContainer width="100%" height={220}>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="income" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default ThisWeekChart;