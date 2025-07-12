import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RadarChartComponentProps {
  data: { subject: string; A: number; B?: number; fullMark?: number }[];
  width?: string | number;
  height?: string | number;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export const RadarChartComponent: React.FC<RadarChartComponentProps> = ({
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
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          {data[0]?.B !== undefined && (
            <Radar name="B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
          )}
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}; 