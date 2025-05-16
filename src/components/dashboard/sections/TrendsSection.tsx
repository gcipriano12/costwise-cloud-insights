import React from 'react';
import { SpendingTrendsCard } from '../SpendingTrendsCard';
import { ResourceUtilizationCard } from '../ResourceUtilizationCard';
import { FinOpsComplianceCard } from '../FinOpsComplianceCard';

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
    <div className="grid grid-cols-12 gap-4 mb-4">
      <div className="col-span-12 lg:col-span-6 h-[400px]">
        <div className="h-full">
          <SpendingTrendsCard 
            categories={spendingCategoriesData}
            currency={currency}
          />
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-6 lg:col-span-3 h-[400px]">
        <div className="h-full">
          <ResourceUtilizationCard 
            resources={resourcesData}
          />
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-6 lg:col-span-3 h-[400px]">
        <div className="h-full">
          <FinOpsComplianceCard 
            items={complianceData}
          />
        </div>
      </div>
    </div>
  );
}
