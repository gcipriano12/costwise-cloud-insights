
import React from 'react';
import { EnvironmentComparisonCard } from '../EnvironmentComparisonCard';
import { CostBenchmarksCard } from '../CostBenchmarksCard';
import { NewServicesCard } from '../NewServicesCard';
import { RegionHeatmapCard } from '../RegionHeatmapCard';

interface ComparisonSectionProps {
  environmentsData: {
    name: string;
    cost: number;
    previousPeriodCost: number;
    efficiency: number;
  }[];
  benchmarksData: {
    serviceType: string;
    yourCost: number;
    industryAverage: number;
    bestInClass: number;
    percentile: number;
  }[];
  newServicesData: {
    id: string;
    name: string;
    provider: string;
    addedDate: string;
    cost: number;
    currency: string;
    tags: string[];
  }[];
  regionHeatmapData: {
    name: string;
    value: number;
    children?: {
      name: string;
      value: number;
    }[];
  }[];
  currency: string;
}

export function ComparisonSection({ 
  environmentsData, 
  benchmarksData, 
  newServicesData, 
  regionHeatmapData, 
  currency 
}: ComparisonSectionProps) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="h-full">
          <EnvironmentComparisonCard 
            environments={environmentsData}
            currency={currency}
          />
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="h-full">
          <CostBenchmarksCard 
            benchmarks={benchmarksData}
            currency={currency}
          />
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="h-full">
          <NewServicesCard 
            services={newServicesData}
          />
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-6 lg:col-span-3">
        <div className="h-full">
          <RegionHeatmapCard 
            data={regionHeatmapData}
            currency={currency}
          />
        </div>
      </div>
    </div>
  );
}
