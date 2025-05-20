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
        
        {/* Posicionamento do botão na linha divisória - visível em todas as telas */}
        <div className="absolute right-[-14px] bottom-0 translate-y-[50%] z-50">
          <SidebarToggleButton />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-2">
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
