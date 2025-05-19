
import React from 'react';
import { TimeFilter } from './TimeFilter';
import { SummarySection } from './sections/SummarySection';
import { ServicesSection } from './sections/ServicesSection';
import { TrendsSection } from './sections/TrendsSection';
import { KpiSection } from './sections/KpiSection';
import { ComparisonSection } from './sections/ComparisonSection';
import type { 
  SpendSummary,
  ProviderDistribution,
  TopService,
  Anomaly,
  SavingsOpportunities,
  SpendingTeam,
  ForecastData,
  Resource, 
  ComplianceItem,
  KPI,
  CostEvent,
  Environment,
  Benchmark,
  NewService,
  RegionData
} from '../../hooks/useDashboardData';

interface DashboardContentProps {
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
  spendSummaryData: SpendSummary;
  providerDistributionData: ProviderDistribution[];
  topServicesData: TopService[];
  anomaliesData: Anomaly[];
  savingsOpportunitiesData: SavingsOpportunities;
  spendingTeamsData: SpendingTeam[];
  forecastData: ForecastData[];
  resourcesData: Resource[];
  complianceData: ComplianceItem[];
  kpiData: KPI[];
  costEventsData: CostEvent[];
  environmentsData: Environment[];
  benchmarksData: Benchmark[];
  newServicesData: NewService[];
  regionHeatmapData: RegionData[];
  currency: string;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  timeFilter,
  onTimeFilterChange,
  spendSummaryData,
  providerDistributionData,
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
}) => {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-cloudcostx-blue">Dashboard</h1>
        <TimeFilter value={timeFilter} onChange={onTimeFilterChange} />
      </div>
      
      {/* Seções do Dashboard refatoradas */}
      <SummarySection 
        spendSummaryData={spendSummaryData}
        providerDistributionData={providerDistributionData}
        anomaliesData={anomaliesData}
        savingsOpportunitiesData={savingsOpportunitiesData}
      />
      
      <ServicesSection 
        topServicesData={topServicesData}
        forecastData={forecastData}
        currency={currency}
      />
      
      <TrendsSection 
        spendingCategoriesData={spendingTeamsData}
        resourcesData={resourcesData}
        complianceData={complianceData}
        currency={currency}
      />
      
      <KpiSection 
        kpiData={kpiData}
        costEventsData={costEventsData}
        currentMonth="Maio 2025"
      />
      
      <ComparisonSection 
        environmentsData={environmentsData}
        benchmarksData={benchmarksData}
        newServicesData={newServicesData}
        regionHeatmapData={regionHeatmapData}
        currency={currency}
      />
    </main>
  );
};
