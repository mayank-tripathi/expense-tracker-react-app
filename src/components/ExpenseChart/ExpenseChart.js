import { Typography, Box } from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const ExpenseChart = (props) => {
  return (
    <Box mt={5}>
      {props.chartData.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={300}
        >
          <Typography variant="body1" color="secondary">
            Loading chart...
          </Typography>
        </Box>
      )}
      {props.chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={props.chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="TotalExpense"
              stroke="#c64756"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};
