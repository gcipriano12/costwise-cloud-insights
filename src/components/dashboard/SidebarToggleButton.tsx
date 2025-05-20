import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from '@/lib/utils';

export const SidebarToggleButton: React.FC<React.ComponentProps<typeof Button>> = ({ className, ...props }) => {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-6 w-6 rounded-full p-0 hover:bg-slate-800/40",
        className
      )}
      onClick={toggleSidebar}
      aria-label={isCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
      title={isCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
      {...props}
    >
      <ChevronLeft 
        className={cn(
          "h-4 w-4 transition-transform duration-200", 
          isCollapsed ? "rotate-180" : ""
        )} 
      />
    </Button>
  );
};
