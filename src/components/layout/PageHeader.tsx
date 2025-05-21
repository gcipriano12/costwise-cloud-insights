
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  color?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ icon: Icon, title, description, color = "text-primary", actions }: PageHeaderProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-background border-b border-border px-4 py-3 md:px-6 md:py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
        <div className="flex items-center">
          <div className={cn("mr-2 md:mr-3 p-1.5 md:p-2 rounded-md bg-background border border-border", isMobile ? "hidden" : "")}>
            <Icon className={cn("h-4 w-4 md:h-5 md:w-5", color)} />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-semibold flex items-center">
              {isMobile && <Icon className={cn("mr-2 h-5 w-5", color)} />}
              {title}
            </h1>
            {description && <p className="text-sm text-muted-foreground mt-0.5 hidden md:block">{description}</p>}
          </div>
        </div>
        
        {actions && (
          <div className={isMobile ? "flex justify-end" : ""}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
