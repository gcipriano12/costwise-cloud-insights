
import React from 'react';
import { 
  SidebarMenuItem, 
  SidebarMenuButton, 
  useSidebar 
} from '@/components/ui/sidebar';

interface SidebarMenuItemProps {
  item: {
    name: string;
    href?: string;
    icon: React.ReactNode;
    badge?: string;
  };
  onClick?: () => void;
}

export const SidebarMenuItemMobile: React.FC<SidebarMenuItemProps> = ({ item, onClick = null }) => {
  const { isMobile, setOpenMobile } = useSidebar();
  
  const handleClick = () => {
    // Em dispositivos móveis, fechar a sidebar quando um item é clicado
    if (isMobile) {
      setOpenMobile(false);
    }
    // Chamar o onClick personalizado se fornecido
    if (onClick) onClick();
  };
  
  return (
    <SidebarMenuItem key={item.name}>
      <SidebarMenuButton tooltip={item.name} onClick={handleClick}>
        {item.icon}
        <span className="group-data-[collapsible=icon]:hidden">
          {item.name}
          {item.badge && (
            <span className="ml-2 text-xs bg-white text-black px-1.5 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
