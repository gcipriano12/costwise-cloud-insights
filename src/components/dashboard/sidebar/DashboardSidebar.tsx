
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import { SidebarToggleButton } from '../SidebarToggleButton';
import { SidebarLogo } from './SidebarLogo';
import { SidebarSections } from './SidebarSections';
import { SidebarNotifications } from './SidebarNotifications';
import { SidebarSettings } from './SidebarSettings';
import { SidebarUserMenu } from './SidebarUserMenu';
import { SidebarThemeToggle } from './SidebarThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const DashboardSidebar = () => {
  const isMobile = useIsMobile();
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <>
      {/* Mobile trigger button - always visible in mobile mode */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon"
          className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border shadow-sm"
          onClick={() => setOpenMobile(true)}
        >
          <Menu className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Open menu</span>
        </Button>
      )}

      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border relative">
          <div className="flex flex-col items-center py-3">
            <SidebarLogo />
          </div>
          
          {/* Position toggle button on divider line - visible on all screens */}
          <div className={cn(
            "absolute bottom-0 translate-y-[50%] z-50",
            isMobile ? "right-[-23px]" : "right-[-14px]"
          )}>
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
            <SidebarUserMenu />
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
