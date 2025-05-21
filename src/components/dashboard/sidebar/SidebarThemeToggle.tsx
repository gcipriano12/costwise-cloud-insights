
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { SidebarMenuItemMobile } from './SidebarMenuItemMobile';
import { useTheme } from '@/hooks/useTheme';

export const SidebarThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <SidebarMenuItemMobile 
      item={{
        name: isDark ? 'Modo Claro' : 'Modo Escuro',
        icon: isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />,
        href: "#" // Adding the required href property
      }}
      onClick={toggleTheme}
    />
  );
};
