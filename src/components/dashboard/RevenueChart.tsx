import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample data for the chart
const data = [
  { name: '10/08', value: 2.0 },
  { name: '12/08', value: 4.0 },
  { name: '15/04', value: 3.5 },
  { name: '17/08', value: 5.0 },
  { name: '20/08', value: 3.0 },
  { name: '22/08', value: 2.5 },
];

const RevenueChart = () => {
  return (
    <Card className="col-span-12 lg:col-span-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Revenue Updates</CardTitle>
          <p className="text-sm text-muted-foreground">Overview of Profit</p>
        </div>
        <div className="flex items-center">
          <select className="bg-transparent text-sm border border-input rounded-md h-8 px-2">
            <option value="march2023">March 2023</option>
            <option value="april2023">April 2023</option>
            <option value="may2023">May 2023</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1E40AF"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
            <p className="text-sm">Total earnings</p>
            <p className="ml-auto text-lg font-bold">$63,489.50</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
            <p className="text-sm">Earnings this month</p>
            <p className="ml-auto text-lg font-medium">$48,820</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-300"></span>
            <p className="text-sm">Expense this month</p>
            <p className="ml-auto text-lg font-medium">$26,498</p>
          </div>

          <button className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2 w-full md:w-auto md:self-end">
            View Full Report
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
