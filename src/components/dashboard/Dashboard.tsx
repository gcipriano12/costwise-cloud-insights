
import React, { useState } from 'react';
import Header from '../layout/Header';
import { SpendSummaryCard } from './SpendSummaryCard';
import { ProviderDistributionCard } from './ProviderDistributionCard';
import { TopServicesCard } from './TopServicesCard';
import { AnomaliesCard } from './AnomaliesCard';
import { SavingsOpportunitiesCard } from './SavingsOpportunitiesCard';
import { TimeFilter } from './TimeFilter';

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('30d');
  
  // Mock data for demonstration
  const spendSummaryData = {
    totalSpend: 1245678.90,
    currency: 'R$',
    previousPeriodChange: -12.5,
    sparklineData: [45000, 48000, 52000, 49000, 54000, 59000, 58000]
  };
  
  const providerDistributionData = [
    { name: 'AWS', value: 543210.50, color: '#FF9900' },
    { name: 'Azure', value: 324567.80, color: '#0078D4' },
    { name: 'GCP', value: 234567.40, color: '#4285F4' },
    { name: 'Oracle Cloud', value: 143333.20, color: '#F80000' },
  ];
  
  const topServicesData = [
    { id: '1', name: 'EC2', provider: 'AWS', currentSpend: 245678.30, previousSpend: 225432.10, trend: 9 },
    { id: '2', name: 'S3', provider: 'AWS', currentSpend: 124567.80, previousSpend: 134567.80, trend: -7 },
    { id: '3', name: 'Azure VM', provider: 'Azure', currentSpend: 98765.40, previousSpend: 88123.45, trend: 12 },
    { id: '4', name: 'GCP Compute', provider: 'GCP', currentSpend: 87654.30, previousSpend: 77654.30, trend: 13 },
    { id: '5', name: 'RDS', provider: 'AWS', currentSpend: 76543.20, previousSpend: 81234.56, trend: -6 },
  ];
  
  const anomaliesData = [
    {
      id: 'a1',
      severity: 'high',
      title: 'Aumento súbito em custos de VM',
      description: 'Detectamos um aumento de 350% nos custos de VMs no projeto "data-pipeline"',
      impact: 23450.60
    },
    {
      id: 'a2',
      severity: 'medium',
      title: 'Recursos ociosos',
      description: 'Mais de 15 instâncias com utilização abaixo de 10% no último mês',
      impact: 12300.80
    },
    {
      id: 'a3',
      severity: 'low',
      title: 'Snapshots expirados',
      description: 'Detectamos 27 snapshots mais antigos que 90 dias',
      impact: 3450.20
    }
  ] as const;
  
  const savingsOpportunitiesData = {
    opportunities: [
      {
        id: 'op1',
        title: 'Reserved Instances',
        description: 'Convertendo 74 instâncias on-demand para RIs',
        savings: 67890.50,
        effort: 'low'
      },
      {
        id: 'op2',
        title: 'Rightsizing',
        description: 'Redimensionar 32 instâncias para tamanhos mais adequados',
        savings: 23456.70,
        effort: 'medium'
      },
      {
        id: 'op3',
        title: 'Storage Lifecycle',
        description: 'Configurar regras de ciclo de vida para buckets S3',
        savings: 12345.60,
        effort: 'low'
      },
    ] as const,
    totalPotentialSavings: 103692.80,
    currency: 'R$'
  };
  
  return (
    <div className="min-h-screen bg-cloudcostx-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-cloudcostx-blue">Dashboard</h1>
          <TimeFilter value={timeFilter} onChange={setTimeFilter} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <SpendSummaryCard 
              totalSpend={spendSummaryData.totalSpend}
              currency={spendSummaryData.currency}
              previousPeriodChange={spendSummaryData.previousPeriodChange}
              sparklineData={spendSummaryData.sparklineData}
            />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <ProviderDistributionCard 
              data={providerDistributionData}
              currency="R$"
            />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <AnomaliesCard 
              anomalies={anomaliesData}
              currency="R$"
            />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <TopServicesCard 
              services={topServicesData}
              currency="R$"
            />
          </div>
          
          <div className="col-span-1 lg:col-span-1">
            <SavingsOpportunitiesCard 
              opportunities={savingsOpportunitiesData.opportunities}
              totalPotentialSavings={savingsOpportunitiesData.totalPotentialSavings}
              currency={savingsOpportunitiesData.currency}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
