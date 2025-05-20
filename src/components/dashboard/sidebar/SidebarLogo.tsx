
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';

export const SidebarLogo = () => {
  const { state } = useSidebar();
  
  return (
    <div className="flex items-center justify-center h-8 w-full">
      <div className="relative w-6 h-6 flex items-center justify-center bg-blue-500 rounded-sm">
        <div className="absolute w-[2.5px] h-[14px] bg-white transform rotate-45"></div>
        <div className="absolute w-[2.5px] h-[14px] bg-white transform -rotate-45"></div>
      </div>
      {state !== "collapsed" && (
        <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text whitespace-nowrap ml-2">
          Cost
        </span>
      )}
    </div>
  );
};
