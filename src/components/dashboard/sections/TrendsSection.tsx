
import React from 'react';
import { SpendingTeamsCard } from '../SpendingTeamsCard';
import { ResourceUtilizationCard } from '../ResourceUtilizationCard';
import { FinOpsComplianceCard } from '../FinOpsComplianceCard';
import { ChartLine } from 'lucide-react';

interface TrendsSectionProps {
  spendingCategoriesData: {
    name: string;
    value: number;
    color: string;
  }[];
  resourcesData: {
    name: string;
    usage: number;
    totalAvailable: number;
    warningThreshold: number;
  }[];
  complianceData: {
    id: string;
    name: string;
    status: 'compliant' | 'non-compliant';
    description: string;
  }[];
  currency: string;
}

export function TrendsSection({ 
  spendingCategoriesData, 
  resourcesData, 
  complianceData, 
  currency 
}: TrendsSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <ChartLine className="h-5 w-5 mr-2 text-amber-600" />
        <h2 className="text-lg font-semibold">Tendências e Utilização</h2>
      </div>
      
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-6">
          <SpendingTeamsCard 
            categories={spendingCategoriesData}
            currency={currency}
          />
        </div>
        
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <ResourceUtilizationCard 
            resources={resourcesData}
          />
        </div>
        
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <FinOpsComplianceCard 
            items={complianceData}
          />
        </div>
      </div>
    </div>
  );
}
