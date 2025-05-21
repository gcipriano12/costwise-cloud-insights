import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { 
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export const SidebarThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={isDark ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'} onClick={toggleTheme}>
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        <span>{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
