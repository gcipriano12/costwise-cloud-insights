import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export const SidebarToggleButton: React.FC<React.ComponentProps<typeof Button>> = ({ className, ...props }) => {
  const { state, toggleSidebar } = useSidebar();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      aria-label={state === "collapsed" ? "Expandir barra lateral" : "Recolher barra lateral"}
      className={cn(
        "p-2 rounded-md w-8 h-8 flex items-center justify-center transition-all", 
        state === "collapsed" ? "rotate-0" : "rotate-180",
        className
      )}
      {...props}
    >
      <ChevronRight className="h-5 w-5" />
    </Button>
  );
};
