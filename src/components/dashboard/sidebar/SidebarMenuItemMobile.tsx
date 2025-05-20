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
  const { isMobile, setOpenMobile, state, open, openMobile } = useSidebar();
  
  const handleClick = () => {
    // Em dispositivos móveis, fechar a sidebar quando um item é clicado
    if (isMobile) {
      setOpenMobile(false);
    }
    // Chamar o onClick personalizado se fornecido
    if (onClick) onClick();
  };
  
  // Determinar quando mostrar o texto: em desktop quando não está colapsado,
  // ou em mobile quando openMobile é true
  const showText = (isMobile && openMobile) || (!isMobile && state !== "collapsed");

  // Reduzir o tamanho do ícone em dispositivos móveis
  const iconElement = React.isValidElement(item.icon) && isMobile 
    ? React.cloneElement(item.icon as React.ReactElement, {
        className: 'h-4 w-4' // Ícone menor para mobile
      })
    : item.icon;
  
  return (
    <SidebarMenuItem key={item.name}>
      <SidebarMenuButton 
        tooltip={item.name} 
        onClick={handleClick}
        className={isMobile 
          ? (openMobile ? "" : "flex justify-center items-center mx-auto") 
          : ""}
      >
        {iconElement}
        <span className={showText ? "" : "hidden"}>
          {item.name}
          {item.badge && (
            <span className={`ml-2 text-xs ${isMobile ? "text-[10px]" : ""} bg-white text-black px-1.5 py-0.5 rounded-full`}>
              {item.badge}
            </span>
          )}
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
