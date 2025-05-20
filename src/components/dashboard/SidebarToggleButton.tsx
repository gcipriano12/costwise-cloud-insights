
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, PanelLeft } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export const SidebarToggleButton: React.FC<React.ComponentProps<typeof Button>> = ({ className, ...props }) => {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={toggleSidebar}
      aria-label={isCollapsed ? "Expandir barra lateral" : "Esconder barra lateral"}
      title={isCollapsed ? "Expandir barra lateral" : "Esconder barra lateral"}
      {...props}
    >
      {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
    </Button>
  );
};
