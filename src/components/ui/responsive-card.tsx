
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResponsiveCardProps {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  mobileCompact?: boolean;
  mobileFullBleed?: boolean;
  mobileBorderless?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any; // To allow spreading other props to Card
}

export function ResponsiveCard({ 
  title, 
  actions, 
  children, 
  className,
  mobileCompact = false,
  mobileFullBleed = false,
  mobileBorderless = false,
  ...props 
}: ResponsiveCardProps) {
  const isMobile = useIsMobile();
  
  return (
    <Card 
      className={cn(
        className,
        isMobile && mobileBorderless ? "border-0 shadow-none rounded-none" : "",
        isMobile && mobileFullBleed ? "-mx-4" : ""
      )} 
      {...props}
    >
      {(title || actions) && (
        <CardHeader className={cn(
          "flex flex-row items-center justify-between",
          isMobile && mobileCompact ? "px-3 py-2" : ""
        )}>
          {title && <CardTitle className={isMobile ? "text-base" : ""}>{title}</CardTitle>}
          {actions && <div>{actions}</div>}
        </CardHeader>
      )}
      <CardContent className={cn(
        isMobile && mobileCompact ? "px-3 py-2" : "",
        isMobile && mobileFullBleed ? "px-0" : ""
      )}>
        {children}
      </CardContent>
    </Card>
  );
}
