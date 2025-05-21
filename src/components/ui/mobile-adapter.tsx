
import React from 'react';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface MobileAdapterProps {
  children: React.ReactNode;
  mobileComponent?: React.ReactNode;
  tabletComponent?: React.ReactNode;
  mobileClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
  mobileBehavior?: 'stack' | 'scroll' | 'none';
  mobileOrder?: 'normal' | 'reverse';
}

export function MobileAdapter({
  children,
  mobileComponent,
  tabletComponent,
  mobileClassName,
  tabletClassName,
  desktopClassName,
  mobileBehavior = 'stack',
  mobileOrder = 'normal',
}: MobileAdapterProps) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  if (isMobile && mobileComponent) {
    return <>{mobileComponent}</>;
  }
  
  if (isTablet && tabletComponent) {
    return <>{tabletComponent}</>;
  }
  
  const behaviorClass = isMobile ? 
    mobileBehavior === 'stack' ? 'flex flex-col gap-4' : 
    mobileBehavior === 'scroll' ? 'overflow-x-auto whitespace-nowrap' : '' : '';
  
  const orderClass = isMobile && mobileOrder === 'reverse' ? 'flex-col-reverse' : '';
  
  const responsiveClass = isMobile ? mobileClassName : 
                         isTablet ? tabletClassName : 
                         desktopClassName;
  
  return (
    <div className={cn(behaviorClass, orderClass, responsiveClass)}>
      {children}
    </div>
  );
}
