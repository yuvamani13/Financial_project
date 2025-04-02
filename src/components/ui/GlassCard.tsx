
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: string;
}

const GlassCard = ({ 
  children, 
  hoverable = true, 
  className, 
  ...props 
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        'bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-glass',
        hoverable && 'transition-all duration-300 hover:shadow-glass-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
