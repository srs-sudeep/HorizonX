import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface PieChartComponentProps {
  data: ChartData[];
  width?: string | number;
  height?: string | number;
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  animationDuration?: number;
  className?: string;
}

const DEFAULT_COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#00ff00',
  '#ff00ff',
  '#00ffff',
  '#ff0000',
  '#0000ff',
  '#ffff00',
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const total = payload[0].payload.total || 0;
    const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : 0;

    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold">{data.name}</p>
        <p className="text-sm">
          Value: <span className="font-medium">{data.value}</span>
        </p>
        <p className="text-sm">
          Percentage: <span className="font-medium">{percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  width = '100%',
  height = 400,
  showLegend = true,
  showTooltip = true,
  innerRadius = 0,
  outerRadius = 80,
  animationDuration = 800,
  className = '',
}) => {
  // Calculate total for percentage calculations
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  // Add colors and total to data if not provided
  const processedData = data.map((item, index) => ({
    ...item,
    color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    total: totalValue,
  }));

  return (
    <div className={`w-full ${className}`} style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={processedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={showLabels ? renderLabel : false}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={animationDuration}
          >
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
