
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TimeFilter } from './TimeFilter';
import { DashboardContent } from './DashboardContent';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarProvider, 
  SidebarHeader, 
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import { SidebarNavigation } from './sections/SidebarNavigation';
import { ThemeToggle } from "../theme/ThemeToggle";
import { Button } from "../ui/button";
import { Bell, Settings, UserCircle } from "lucide-react";
import { SidebarToggleButton } from './SidebarToggleButton';
import { cn } from '@/lib/utils';
import { useDashboardData } from '@/hooks/useDashboardData';

const DashboardHeader = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 pb-0">
      <div className="flex items-center gap-2">
        <SidebarToggleButton />
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      {/* TimeFilter will be moved to the main Dashboard component to manage state */}
    </div>
  );
};

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = () => {
  // Add necessary state and data
  const [timeFilter, setTimeFilter] = useState('30d');
  
  // Use the hook to get dashboard data - fix by not passing any arguments
  const {
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

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar 
          variant="sidebar" 
          collapsible="icon" 
          className="border-r border-slate-200 dark:border-slate-800"
        >
          <SidebarHeader className="px-2 py-3 flex justify-center items-center border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 px-2">
              <div className="text-primary w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="size-6">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                  <path fillOpacity="0.5" d="M12 4.5L18 8v8l-6 3-6-3V8l6-3.5z" />
                </svg>
              </div>
              <span className="font-bold text-lg">finout</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNavigation />
          </SidebarContent>
          <SidebarFooter className="border-t border-slate-200 dark:border-slate-800 p-2">
            <div className="flex items-center justify-between p-2">
              <ThemeToggle />
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <UserCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 pb-0">
            <div className="flex items-center gap-2">
              <SidebarToggleButton />
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            </div>
            <TimeFilter 
              value={timeFilter} 
              onChange={(value) => setTimeFilter(value)} 
            />
          </div>
          {/* Remove the Outlet as a child of DashboardContent */}
          <DashboardContent
            timeFilter={timeFilter}
            onTimeFilterChange={(value) => setTimeFilter(value)}
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
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
