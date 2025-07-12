import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface RadialBarChartComponentProps {
  data: { name: string; value: number; fill?: string }[];
  width?: string | number;
  height?: string | number;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export const RadialBarChartComponent: React.FC<RadialBarChartComponentProps> = ({
  data,
  width = '100%',
  height = 320,
  showLegend = true,
  showTooltip = true,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`} style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="50%" outerRadius="100%" barSize={18} data={data} startAngle={180} endAngle={0}>
          <RadialBar label={{ fill: '#333', position: 'insideStart', fontSize: 12 }} dataKey="value" />
          {showTooltip && <Tooltip />}
          {showLegend && <Legend iconSize={14} layout="vertical" verticalAlign="middle" align="right" />}
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}; 