
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const SidebarSettings = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <SidebarMenuItem>
      <DropdownMenu open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip="Configurações">
            <Settings className="h-5 w-5" />
            <span className="group-data-[collapsible=icon]:hidden">Configurações</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Configurações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Preferências</DropdownMenuItem>
          <DropdownMenuItem>Gerenciar alertas</DropdownMenuItem>
          <DropdownMenuItem>Contas de provedor</DropdownMenuItem>
          <DropdownMenuItem>Usuários e permissões</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};
