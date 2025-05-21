
import React from 'react';
import { 
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { state, isMobile, openMobile } = useSidebar();
  
  // Determine when to show text: in desktop when not collapsed,
  // or in mobile when openMobile is true
  const showText = (isMobile && openMobile) || (!isMobile && state !== "collapsed");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SidebarMenuItem data-mobile-icons={isMobile} className="my-0.5 px-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip="Language">
            <div className={cn(
              "flex items-center justify-center",
              isMobile && openMobile ? "h-6 w-6" : "h-5 w-5"
            )}>
              <Globe className="h-5 w-5" />
            </div>
            <span className={showText ? "" : "hidden"}>
              {i18n.language === 'en' ? 'English' : 'Português'}
            </span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => changeLanguage('en')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('pt')}>
            Português
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};
