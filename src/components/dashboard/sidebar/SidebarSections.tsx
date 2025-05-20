import React from 'react';
import { 
  SidebarGroup,
  SidebarMenu,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  Globe, 
  Tags, 
  LayoutDashboard, 
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
} from 'lucide-react';
import { SidebarMenuItemMobile } from './SidebarMenuItemMobile';
import { cn } from '@/lib/utils';

export const SidebarSections = () => {
  const { state, isMobile, openMobile } = useSidebar();
  
  // Determinar quando mostrar o texto: em desktop quando não está colapsado,
  // ou em mobile quando openMobile é true
  const showText = (isMobile && openMobile) || (!isMobile && state !== "collapsed");
  
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

  return (
    <>
      {/* Seção Inform */}
      <SidebarGroup className={cn(isMobile && openMobile && 'mobile-expanded-group-spacing')}>
        <div className={`px-3 py-1.5 text-xs font-semibold text-[#0080af] ${showText ? "" : "hidden"}`}>
          Inform
        </div>
        <SidebarMenu>
          {informItems.map((item) => (
            <SidebarMenuItemMobile key={item.name} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroup>

      {/* Seção Optimize */}
      <SidebarGroup className={cn(isMobile && openMobile && 'mobile-expanded-group-spacing')}>
        <div className={`px-3 py-1.5 text-xs font-semibold text-[#bd3bfd] ${showText ? "" : "hidden"}`}>
          Optimize
        </div>
        <SidebarMenu>
          {optimizeItems.map((item) => (
            <SidebarMenuItemMobile key={item.name} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroup>

      {/* Seção Operate */}
      <SidebarGroup className={cn(isMobile && openMobile && 'mobile-expanded-group-spacing')}>
        <div className={`px-3 py-1.5 text-xs font-semibold text-[#00c693] ${showText ? "" : "hidden"}`}>
          Operate
        </div>
        <SidebarMenu>
          {operateItems.map((item) => (
            <SidebarMenuItemMobile key={item.name} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};
