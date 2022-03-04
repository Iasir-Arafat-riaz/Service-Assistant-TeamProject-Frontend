import { Grid, Paper, Typography } from "@mui/material";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
const ThisWeekChart = () => {
    const data = [
        {
          name: 'Sat',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Sun',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Mon',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Tue',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Wed',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Thu',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Fri',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
      
  return (
    <div>
        <Paper elevation={3} sx={{ p: 2, }} >
        <Typography gutterBottom variant='h6'>Last Week income</Typography>
        <BarChart
          width={500}
          height={230}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          {/* <Tooltip /> */}
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
        </Paper>
      
    </div>
  );
};

export default ThisWeekChart;
