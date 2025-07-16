import React from 'react';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  qualified: 'bg-green-100 text-green-800 hover:bg-green-200',
  proposal: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  closed: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
  lost: 'bg-red-100 text-red-800 hover:bg-red-200',
  active: 'bg-green-100 text-green-800 hover:bg-green-200',
  paused: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  completed: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  high: 'bg-red-100 text-red-800 hover:bg-red-200',
  medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  low: 'bg-green-100 text-green-800 hover:bg-green-200'
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default' }) => {
  const colorClass = statusColors[status as keyof typeof statusColors];
  
  return (
    <Badge 
      variant={variant} 
      className={cn(
        'font-medium capitalize',
        colorClass && colorClass
      )}
    >
      {status}
    </Badge>
  );
};