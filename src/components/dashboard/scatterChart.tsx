import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ScatterChartComponentProps {
  data: { x: number; y: number; name?: string; }[];
  width?: string | number;
  height?: string | number;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export const ScatterChartComponent: React.FC<ScatterChartComponentProps> = ({
  data,
  width = '100%',
  height = 250,
  showLegend = true,
  showTooltip = true,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`} style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid />
          <XAxis dataKey="x" name="X" />
          <YAxis dataKey="y" name="Y" />
          {showTooltip && <Tooltip cursor={{ strokeDasharray: '3 3' }} />}
          {showLegend && <Legend />}
          <Scatter name="Sample Data" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}; 