
import React from 'react';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup, 
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar
} from "@/components/ui/sidebar";
import { Link } from 'react-router-dom';
import { 
  CircleDollarSign, 
  Tag, 
  LayoutDashboard, 
  PieChart, 
  Clock, 
  Database, 
  Binary, 
  Shield, 
  FileText, 
  List, 
  LineChart, 
  FileBarChart2, 
  Settings, 
  FileQuestion 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface NavigationGroup {
  label: string;
  items: {
    title: string;
    path: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }[];
}

export const SidebarNavigation: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const navigationGroups: NavigationGroup[] = [
    {
      label: "Inform",
      items: [
        { title: "MegaBill", path: "/megabill", icon: CircleDollarSign },
        { title: "Virtual Tags", path: "/virtual-tags", icon: Tag },
        { title: "Dashboards", path: "/", icon: LayoutDashboard },
        { title: "Budgets", path: "/budgets", icon: PieChart },
        { title: "Financial Plans", path: "/financial-plans", icon: Clock },
        { title: "Resources", path: "/resources", icon: Database },
        { title: "Data Explorer", path: "/data-explorer", icon: Binary }
      ]
    },
    {
      label: "Optimize",
      items: [
        { title: "CostGuard", path: "/costguard", icon: Shield },
        { title: "My Commitments", path: "/my-commitments", icon: FileText },
        { title: "Commitments Log", path: "/commitments-log", icon: List },
        { title: "Anomalies", path: "/anomalies", icon: LineChart }
      ]
    },
    {
      label: "Operate",
      items: [
        { title: "Reports", path: "/reports", icon: FileBarChart2 },
        { title: "Governance", path: "/governance", icon: Shield, badge: "New" }
      ]
    },
    {
      label: "",
      items: [
        { title: "Settings", path: "/settings", icon: Settings },
        { title: "Documentation", path: "/documentation", icon: FileQuestion }
      ]
    }
  ];

  return (
    <>
      {navigationGroups.map((group, groupIndex) => (
        <SidebarGroup key={groupIndex} className={cn(groupIndex > 0 ? "mt-2" : "")}>
          {group.label && (
            <SidebarGroupLabel className="px-3 uppercase text-xs tracking-wider font-semibold text-slate-400">
              {group.label}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item, itemIndex) => (
                <SidebarMenuItem key={itemIndex}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={isCollapsed ? item.title : undefined}
                    isActive={item.path === "/" ? window.location.pathname === "/" : window.location.pathname.startsWith(item.path)}
                  >
                    <Link to={item.path}>
                      <item.icon className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "")} />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="outline" className="ml-auto bg-primary/10 text-primary text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};
