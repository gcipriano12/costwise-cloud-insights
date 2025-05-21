import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { 
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

export const SidebarThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isMobile, state, openMobile } = useSidebar();
  const showText = (isMobile && openMobile) || (!isMobile && state !== "collapsed");
  
  return (
    <SidebarMenuItem data-mobile-icons={isMobile} className="my-0.5 px-2">
      <SidebarMenuButton tooltip={isDark ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'} onClick={toggleTheme}>
        <div className={cn(
          "flex items-center justify-center",
          isMobile && openMobile ? "h-6 w-6" : "h-5 w-5"
        )}>
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </div>
        <span className={showText ? "" : "hidden"}>
          {isDark ? 'Modo Claro' : 'Modo Escuro'}
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
