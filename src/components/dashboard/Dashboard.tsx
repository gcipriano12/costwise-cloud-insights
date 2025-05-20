import { useState } from 'react';
import { ChatBot } from '../chat/ChatBot';
import { DashboardContent } from './DashboardContent';
import { useDashboardData } from '../../hooks/useDashboardData';
import { SidebarToggleButton } from './SidebarToggleButton';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from '../ui/sidebar';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Bell, Settings, User, LayoutDashboard, PieChart, BarChart3, LineChart, Activity, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Dashboard() {
  const { isDark, toggleTheme } = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
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

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification =>
      ({ ...notification, isRead: true })
    ));
  };
  
  const {
    timeFilter,
    setTimeFilter,
    spendSummaryData,
    providerDistributionData,
    categoryDistributionData,
    topServicesData,
    anomaliesData,
    savingsOpportunitiesData,
    spendingTeamsData,
    forecastData,
    resourcesData,
    complianceData,
    kpiData,
    costEventsData,
    environmentsData,
    benchmarksData,
    newServicesData,
    regionHeatmapData,
    currency
  } = useDashboardData();

  const navItems = [
    { name: 'Visão Geral', href: '/', active: true, icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Análise', href: '/analise', icon: <PieChart className="h-5 w-5" /> },
    { name: 'Alocação', href: '/alocacao', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Recomendações', href: '/recomendacoes', icon: <LineChart className="h-5 w-5" /> },
    { name: 'Integrações', href: '/integracoes', icon: <Activity className="h-5 w-5" /> }
  ];
  
  // Estado atual da barra lateral
  const SidebarLogo = () => {
    const { state } = useSidebar();
    return (
      <div className="flex items-center justify-center h-5">
        {/* Logo X estilizado - centralizado com melhor precisão */}
        <div className="w-5 h-5 flex items-center justify-center">
          <div className="absolute w-[2.5px] h-[18px] bg-blue-500 transform rotate-45"></div>
          <div className="absolute w-[2.5px] h-[18px] bg-blue-500 transform -rotate-45"></div>
        </div>
        {state !== "collapsed" && (
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text whitespace-nowrap ml-2">
            Cost
          </span>
        )}
      </div>
    );
  };
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-row w-full overflow-hidden">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center px-2 py-2 justify-between">
              <SidebarLogo />
              <SidebarToggleButton />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton isActive={item.active} tooltip={item.name}>
                      {item.icon}
                      <span className="group-data-[collapsible=icon]:hidden">{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-sidebar-border mt-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Mudar tema" onClick={toggleTheme}>
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="group-data-[collapsible=icon]:hidden">Alterar tema</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton tooltip="Notificações">
                      <Bell className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden">Notificações</span>
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
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
              
              <SidebarMenuItem>
                <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip="Minha conta">
                      <User className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden">Minha conta</span>
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
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col w-full overflow-hidden">
          <main className="flex-1 bg-gray-50 dark:bg-gray-900 w-full overflow-auto">
            <DashboardContent
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              spendSummaryData={spendSummaryData}
              providerDistributionData={providerDistributionData}
              categoryDistributionData={categoryDistributionData}
              topServicesData={topServicesData}
              anomaliesData={anomaliesData}
              savingsOpportunitiesData={savingsOpportunitiesData}
              spendingTeamsData={spendingTeamsData}
              forecastData={forecastData}
              resourcesData={resourcesData}
              complianceData={complianceData}
              kpiData={kpiData}
              costEventsData={costEventsData}
              environmentsData={environmentsData}
              benchmarksData={benchmarksData}
              newServicesData={newServicesData}
              regionHeatmapData={regionHeatmapData}
              currency={currency}
            />
            
            <ChatBot />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
