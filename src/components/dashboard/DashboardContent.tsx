import React from 'react';
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
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

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
  const { isDark } = useTheme();

  return (
    <main className={cn(
      "pt-4 pb-12 transition-colors duration-200",
      isDark ? "bg-slate-950" : "bg-gray-50"
    )}>
      <div className="container mx-auto px-4">
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
      </div>
    </main>
  );
};
