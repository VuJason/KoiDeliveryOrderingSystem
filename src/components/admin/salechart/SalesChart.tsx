import { Select } from "antd";
import React from "react";
import {
  Area,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./SalesChart.scss";

const { Option } = Select;

// Dummy sales data
const data = [
  { name: "5k", value: 20 },
  { name: "10k", value: 40 },
  { name: "15k", value: 50 },
  { name: "20k", value: 90 },
  { name: "25k", value: 60 },
  { name: "30k", value: 70 },
  { name: "35k", value: 30 },
  { name: "40k", value: 80 },
  { name: "45k", value: 60 },
  { name: "50k", value: 50 },
  { name: "55k", value: 70 },
  { name: "60k", value: 80 },
];

const SalesChart: React.FC = () => {
  return (
    <div className="sales-details-chart">
      <div className="header-saleschart">
        <h3>Sales Details</h3>
        <Select defaultValue="October" style={{ width: 120 }}>
          <Option value="October">October</Option>
          <Option value="September">September</Option>
          <Option value="August">August</Option>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#1890ff"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1890ff"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
