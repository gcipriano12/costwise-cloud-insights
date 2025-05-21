
import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { LucideIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResponsivePageProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  color?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  mobilePadding?: string;
  mobileActionsPosition?: 'header' | 'bottom';
}

export function ResponsivePage({
  icon,
  title,
  description,
  color,
  actions,
  children,
  mobilePadding = "p-4",
  mobileActionsPosition = 'header'
}: ResponsivePageProps) {
  const isMobile = useIsMobile();
  
  // For mobile, if actions are positioned at the bottom
  const mobileBottomActions = isMobile && mobileActionsPosition === 'bottom' && actions ? (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-background border-t border-border z-10 flex justify-center">
      <div className="w-full">
        {actions}
      </div>
    </div>
  ) : null;
  
  // Only include actions in header if not showing at bottom on mobile
  const headerActions = (isMobile && mobileActionsPosition === 'bottom') ? undefined : actions;

  return (
    <div className="flex flex-col min-h-full w-full">
      <PageHeader 
        icon={icon}
        title={title}
        description={description}
        color={color}
        actions={headerActions}
      />
      
      <div className={isMobile ? mobilePadding : "p-6"}>
        {children}
      </div>
      
      {mobileBottomActions}
      
      {/* Add padding at the bottom if we have bottom actions */}
      {mobileBottomActions && <div className="h-16" />}
    </div>
  );
}
