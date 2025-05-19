import React from 'react';
import { EnvironmentComparisonCard } from '../EnvironmentComparisonCard';
import { CostBenchmarksCard } from '../CostBenchmarksCard';
import { NewServicesCard } from '../NewServicesCard';
import { RegionHeatmapCard } from '../RegionHeatmapCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

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
  // Filtrar as top 5 regiões pelo valor total
  const topRegions = [...regionHeatmapData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <BarChart className="h-5 w-5 mr-2 text-purple-600" />
        <h2 className="text-lg font-semibold">Comparativos e Referências</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        <div className="col-span-1 h-full flex flex-col">
          <EnvironmentComparisonCard 
            environments={environmentsData}
            currency={currency}
          />
        </div>
        
        <div className="col-span-1 h-full flex flex-col">
          <CostBenchmarksCard 
            benchmarks={benchmarksData}
            currency={currency}
          />
        </div>
        
        <div className="col-span-1 h-full flex flex-col">
          <NewServicesCard 
            services={newServicesData}
          />
        </div>
        
        <div className="col-span-1 h-full flex flex-col">
          <RegionHeatmapCard 
            data={topRegions}
            currency={currency}
          />
        </div>
      </div>
    </div>
  );
}
