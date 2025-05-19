
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
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Comparativos e Referências</h2>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <EnvironmentComparisonCard 
            environments={environmentsData}
            currency={currency}
          />
        </div>
        
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <CostBenchmarksCard 
            benchmarks={benchmarksData}
            currency={currency}
          />
        </div>
        
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <NewServicesCard 
            services={newServicesData}
          />
        </div>
        
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <RegionHeatmapCard 
            data={regionHeatmapData}
            currency={currency}
          />
        </div>
      </div>
    </div>
  );
}
