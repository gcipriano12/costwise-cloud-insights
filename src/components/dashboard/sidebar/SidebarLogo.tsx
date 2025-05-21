import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const SidebarLogo = () => {
  const { state, isMobile, openMobile } = useSidebar();
  
  // Determinar quando mostrar o texto: em desktop quando não está colapsado,
  // ou em mobile quando openMobile é true
  const showText = (isMobile && openMobile) || (!isMobile && state !== "collapsed");
  
  return (
    <Link to="/" className="flex items-center w-full justify-center cursor-pointer">
      <div className={cn(
        "relative flex items-center justify-center bg-blue-500 rounded-sm",
        isMobile ? "w-5 h-5" : "w-6 h-6"
      )}>
        <div className={cn(
          "absolute bg-white transform rotate-45",
          isMobile ? "w-[2px] h-[12px]" : "w-[2.5px] h-[14px]"
        )}></div>
        <div className={cn(
          "absolute bg-white transform -rotate-45",
          isMobile ? "w-[2px] h-[12px]" : "w-[2.5px] h-[14px]"
        )}></div>
      </div>
      {showText && (
        <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text whitespace-nowrap ml-2">
          Cost
        </span>
      )}
    </Link>
  );
};
