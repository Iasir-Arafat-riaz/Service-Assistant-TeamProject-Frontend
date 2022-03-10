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
const ThisWeekChart = ({ data }) => {


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
          <XAxis dataKey="date" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          {/* <Tooltip /> */}
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="price" fill="#8884d8" name="Everyday total income" background={{ fill: '#eee' }} />
        </BarChart>
      </Paper>

    </div>
  );
};

export default ThisWeekChart;
