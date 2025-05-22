import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 50 },
  { name: 'May', value: 45 },
  { name: 'Jun', value: 60 },
  { name: 'Jul', value: 55 },
];

const CustomersSection = () => {
  return (
    <Card className="col-span-12 md:col-span-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Customers</CardTitle>
        <div className="flex items-center">
          <span className="text-2xl font-bold">36,358</span>
          <span className="ml-2 bg-success-100 text-success-600 text-xs px-2 py-1 rounded">
            +9%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0EA5E9"
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomersSection;
