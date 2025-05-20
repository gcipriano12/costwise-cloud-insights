
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
import { 
  Bell, 
  Settings, 
  User, 
  LayoutDashboard, 
  Tags, 
  DollarSign, 
  LineChart, 
  Clock, 
  LayoutGrid, 
  Database,
  ShieldCheck, 
  CalendarCheck, 
  ClipboardList, 
  AlertTriangle, 
  FileText, 
  GanttChart, 
  Sun, 
  Globe, 
  Moon 
} from 'lucide-react';
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
  
  // Obter os dados do dashboard
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

  // Seções da barra lateral
  
  // Seção Inform
  const informItems = [
    { name: 'MegaBill', href: '/', icon: <Globe className="h-5 w-5" /> },
    { name: 'Virtual Tags', href: '/tags', icon: <Tags className="h-5 w-5" /> },
    { name: 'Dashboards', href: '/dashboards', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Budgets', href: '/budgets', icon: <LineChart className="h-5 w-5" /> },
    { name: 'Financial Plans', href: '/plans', icon: <Clock className="h-5 w-5" /> },
    { name: 'Resources', href: '/resources', icon: <LayoutGrid className="h-5 w-5" /> },
    { name: 'Data Explorer', href: '/explorer', icon: <Database className="h-5 w-5" /> }
  ];

  // Seção Optimize
  const optimizeItems = [
    { name: 'CostGuard', href: '/costguard', icon: <ShieldCheck className="h-5 w-5" /> },
    { name: 'My Commitments', href: '/my-commitments', icon: <CalendarCheck className="h-5 w-5" /> },
    { name: 'Commitments Log', href: '/commitments-log', icon: <ClipboardList className="h-5 w-5" /> },
    { name: 'Anomalies', href: '/anomalies', icon: <AlertTriangle className="h-5 w-5" /> }
  ];

  // Seção Operate
  const operateItems = [
    { name: 'Reports', href: '/reports', icon: <FileText className="h-5 w-5" /> },
    { name: 'Governance', href: '/governance', icon: <GanttChart className="h-5 w-5" />, badge: 'New' }
  ];
  
  // Estado atual da barra lateral
  const SidebarLogo = () => {
    const { state } = useSidebar();
    return (
      <div className="flex items-center justify-center h-8 w-full">
        <div className="relative w-6 h-6 flex items-center justify-center bg-blue-500 rounded-sm">
          <div className="absolute w-[2.5px] h-[14px] bg-white transform rotate-45"></div>
          <div className="absolute w-[2.5px] h-[14px] bg-white transform -rotate-45"></div>
        </div>
        {state !== "collapsed" && (
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text whitespace-nowrap ml-2">
            Cost
          </span>
        )}
      </div>
    );
  };

  // Criar componente de item da Sidebar que fecha o menu mobile quando clicado
  const SidebarMenuItemMobile = ({ item, onClick = null }) => {
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
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-row w-full overflow-hidden">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border relative">
            <div className="flex flex-col items-center py-3">
              <SidebarLogo />
            </div>
            
            {/* Posicionamento do botão na linha divisória - visível apenas em desktop */}
            <div className="absolute right-[-14px] bottom-0 translate-y-[50%] z-50 hidden md:block">
              <SidebarToggleButton />
            </div>
          </SidebarHeader>
          
          <SidebarContent className="py-2">
            {/* Botão de toggle em mobile - posicionado dentro do conteúdo para melhor visibilidade */}
            <div className="md:hidden px-3 py-2 mb-2 border-b border-sidebar-border">
              <SidebarToggleButton className="w-full justify-start rounded-md" />
            </div>
            
            {/* Seção Inform */}
            <SidebarGroup>
              <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground group-data-[collapsible=icon]:hidden">
                Inform
              </div>
              <SidebarMenu>
                {informItems.map((item) => (
                  <SidebarMenuItemMobile key={item.name} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroup>

            {/* Seção Optimize */}
            <SidebarGroup>
              <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground group-data-[collapsible=icon]:hidden">
                Optimize
              </div>
              <SidebarMenu>
                {optimizeItems.map((item) => (
                  <SidebarMenuItemMobile key={item.name} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroup>

            {/* Seção Operate */}
            <SidebarGroup>
              <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground group-data-[collapsible=icon]:hidden">
                Operate
              </div>
              <SidebarMenu>
                {operateItems.map((item) => (
                  <SidebarMenuItemMobile key={item.name} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-sidebar-border mt-auto">
            <SidebarMenu>
              <SidebarMenuItemMobile 
                item={{
                  name: isDark ? 'Modo Claro' : 'Modo Escuro',
                  icon: isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
                }}
                onClick={toggleTheme}
              />
              
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
                    <SidebarMenuButton tooltip="Minha Conta">
                      <User className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden">Minha Conta</span>
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
        
        {/* Conteúdo principal - ajustado para remover o padding lateral em dispositivos móveis */}
        <div className="flex-1 flex flex-col w-full overflow-hidden relative">
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
