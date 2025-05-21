import React, { useState } from 'react';
import { User } from 'lucide-react';
import { SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export const SidebarUserMenu = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { state, isMobile, openMobile } = useSidebar();
  
  // Determinar quando mostrar o texto: em desktop quando não está colapsado,
  // ou em mobile quando openMobile é true
  const showText = (isMobile && openMobile) || (!isMobile && state !== "collapsed");

  return (
    <SidebarMenuItem data-mobile-icons={isMobile} className="my-0.5 px-2">
      <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip="Minha Conta">
            <div className={cn(
              "flex items-center justify-center",
              isMobile && openMobile ? "h-6 w-6" : "h-5 w-5"
            )}>
              <User className="h-5 w-5" />
            </div>
            <span className={showText ? "" : "hidden"}>
              Minha Conta
            </span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>svc_finops</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Configurações</DropdownMenuItem>
          <DropdownMenuItem>Suporte</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};
