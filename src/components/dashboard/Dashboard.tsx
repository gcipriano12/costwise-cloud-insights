
import { useState } from 'react';
import Header from '../layout/Header';
import { SpendSummaryCard } from './SpendSummaryCard';
import { ProviderDistributionCard } from './ProviderDistributionCard';
import { TopServicesCard } from './TopServicesCard';
import { AnomaliesCard } from './AnomaliesCard';
import { SavingsOpportunitiesCard } from './SavingsOpportunitiesCard';
import { TimeFilter } from './TimeFilter';
import { ChatBot } from '../chat/ChatBot';

// Importando os novos componentes
import { SpendingTrendsCard } from './SpendingTrendsCard';
import { SpendingForecastCard } from './SpendingForecastCard';
import { ResourceUtilizationCard } from './ResourceUtilizationCard';
import { FinOpsComplianceCard } from './FinOpsComplianceCard';
import { EfficiencyKPIsCard } from './EfficiencyKPIsCard';
import { CostEventCalendarCard } from './CostEventCalendarCard';
import { EnvironmentComparisonCard } from './EnvironmentComparisonCard';
import { RegionHeatmapCard } from './RegionHeatmapCard';
import { NewServicesCard } from './NewServicesCard';
import { CostBenchmarksCard } from './CostBenchmarksCard';

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
      severity: 'high' as const, // type assertion to specific literals
      title: 'Aumento súbito em custos de VM',
      description: 'Detectamos um aumento de 350% nos custos de VMs no projeto "data-pipeline"',
      impact: 23450.60
    },
    {
      id: 'a2',
      severity: 'medium' as const,
      title: 'Recursos ociosos',
      description: 'Mais de 15 instâncias com utilização abaixo de 10% no último mês',
      impact: 12300.80
    },
    {
      id: 'a3',
      severity: 'low' as const,
      title: 'Snapshots expirados',
      description: 'Detectamos 27 snapshots mais antigos que 90 dias',
      impact: 3450.20
    }
  ];
  
  const savingsOpportunitiesData = {
    opportunities: [
      {
        id: 'op1',
        title: 'Reserved Instances',
        description: 'Convertendo 74 instâncias on-demand para RIs',
        savings: 67890.50,
        effort: 'low' as const
      },
      {
        id: 'op2',
        title: 'Rightsizing',
        description: 'Redimensionar 32 instâncias para tamanhos mais adequados',
        savings: 23456.70,
        effort: 'medium' as const
      },
      {
        id: 'op3',
        title: 'Storage Lifecycle',
        description: 'Configurar regras de ciclo de vida para buckets S3',
        savings: 12345.60,
        effort: 'low' as const
      },
    ],
    totalPotentialSavings: 103692.80,
    currency: 'R$'
  };

  // Mock data for new components
  const spendingCategoriesData = [
    { name: 'Computação', value: 543210.50, color: '#FF9900' },
    { name: 'Armazenamento', value: 324567.80, color: '#0078D4' },
    { name: 'Rede', value: 234567.40, color: '#4285F4' },
    { name: 'Banco de Dados', value: 143333.20, color: '#F80000' },
  ];

  const forecastData = [
    { month: 'Jan', actual: 320000, forecast: undefined, budget: 350000 },
    { month: 'Fev', actual: 340000, forecast: undefined, budget: 350000 },
    { month: 'Mar', actual: 360000, forecast: undefined, budget: 350000 },
    { month: 'Abr', actual: 330000, forecast: undefined, budget: 350000 },
    { month: 'Mai', actual: 345000, forecast: undefined, budget: 350000 },
    { month: 'Jun', actual: undefined, forecast: 350000, budget: 350000 },
    { month: 'Jul', actual: undefined, forecast: 355000, budget: 350000 },
  ];

  const resourcesData = [
    { name: 'vCPUs', usage: 280, totalAvailable: 320, warningThreshold: 85 },
    { name: 'Memória RAM', usage: 620, totalAvailable: 768, warningThreshold: 90 },
    { name: 'Armazenamento', usage: 5.8, totalAvailable: 8, warningThreshold: 80 },
    { name: 'Licenças SQL', usage: 42, totalAvailable: 50, warningThreshold: 95 },
  ];

  const complianceData = [
    { id: 'c1', name: 'Instâncias com tags', status: 'compliant' as const, description: 'Todas as instâncias devem ter tags de projeto e ambiente.' },
    { id: 'c2', name: 'Volumes encriptados', status: 'compliant' as const, description: 'Todos os volumes de armazenamento devem ser encriptados.' },
    { id: 'c3', name: 'Relatórios de custos', status: 'compliant' as const, description: 'Relatórios detalhados de custos devem ser gerados mensalmente.' },
    { id: 'c4', name: 'Políticas de retenção', status: 'non-compliant' as const, description: 'Políticas de retenção de dados devem ser definidas para todos os buckets de armazenamento.' },
    { id: 'c5', name: 'Alocação de custos', status: 'non-compliant' as const, description: 'Todos os custos devem ser alocados a um centro de custo.' },
  ];

  const kpiData = [
    { name: 'Custo por transação', value: 0.042, unit: 'R$', trend: -5.2, target: 0.05, isGoodWhenHigher: false },
    { name: 'Utilização de CPU', value: 68, unit: '%', trend: 3.5, target: 75, isGoodWhenHigher: true },
    { name: 'Custo/Receita', value: 0.18, unit: '', trend: -2.1, target: 0.15, isGoodWhenHigher: false },
    { name: 'Economia mensal', value: 45.380, unit: 'k R$', trend: 12.3, isGoodWhenHigher: true },
  ];

  const costEventsData = [
    { id: 'e1', date: '2025-05-20', title: 'Faturamento AWS', type: 'billing' as const, impact: 543210.50, currency: 'R$' },
    { id: 'e2', date: '2025-05-25', title: 'Renovação contrato Azure', type: 'contract' as const, impact: 120000.00, currency: 'R$' },
    { id: 'e3', date: '2025-05-28', title: 'Revisão de orçamento', type: 'budget' as const },
    { id: 'e4', date: '2025-06-05', title: 'Faturamento GCP', type: 'billing' as const, impact: 234567.40, currency: 'R$' },
  ];

  const environmentsData = [
    { name: 'Produção', cost: 890450.60, previousPeriodCost: 850340.20, efficiency: 82 },
    { name: 'Homologação', cost: 234560.30, previousPeriodCost: 220450.10, efficiency: 65 },
    { name: 'Desenvolvimento', cost: 120667.80, previousPeriodCost: 145890.40, efficiency: 58 },
  ];

  const regionHeatmapData = [
    {
      name: 'AWS',
      value: 543210.50,
      children: [
        { name: 'us-east-1', value: 243210.30 },
        { name: 'sa-east-1', value: 120000.20 },
        { name: 'eu-west-1', value: 180000.00 },
      ]
    },
    {
      name: 'Azure',
      value: 324567.80,
      children: [
        { name: 'East US', value: 124567.50 },
        { name: 'Brazil South', value: 100000.30 },
        { name: 'West Europe', value: 100000.00 },
      ]
    },
    {
      name: 'GCP',
      value: 234567.40,
      children: [
        { name: 'us-central1', value: 114567.20 },
        { name: 'southamerica-east1', value: 60000.20 },
        { name: 'europe-west1', value: 60000.00 },
      ]
    },
  ];

  const newServicesData = [
    { 
      id: 'ns1',
      name: 'AWS Lambda',
      provider: 'AWS',
      addedDate: '2025-05-10',
      cost: 5430.20,
      currency: 'R$',
      tags: ['serverless', 'novo-projeto']
    },
    { 
      id: 'ns2',
      name: 'Azure DevOps',
      provider: 'Azure',
      addedDate: '2025-05-08',
      cost: 3200.50,
      currency: 'R$',
      tags: ['devops', 'ci-cd'] 
    },
    { 
      id: 'ns3',
      name: 'GCP BigQuery',
      provider: 'GCP',
      addedDate: '2025-05-02',
      cost: 7800.30,
      currency: 'R$',
      tags: ['analytics', 'big-data'] 
    },
  ];

  const benchmarksData = [
    { 
      serviceType: 'Instâncias Compute',
      yourCost: 12.50,
      industryAverage: 18.75,
      bestInClass: 8.25,
      percentile: 35
    },
    { 
      serviceType: 'Storage (por GB)',
      yourCost: 0.085,
      industryAverage: 0.095,
      bestInClass: 0.065,
      percentile: 25
    },
    { 
      serviceType: 'Banco de Dados',
      yourCost: 52.30,
      industryAverage: 45.20,
      bestInClass: 39.10,
      percentile: 85
    },
  ];
  
  return (
    <div className="min-h-screen bg-cloudcostx-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-cloudcostx-blue">Dashboard</h1>
          <TimeFilter value={timeFilter} onChange={setTimeFilter} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Primeira linha */}
          <div className="col-span-1 lg:col-span-1">
            <SpendSummaryCard 
              totalSpend={spendSummaryData.totalSpend}
              currency={spendSummaryData.currency}
              previousPeriodChange={spendSummaryData.previousPeriodChange}
              sparklineData={spendSummaryData.sparklineData}
            />
          </div>
          
          <div className="col-span-1 lg:col-span-1">
            <ProviderDistributionCard 
              data={providerDistributionData}
              currency="R$"
            />
          </div>
          
          <div className="col-span-1 lg:col-span-1">
            <AnomaliesCard 
              anomalies={anomaliesData}
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
          
          {/* Segunda linha */}
          <div className="col-span-1 md:col-span-2">
            <TopServicesCard 
              services={topServicesData}
              currency="R$"
            />
          </div>

          <div className="col-span-1 lg:col-span-2">
            <SpendingForecastCard 
              data={forecastData}
              currency="R$"
            />
          </div>
          
          {/* Terceira linha */}
          <div className="col-span-1 lg:col-span-2">
            <SpendingTrendsCard 
              categories={spendingCategoriesData}
              currency="R$"
            />
          </div>
          
          <div className="col-span-1">
            <ResourceUtilizationCard 
              resources={resourcesData}
            />
          </div>
          
          <div className="col-span-1">
            <FinOpsComplianceCard 
              items={complianceData}
            />
          </div>
          
          {/* Quarta linha */}
          <div className="col-span-1 md:col-span-2">
            <EfficiencyKPIsCard 
              kpis={kpiData}
            />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <CostEventCalendarCard 
              events={costEventsData}
              currentMonth="Maio 2025"
            />
          </div>
          
          {/* Quinta linha */}
          <div className="col-span-1 lg:col-span-1">
            <EnvironmentComparisonCard 
              environments={environmentsData}
              currency="R$"
            />
          </div>
          
          <div className="col-span-1 lg:col-span-1">
            <CostBenchmarksCard 
              benchmarks={benchmarksData}
              currency="R$"
            />
          </div>
          
          <div className="col-span-1 lg:col-span-1">
            <NewServicesCard 
              services={newServicesData}
            />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <RegionHeatmapCard 
              data={regionHeatmapData}
              currency="R$"
            />
          </div>
        </div>
      </main>
      
      <ChatBot />
    </div>
  );
}
