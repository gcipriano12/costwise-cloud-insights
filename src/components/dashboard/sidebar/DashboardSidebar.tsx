
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { SidebarToggleButton } from '../SidebarToggleButton';
import { SidebarLogo } from './SidebarLogo';
import { SidebarSections } from './SidebarSections';
import { SidebarNotifications } from './SidebarNotifications';
import { SidebarSettings } from './SidebarSettings';
import { SidebarUserMenu } from './SidebarUserMenu';
import { SidebarThemeToggle } from './SidebarThemeToggle';

export const DashboardSidebar = () => {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border relative">
        <div className="flex flex-col items-center py-3">
          <SidebarLogo />
        </div>
        
        {/* Posicionamento do botão na linha divisória - visível apenas em desktop */}
        <div className="absolute right-[-14px] bottom-0 translate-y-[50%] z-50 hidden md:block">
          <SidebarToggleButton />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-2">
        {/* Botão de toggle em mobile - posicionado dentro do conteúdo para melhor visibilidade */}
        <div className="md:hidden px-3 py-2 mb-2 border-b border-sidebar-border">
          <SidebarToggleButton className="w-full justify-start rounded-md" />
        </div>
        
        <SidebarSections />
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border mt-auto">
        <SidebarMenu>
          <SidebarThemeToggle />
          <SidebarNotifications />
          <SidebarSettings />
          <SidebarUserMenu />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
