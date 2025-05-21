
import React from 'react';
import { cn } from '@/lib/utils';
import { useBreakpoint } from '@/hooks/use-mobile';

type ColsConfig = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
};

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: ColsConfig | number;
  gap?: string | number;
  children: React.ReactNode;
}

export function ResponsiveGrid({ 
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4, '2xl': 4 }, 
  gap = 4,
  className,
  children,
  ...props
}: ResponsiveGridProps) {
  const breakpoint = useBreakpoint();
  
  // Convert numeric cols to config object
  const colsConfig: ColsConfig = typeof cols === 'number' 
    ? { xs: 1, sm: Math.min(cols, 2), md: Math.min(cols, 3), lg: cols, xl: cols, '2xl': cols }
    : cols;
  
  // Determine current column count based on breakpoint
  const currentCols = colsConfig[breakpoint] || 1;
  
  // Convert gap to string with px if it's a number
  const gapValue = typeof gap === 'number' ? `${gap * 0.25}rem` : gap;
  
  return (
    <div 
      className={cn("grid", className)}
      style={{ 
        gridTemplateColumns: `repeat(${currentCols}, minmax(0, 1fr))`,
        gap: gapValue
      }}
      {...props}
    >
      {children}
    </div>
  );
}
