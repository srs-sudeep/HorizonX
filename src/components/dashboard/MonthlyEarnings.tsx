import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 600 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 780 },
  { name: 'May', value: 400 },
  { name: 'Jun', value: 600 },
  { name: 'Jul', value: 800 },
  { name: 'Aug', value: 700 },
];

const MonthlyEarnings = () => {
  return (
    <Card className="col-span-12 md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Monthly Earnings</CardTitle>
        </div>
        <button className="bg-blue-100 text-blue-500 rounded-full p-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.0001 17.3802C11.5601 17.3802 11.2001 17.0302 11.2001 16.5802C11.2001 16.1302 11.5601 15.7802 12.0001 15.7802C12.4401 15.7802 12.8001 16.1302 12.8001 16.5802C12.8001 17.0302 12.4401 17.3802 12.0001 17.3802Z"
              fill="currentColor"
            />
            <path
              d="M12 13.98V7.97998"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold">$6,820</h3>
          <p className="text-sm">
            <span className="text-success-500 mr-1">+9% </span>
            <span className="text-muted-foreground">last year</span>
          </p>
        </div>

        <div className="h-[120px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0EA5E9"
                fillOpacity={1}
                fill="url(#colorMonthly)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyEarnings;
