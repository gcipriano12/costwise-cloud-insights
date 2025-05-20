import React from 'react';
import { SummarySection } from './sections/SummarySection';
import { ServicesSection } from './sections/ServicesSection';
import { TrendsSection } from './sections/TrendsSection';
import { KpiSection } from './sections/KpiSection';
import { ComparisonSection } from './sections/ComparisonSection';
import { TimeFilter } from './TimeFilter';
import { Globe } from 'lucide-react';
import { SpendSummaryCard } from './SpendSummaryCard';
import { CategoryDistributionCard } from './CategoryDistributionCard';
import { AnomaliesCard } from './AnomaliesCard';
import { SavingsOpportunitiesCard } from './SavingsOpportunitiesCard';
import type { 
  SpendSummary,
  ProviderDistribution,
  CategoryDistribution,
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
  categoryDistributionData: CategoryDistribution[];
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
}) => {
  const { isDark } = useTheme();

  return (
    <div className={cn(
      "pb-12 transition-colors duration-200 w-full h-full flex-1",
      isDark ? "bg-slate-950" : "bg-gray-50"
    )}>
      <div className="w-full px-2 sm:px-4">
        <div className="flex items-center justify-between mb-4 pt-4">
          <div className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600" />
            <h2 className="text-lg font-semibold">MegaBill</h2>
          </div>
          <div>
            <TimeFilter 
              value={timeFilter}
              onChange={onTimeFilterChange}
            />
          </div>
        </div>
        
        <SummarySection
          spendSummaryData={spendSummaryData}
          providerDistributionData={providerDistributionData}
          categoryDistributionData={categoryDistributionData}
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
    </div>
  );
};

interface SummarySectionProps {
  spendSummaryData: SpendSummary;
  providerDistributionData: ProviderDistribution[];
  categoryDistributionData: CategoryDistribution[];
  anomaliesData: Anomaly[];
  savingsOpportunitiesData: SavingsOpportunities;
}
