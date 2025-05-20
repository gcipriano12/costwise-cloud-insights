
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Menu } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

export const SidebarToggleButton: React.FC<React.ComponentProps<typeof Button>> = ({ className, ...props }) => {
  const { state, toggleSidebar, isMobile, openMobile, setOpenMobile } = useSidebar();
  const { isDark } = useTheme();
  
  // Se for usado dentro da sidebar em dispositivos móveis
  const isInSidebar = isMobile && className?.includes('w-full');
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      toggleSidebar();
    }
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={state === "collapsed" ? "Expandir barra lateral" : "Recolher barra lateral"}
      className={cn(
        "w-6 h-6 flex items-center justify-center transition-all duration-200",
        isMobile ? "rounded-md" : "rounded-full",
        isDark 
          ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 shadow-lg hover:shadow-slate-700/50" 
          : "bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 shadow-lg hover:shadow-gray-300/50",
        !isMobile && (state === "collapsed" ? "rotate-0" : "rotate-180"),
        className
      )}
      {...props}
    >
      {isMobile && isInSidebar ? (
        <Menu className="h-3.5 w-3.5" />
      ) : (
        <ChevronLeft className="h-3.5 w-3.5" />
      )}
    </Button>
  );
};
