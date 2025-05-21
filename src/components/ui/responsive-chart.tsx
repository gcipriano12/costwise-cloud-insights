
import React, { useState, useEffect } from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ResponsiveContainer } from 'recharts';

interface ResponsiveChartProps {
  className?: string;
  height?: number | string;
  mobileHeight?: number;
  tabletHeight?: number;
  desktopHeight?: number;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  bordered?: boolean;
  padding?: string;
}

export function ResponsiveChart({
  className,
  height,
  mobileHeight = 200,
  tabletHeight = 250,
  desktopHeight = 300,
  title,
  actions,
  children,
  bordered = true,
  padding = "p-4"
}: ResponsiveChartProps) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  // Calculate the chart height based on device
  const chartHeight = height || (isMobile ? mobileHeight : isTablet ? tabletHeight : desktopHeight);
  
  // Scale text in charts for mobile
  const [fontSize, setFontSize] = useState(12);
  
  useEffect(() => {
    setFontSize(isMobile ? 10 : isTablet ? 11 : 12);
  }, [isMobile, isTablet]);
  
  // Fixed: Properly handle children for ResponsiveContainer
  const chartContainer = (
    <div style={{ height: chartHeight, width: '100%' }} className={cn(className)}>
      <ResponsiveContainer width="100%" height="100%">
        {React.isValidElement(children) ? 
          React.cloneElement(children, {
            // Only pass fontSize prop if it's a chart component
            ...(children.type.toString().includes('Chart') ? { fontSize } : {})
          })
        : children}
      </ResponsiveContainer>
    </div>
  );
  
  if (!bordered) {
    return (
      <div className="mb-4">
        {(title || actions) && (
          <div className="flex justify-between items-center mb-3">
            {title && <div className="text-base font-medium">{title}</div>}
            {actions && <div>{actions}</div>}
          </div>
        )}
        {chartContainer}
      </div>
    );
  }
  
  return (
    <Card className="mb-4">
      {(title || actions) && (
        <div className="flex justify-between items-center p-4 border-b">
          {title && <div className="text-base font-medium">{title}</div>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      <CardContent className={padding}>
        {chartContainer}
      </CardContent>
    </Card>
  );
}
