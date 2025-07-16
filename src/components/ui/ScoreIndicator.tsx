import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreIndicatorProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ 
  score, 
  size = 'md', 
  showLabel = true 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        'rounded-full flex items-center justify-center font-semibold',
        getScoreColor(score),
        sizeClasses[size]
      )}>
        {score}
      </div>
      {showLabel && (
        <span className="text-sm text-gray-600">
          Lead Score
        </span>
      )}
    </div>
  );
};