import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 60 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 70 },
  { name: 'May', value: 55 },
  { name: 'Jun', value: 65 },
  { name: 'Jul', value: 75 },
];

const ProjectsSection = () => {
  return (
    <Card className="col-span-12 md:col-span-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Projects</CardTitle>
        <div className="flex items-center">
          <span className="text-2xl font-bold">78,298</span>
          <span className="ml-2 bg-success-100 text-success-600 text-xs px-2 py-1 rounded">
            +9%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsSection;
