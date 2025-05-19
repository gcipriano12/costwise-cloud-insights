
import React from 'react';
import { SpendSummaryCard } from '../SpendSummaryCard';
import { ProviderDistributionCard } from '../ProviderDistributionCard';
import { AnomaliesCard } from '../AnomaliesCard';
import { SavingsOpportunitiesCard } from '../SavingsOpportunitiesCard';
import { ChartPie } from 'lucide-react';

interface SummarySectionProps {
  spendSummaryData: {
    totalSpend: number;
    currency: string;
    previousPeriodChange: number;
    sparklineData: number[];
    categoryBreakdown?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    wastedSpend?: number;
    budgetLimit?: number;
    budgetConsumed?: number;
    savingsRealized?: number;
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
    <div className="space-y-4 mb-6">
      {/* Título da seção */}
      <div className="flex items-center mb-2">
        <ChartPie className="h-5 w-5 mr-2 text-blue-600" />
        <h2 className="text-lg font-semibold">Resumo Financeiro</h2>
      </div>
      
      {/* Resumo de Gastos ocupa toda a largura */}
      <div className="w-full">
        <SpendSummaryCard 
          totalSpend={spendSummaryData.totalSpend}
          currency={spendSummaryData.currency}
          previousPeriodChange={spendSummaryData.previousPeriodChange}
          sparklineData={spendSummaryData.sparklineData}
          categoryBreakdown={spendSummaryData.categoryBreakdown}
          wastedSpend={spendSummaryData.wastedSpend}
          budgetLimit={spendSummaryData.budgetLimit}
          budgetConsumed={spendSummaryData.budgetConsumed}
          savingsRealized={spendSummaryData.savingsRealized}
        />
      </div>
      
      {/* Os outros três cards ficam lado a lado abaixo */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1">
          <ProviderDistributionCard 
            data={providerDistributionData}
            currency="R$"
          />
        </div>
        
        <div className="col-span-1">
          <AnomaliesCard 
            anomalies={anomaliesData}
            currency="R$"
          />
        </div>

        <div className="col-span-1">
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
