
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const SidebarNotifications = () => {
  const { isDark } = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: '1', 
      title: 'Nova anomalia de custo', 
      isRead: false, 
      timestamp: new Date(Date.now() - 24 * 60 * 60000), // 24 horas atrás
    },
    { 
      id: '2', 
      title: 'Orçamento excedido (Alerta)', 
      isRead: false, 
      timestamp: new Date(Date.now() - 3 * 60 * 60000), // 3 horas atrás
    },
    { 
      id: '3', 
      title: 'Oportunidade de economia', 
      isRead: true, 
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60000), // 4 dias atrás
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification =>
      ({ ...notification, isRead: true })
    ));
  };

  return (
    <SidebarMenuItem>
      <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <PopoverTrigger asChild>
          <SidebarMenuButton tooltip="Notificações">
            <Bell className="h-5 w-5" />
            <span className="group-data-[collapsible=icon]:hidden">Notificações</span>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full group-data-[collapsible=icon]:right-[unset] group-data-[collapsible=icon]:top-0 group-data-[collapsible=icon]:translate-x-1.5"></span>
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
            {notifications.length > 0 ? notifications.map((notification) => (
              <div key={notification.id} className={cn(
                "flex items-center justify-between p-3 rounded-md border",
                isDark ? "border-slate-700" : "border-gray-200",
                !notification.isRead ? (isDark ? "bg-blue-900/30" : "bg-blue-50") : ""
              )}>
                <div className="grid gap-1">
                  <p className={cn(
                    "text-sm font-medium leading-none",
                    !notification.isRead ? (isDark ? "text-blue-300" : "text-blue-800") : (isDark ? "text-slate-300" : "text-gray-700")
                  )}>
                    {notification.title}
                  </p>
                  <p className={cn(
                    "text-xs leading-none",
                    isDark ? "text-slate-400" : "text-gray-500"
                  )}>
                    {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            )) : (
              <div className={cn(
                "text-center text-sm",
                isDark ? "text-slate-400" : "text-gray-500"
              )}>
                Nenhuma notificação.
              </div>
            )}
          </div>
          {notifications.length > 0 && unreadCount > 0 && (
            <div className="flex justify-end p-2">
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Marcar todas como lidas
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </SidebarMenuItem>
  );
};
