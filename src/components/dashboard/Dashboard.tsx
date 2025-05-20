import { useState } from 'react';
import { ChatBot } from '../chat/ChatBot';
import { DashboardContent } from './DashboardContent';
import { useDashboardData } from '../../hooks/useDashboardData';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from './sidebar/DashboardSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Dashboard() {
  const isMobile = useIsMobile();
  
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
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex flex-row w-full overflow-hidden">
        <DashboardSidebar />
        
        {/* Conteúdo principal - adicionando margem esquerda para dispositivos móveis */}
        <div className={`flex-1 flex flex-col w-full overflow-hidden relative ${isMobile ? 'ml-[3.5rem]' : ''}`}>
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
