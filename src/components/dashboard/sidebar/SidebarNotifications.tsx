import React, { useState } from 'react';
import { Bell, MailOpen, Mail } from 'lucide-react';
import { 
  SidebarMenuItem, 
  SidebarMenuButton, 
  useSidebar 
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

export const SidebarNotifications = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { isDark } = useTheme();
  const { state, isMobile, openMobile } = useSidebar();
  
  // Determinar quando mostrar o texto: em desktop quando não está colapsado,
  // ou em mobile quando openMobile é true
  const showText = (isMobile && openMobile) || (!isMobile && state !== "collapsed");
  
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Nova anomalia de custo', isRead: false },
    { id: '2', title: 'Orçamento excedido', isRead: false },
    { id: '3', title: 'Oportunidade de economia', isRead: true },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  return (
    <SidebarMenuItem data-mobile-icons={isMobile} className="my-0.5 px-2">
      <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <PopoverTrigger asChild>
          <SidebarMenuButton tooltip="Notificações">
            <div className={cn(
              "flex items-center justify-center",
              isMobile && openMobile ? "h-6 w-6" : "h-5 w-5"
            )}>
              <Bell className="h-5 w-5" />
            </div>
            <span className={showText ? "" : "hidden"}>
              Notificações
            </span>
            {unreadCount > 0 && (
              <span className={cn(
                "absolute w-2 h-2 bg-red-500 rounded-full group-data-[collapsible=icon]:right-[unset] group-data-[collapsible=icon]:top-0 group-data-[collapsible=icon]:translate-x-1.5",
                showText ? "top-[6px] right-[12px]" : "top-0 right-0"
              )}></span>
            )}
          </SidebarMenuButton>
        </PopoverTrigger>
        <PopoverContent className={cn(
          "sm:max-w-[425px]",
          "p-0",
          isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white"
        )} align="end">
          <div className={cn(
            "flex items-center justify-between p-4 border-b",
            isDark ? "border-slate-700" : "border-gray-200"
          )}>
            <h3 className={cn(
              "font-semibold text-sm",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Notificações
            </h3>
          </div>
          <div className={cn(
            "grid gap-4 p-4",
            isDark ? "bg-slate-900" : ""
          )}>
            {notifications.map((notification) => (
              <div key={notification.id} className={cn(
                "flex items-center justify-between p-3 rounded-md border",
                isDark ? "border-slate-700" : "border-gray-200",
                !notification.isRead ? (isDark ? "bg-blue-900/30" : "bg-blue-50") : ""
              )}>
                <p className={cn(
                  "text-sm font-medium leading-none",
                  !notification.isRead ? (isDark ? "text-blue-300" : "text-blue-800") : ""
                )}>
                  {notification.title}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => markAsRead(notification.id)}
                  disabled={notification.isRead}
                  className="h-8 w-8"
                >
                  {notification.isRead ? (
                    <MailOpen className="h-4 w-4" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="text-center py-2">Sem notificações</div>
            )}
            
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </SidebarMenuItem>
  );
};
