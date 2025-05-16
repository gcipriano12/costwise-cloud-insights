import React from 'react';
import { SpendSummaryCard } from '../SpendSummaryCard';
import { ProviderDistributionCard } from '../ProviderDistributionCard';
import { AnomaliesCard } from '../AnomaliesCard';
import { SavingsOpportunitiesCard } from '../SavingsOpportunitiesCard';

interface SummarySectionProps {
  spendSummaryData: {
    totalSpend: number;
    currency: string;
    previousPeriodChange: number;
    sparklineData: number[];
  };
  providerDistributionData: {
    name: string;
    value: number;
    color: string;
  }[];
  anomaliesData: {
    id: string;
    severity: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    impact: number;
  }[];
  savingsOpportunitiesData: {
    opportunities: {
      id: string;
      title: string;
      description: string;
      savings: number;
      effort: 'high' | 'medium' | 'low';
    }[];
    totalPotentialSavings: number;
    currency: string;
  };
}

export function SummarySection({ 
  spendSummaryData, 
  providerDistributionData, 
  anomaliesData, 
  savingsOpportunitiesData 
}: SummarySectionProps) {
  return (
    <div className="space-y-4 mb-4">
      {/* Resumo de Gastos ocupa toda a largura */}
      <div className="w-full">
        <SpendSummaryCard 
          totalSpend={spendSummaryData.totalSpend}
          currency={spendSummaryData.currency}
          previousPeriodChange={spendSummaryData.previousPeriodChange}
          sparklineData={spendSummaryData.sparklineData}
        />
      </div>
      
      {/* Os outros três cards ficam lado a lado abaixo */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <ProviderDistributionCard 
            data={providerDistributionData}
            currency="R$"
          />
        </div>
        
        <div className="col-span-12 md:col-span-4">
          <AnomaliesCard 
            anomalies={anomaliesData}
            currency="R$"
          />
        </div>

        <div className="col-span-12 md:col-span-4">
          <SavingsOpportunitiesCard 
            opportunities={savingsOpportunitiesData.opportunities}
            totalPotentialSavings={savingsOpportunitiesData.totalPotentialSavings}
            currency={savingsOpportunitiesData.currency}
          />
        </div>
      </div>
    </div>
  );
}
