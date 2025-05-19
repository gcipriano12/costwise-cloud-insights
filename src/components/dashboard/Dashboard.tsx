import { useState } from 'react';
import Header from '../layout/Header';
import { ChatBot } from '../chat/ChatBot';
import { DashboardContent } from './DashboardContent';
import { useDashboardData } from '../../hooks/useDashboardData';

export default function Dashboard() {
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
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
    </div>
  );
}
