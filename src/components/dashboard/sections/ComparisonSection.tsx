
import React from 'react';
import { EnvironmentComparisonCard } from '../EnvironmentComparisonCard';
import { CostBenchmarksCard } from '../CostBenchmarksCard';
import { NewServicesCard } from '../NewServicesCard';
import { RegionHeatmapCard } from '../RegionHeatmapCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Reference } from 'lucide-react';

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
      <div className="flex items-center mb-4">
        <Reference className="h-5 w-5 mr-2 text-purple-600" />
        <h2 className="text-lg font-semibold">Comparativos e Referências</h2>
      </div>
      
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 xl:col-span-3">
          <EnvironmentComparisonCard 
            environments={environmentsData}
            currency={currency}
          />
        </div>
        
        <div className="col-span-12 sm:col-span-6 xl:col-span-3">
          <CostBenchmarksCard 
            benchmarks={benchmarksData}
            currency={currency}
          />
        </div>
        
        <div className="col-span-12 sm:col-span-6 xl:col-span-3">
          <NewServicesCard 
            services={newServicesData}
          />
        </div>
        
        <div className="col-span-12 sm:col-span-6 xl:col-span-3">
          <RegionHeatmapCard 
            data={regionHeatmapData}
            currency={currency}
          />
        </div>
      </div>
    </div>
  );
}
