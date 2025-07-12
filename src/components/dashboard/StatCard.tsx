import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  className?: string;
  iconColor?: string;
}

export const StatCard = ({ icon, title, value, className, iconColor }: StatCardProps) => {
  return (
    <div className={cn('stat-card border p-4 ', className)}>
      <div className="flex items-start justify-between">
        <p className="stat-title">{title}</p>
        <div className={cn('p-2 rounded-md', iconColor || 'bg-blue-100')}>{icon}</div>
      </div>
      <p className="stat-value">{value}</p>
    </div>
  );
};
