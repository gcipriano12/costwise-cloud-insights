import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { PageHeader } from '@/components/layout/PageHeader';
import { Globe } from 'lucide-react';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { useDashboardData } from '@/hooks/useDashboardData';

const Index = () => {
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
    <Dashboard>
      <div className="flex-1 w-full">
        <PageHeader 
          icon={Globe} 
          title="MegaBill" 
          description="Plataforma centralizada de FinOps para gerenciamento de custos na nuvem"
          color="text-blue-600"
          showTimeFilter={true}
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />
        
        <div className="p-4">
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
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
