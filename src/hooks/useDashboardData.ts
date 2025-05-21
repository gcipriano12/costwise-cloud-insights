import { useState } from 'react';

// Types for dashboard data
export type SpendSummary = {
  totalSpend: number;
  currency: string;
  previousPeriodChange: number;
  sparklineData: number[];
  providerBreakdown?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  wastedSpend?: number;
  budgetLimit?: number;
  budgetConsumed?: number;
  savingsRealized?: number;
};

export type ProviderDistribution = {
  name: string;
  value: number;
  color: string;
};

export type CategoryDistribution = {
  name: string;
  value: number;
  color: string;
};

export type TopService = {
  id: string;
  name: string;
  provider: string;
  currentSpend: number;
  previousSpend: number;
  trend: number;
};

export type ForecastData = {
  month: string;
  actual?: number;
  forecast?: number;
  budget?: number;
};

export type Anomaly = {
  id: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: number;
  resource?: string;
  provider?: string;
  dateDetected: string;
  tags?: string[];
};

export type SavingsOpportunity = {
  id: string;
  title: string;
  description: string;
  savings: number;
  effort: 'high' | 'medium' | 'low';
};

export type SavingsOpportunities = {
  opportunities: SavingsOpportunity[];
  totalPotentialSavings: number;
  currency: string;
};

export type SpendingTeam = {
  name: string;
  value: number;
  color: string;
};

export type Resource = {
  name: string;
  usage: number;
  totalAvailable: number;
  warningThreshold: number;
};

export type ComplianceItem = {
  id: string;
  name: string;
  status: 'compliant' | 'non-compliant';
  description: string;
};

export type KPICategory = 'eficiencia' | 'tarifacao' | 'planejamento' | 'governanca';

export type KPI = {
  name: string;
  value: number;
  unit?: string;
  trend?: number;
  target?: number;
  isGoodWhenHigher?: boolean;
  description?: string;
  formula?: string;
  category: KPICategory;
};

export type CostEvent = {
  id: string;
  date: string;
  title: string;
  type: 'billing' | 'contract' | 'budget' | 'other';
  impact?: number;
  currency?: string;
};

export type Environment = {
  name: string;
  cost: number;
  previousPeriodCost: number;
  efficiency: number;
};

export type Benchmark = {
  serviceType: string;
  yourCost: number;
  industryAverage: number;
  bestInClass: number;
  percentile: number;
};

export type NewService = {
  id: string;
  name: string;
  provider: string;
  addedDate: string;
  cost: number;
  currency: string;
  tags: string[];
};

export type RegionData = {
  name: string;
  value: number;
  children?: {
    name: string;
    value: number;
  }[];
};

export type DashboardData = {
  spendSummaryData: SpendSummary;
  providerDistributionData: ProviderDistribution[];
  categoryDistributionData: CategoryDistribution[];
  topServicesData: TopService[];
  anomaliesData: Anomaly[];
  savingsOpportunitiesData: SavingsOpportunities;
  spendingTeamsData: SpendingTeam[];
  forecastData: ForecastData[];
  resourcesData: Resource[];
  complianceData: ComplianceItem[];
  kpiData: KPI[];
  costEventsData: CostEvent[];
  environmentsData: Environment[];
  benchmarksData: Benchmark[];
  newServicesData: NewService[];
  regionHeatmapData: RegionData[];
  currency: string;
};

export const useDashboardData = () => {
  const [timeFilter, setTimeFilter] = useState('30d');
  
  // Mock data for the dashboard
  const dashboardData: DashboardData = {
    currency: 'R$',
    // Dados para a seção de resumo
    spendSummaryData: {
      totalSpend: 1245678.90,
      currency: 'R$',
      previousPeriodChange: -12.5,
      sparklineData: [45000, 48000, 52000, 49000, 54000, 59000, 58000],
      providerBreakdown: [
        { name: 'AWS', value: 58, color: '#F5A623' },
        { name: 'Azure', value: 22, color: '#0078D4' },
        { name: 'GCP', value: 12, color: '#4285F4' },
        { name: 'Oracle Cloud', value: 8, color: '#f80404' }
      ],
      wastedSpend: 186851.83,
      budgetLimit: 1500000,
      budgetConsumed: 83,
      savingsRealized: 99654.31
    },
    
    providerDistributionData: [
      { name: 'AWS', value: 543210.50, color: '#FF9900' },
      { name: 'Azure', value: 324567.80, color: '#0078D4' },
      { name: 'GCP', value: 234567.40, color: '#4285F4' },
      { name: 'Oracle Cloud', value: 143333.20, color: '#F80000' },
    ],
    
    categoryDistributionData: [
      { name: 'Computação', value: 623210.50, color: '#60A5FA' },
      { name: 'Armazenamento', value: 274567.80, color: '#F97316' },
      { name: 'Rede', value: 184567.40, color: '#10B981' },
      { name: 'Banco de Dados', value: 114567.20, color: '#8B5CF6' },
      { name: 'Outros', value: 48765.90, color: '#EC4899' },
    ],
    
    topServicesData: [
      { id: '1', name: 'EC2', provider: 'AWS', currentSpend: 245678.30, previousSpend: 225432.10, trend: 9 },
      { id: '2', name: 'S3', provider: 'AWS', currentSpend: 124567.80, previousSpend: 134567.80, trend: -7 },
      { id: '3', name: 'Azure VM', provider: 'Azure', currentSpend: 98765.40, previousSpend: 88123.45, trend: 12 },
      { id: '4', name: 'GCP Compute', provider: 'GCP', currentSpend: 87654.30, previousSpend: 77654.30, trend: 13 },
      { id: '5', name: 'RDS', provider: 'AWS', currentSpend: 76543.20, previousSpend: 81234.56, trend: -6 },
    ],
    
    anomaliesData: [
      {
        id: 'a3',
        severity: 'low',
        title: 'Snapshots expirados',
        description: 'Detectamos 27 snapshots mais antigos que 90 dias',
        impact: 3450.20,
        dateDetected: '2023-10-20'
      },
      {
        id: 'a1',
        severity: 'high',
        title: 'Aumento súbito em custos de VM',
        description: 'Detectamos um aumento de 350% nos custos de VMs no projeto "data-pipeline"',
        impact: 23450.60,
        dateDetected: '2023-10-26'
      },
      {
        id: 'a2',
        severity: 'medium',
        title: 'Recursos ociosos',
        description: 'Mais de 15 instâncias com utilização abaixo de 10% no último mês',
        impact: 12300.80,
        dateDetected: '2023-10-25'
      },
      {
        id: 'a4',
        severity: 'high',
        title: 'GPU não otimizadas',
        description: 'Instâncias GPU com menos de 30% de utilização',
        impact: 19850.75,
        dateDetected: '2023-10-24'
      },
      {
        id: 'a5',
        severity: 'medium',
        title: 'Balanceadores ociosos',
        description: '3 balanceadores de carga sem tráfego significativo nos últimos 30 dias',
        impact: 4560.30,
        dateDetected: '2023-10-23'
      },
      {
        id: 'a6',
        severity: 'low',
        title: 'Banco de dados sobredimensionado',
        description: 'RDS com menos de 25% de armazenamento utilizado',
        impact: 2960.45,
        dateDetected: '2023-10-22'
      },
      {
        id: 'a7',
        severity: 'high',
        title: 'IPs elásticos não associados',
        description: '12 IPs elásticos sem associação a instâncias',
        impact: 1870.20,
        dateDetected: '2023-10-21'
      }
    ],
    
    savingsOpportunitiesData: {
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
        {
          id: 'op4',
          title: 'Savings Plans',
          description: 'Adquirir Savings Plans para funções Lambda e Fargate',
          savings: 18750.30,
          effort: 'low'
        },
        {
          id: 'op5',
          title: 'Volumes não utilizados',
          description: 'Remover 47 volumes EBS não anexados a instâncias',
          savings: 5960.75,
          effort: 'low'
        },
        {
          id: 'op6',
          title: 'Clusters Kubernetes',
          description: 'Otimizar a escala de nós em clusters Kubernetes',
          savings: 14850.60,
          effort: 'medium'
        },
        {
          id: 'op7',
          title: 'Camadas de armazenamento',
          description: 'Migrar dados para classes de armazenamento mais econômicas',
          savings: 9320.40,
          effort: 'medium'
        }
      ],
      totalPotentialSavings: 152574.85,
      currency: 'R$'
    },

    // Dados para a seção de categorias e tendências
    spendingTeamsData: [
      { name: 'Desenvolvimento', value: 495000.50, color: '#4B5563' },
      { name: 'Infraestrutura', value: 358000.80, color: '#1D4ED8' },
      { name: 'Data Science', value: 276500.40, color: '#9333EA' },
      { name: 'Marketing', value: 116177.20, color: '#16A34A' },
    ],

    forecastData: [
      { month: 'Jan', actual: 320000, forecast: undefined, budget: 350000 },
      { month: 'Fev', actual: 340000, forecast: undefined, budget: 350000 },
      { month: 'Mar', actual: 360000, forecast: undefined, budget: 350000 },
      { month: 'Abr', actual: 330000, forecast: undefined, budget: 350000 },
      { month: 'Mai', actual: 345000, forecast: undefined, budget: 350000 },
      { month: 'Jun', actual: undefined, forecast: 350000, budget: 350000 },
      { month: 'Jul', actual: undefined, forecast: 355000, budget: 350000 },
    ],

    resourcesData: [
      { name: 'vCPUs', usage: 280, totalAvailable: 320, warningThreshold: 85 },
      { name: 'Memória RAM', usage: 620, totalAvailable: 768, warningThreshold: 90 },
      { name: 'Armazenamento', usage: 5.8, totalAvailable: 8, warningThreshold: 80 },
      { name: 'Licenças SQL', usage: 42, totalAvailable: 50, warningThreshold: 95 },
      { name: 'Volumes EBS', usage: 125, totalAvailable: 150, warningThreshold: 90 },
      { name: 'Largura de Banda', usage: 18, totalAvailable: 25, warningThreshold: 85 },
    ],

    complianceData: [
      { id: 'c1', name: 'Instâncias com tags', status: 'compliant', description: 'Todas as instâncias devem ter tags de projeto e ambiente.' },
      { id: 'c2', name: 'Volumes encriptados', status: 'compliant', description: 'Todos os volumes de armazenamento devem ser encriptados.' },
      { id: 'c3', name: 'Relatórios de custos', status: 'compliant', description: 'Relatórios detalhados de custos devem ser gerados mensalmente.' },
      { id: 'c4', name: 'Políticas de retenção', status: 'non-compliant', description: 'Políticas de retenção de dados devem ser definidas para todos os buckets de armazenamento.' },
      { id: 'c5', name: 'Alocação de custos', status: 'non-compliant', description: 'Todos os custos devem ser alocados a um centro de custo.' },
    ],

    kpiData: [
      { 
        name: 'Taxa de utilização de recursos', 
        value: 68, 
        unit: '%', 
        trend: 3.5, 
        target: 75, 
        isGoodWhenHigher: true,
        description: 'Quanto da CPU, memória, GPU, etc. você realmente utiliza em relação ao que provisionou. Mantém o super-provisionamento visível.',
        formula: '(Capacidade consumida ÷ Capacidade alocada) × 100',
        category: 'eficiencia'
      },
      { 
        name: 'Percentual de desperdício na nuvem', 
        value: 24, 
        unit: '%', 
        trend: -5.2, 
        target: 15, 
        isGoodWhenHigher: false,
        description: 'Parcela gasta em VMs ociosas, volumes destacados, snapshots zumbis. Impulsiona ações de interrupção/encerramento.',
        formula: '(Custo de recursos ociosos ÷ Gasto total na nuvem) × 100',
        category: 'eficiencia'
      },
      { 
        name: 'Taxa de adesão ao power-schedule', 
        value: 82, 
        unit: '%', 
        trend: 7.3, 
        target: 95, 
        isGoodWhenHigher: true,
        description: 'Se a automação de iniciar/parar funciona conforme planejado para cargas de trabalho não produtivas (noites/fins de semana).',
        formula: '(Horas de execução planejadas ÷ Horas de execução reais) × 100',
        category: 'eficiencia'
      },
      { 
        name: 'Percentual de recursos legados', 
        value: 37, 
        unit: '%', 
        trend: -2.1, 
        target: 20, 
        isGoodWhenHigher: false,
        description: 'Quantas instâncias ainda estão em famílias antigas e menos eficientes. Útil antes de ondas de migração.',
        formula: '(Contagem de instâncias legadas ÷ Total de instâncias) × 100',
        category: 'eficiencia'
      },
      { 
        name: 'Cobertura de instâncias reservadas', 
        value: 45, 
        unit: '%', 
        trend: 8.2, 
        target: 75, 
        isGoodWhenHigher: true,
        description: 'Percentual de instâncias cobertas por compromissos de longo prazo como RIs ou Savings Plans.',
        formula: '(Horas cobertas por reservas ÷ Horas totais de instâncias) × 100',
        category: 'eficiencia'
      },
      { 
        name: 'Eficiência de custos por serviço', 
        value: 0.31, 
        unit: 'R$/unid', 
        trend: -6.3, 
        target: 0.25, 
        isGoodWhenHigher: false,
        description: 'Custo normalizado por unidade de serviço entregue (transação, requisição, etc).',
        formula: 'Custo total do serviço ÷ Número de unidades processadas',
        category: 'eficiencia'
      },
      { 
        name: 'Densidade de contêineres', 
        value: 12, 
        unit: 'pods/nó', 
        trend: 3.8, 
        target: 15, 
        isGoodWhenHigher: true,
        description: 'Número médio de pods/contêineres por nó em clusters Kubernetes. Indica eficiência de empacotamento.',
        formula: 'Total de pods em execução ÷ Total de nós no cluster',
        category: 'eficiencia'
      },
      { 
        name: 'Custo por workload', 
        value: 3240, 
        unit: 'R$', 
        trend: -4.2, 
        target: 3000, 
        isGoodWhenHigher: false,
        description: 'Custo médio por aplicação ou carga de trabalho, ajuda a identificar aplicações com gastos desproporcionais.',
        formula: 'Custo total da infraestrutura ÷ Número de workloads',
        category: 'eficiencia'
      },
      { 
        name: 'Taxa de economia efetiva (ESR)', 
        value: 22, 
        unit: '%', 
        trend: 5.7, 
        target: 30, 
        isGoodWhenHigher: true,
        description: 'Economia líquida em comparação com preços sob demanda puros — unifica cobertura e utilização de RI/SP/CUD em um único número.',
        formula: '(Economias de todos os instrumentos de desconto ÷ Gasto equivalente sob demanda)',
        category: 'tarifacao'
      },
      { 
        name: 'Desperdício de desconto por compromisso', 
        value: 18, 
        unit: '%', 
        trend: -3.5, 
        target: 10, 
        isGoodWhenHigher: false,
        description: 'Quanto da capacidade de RI/SP/CUD comprada permanece não utilizada — destaca excesso de compromissos.',
        formula: '(Custo de compromisso não utilizado ÷ Custo total de compromisso) × 100',
        category: 'tarifacao'
      },
      { 
        name: 'Gastos computacionais cobertos por compromissos', 
        value: 65, 
        unit: '%', 
        trend: 8.3, 
        target: 80, 
        isGoodWhenHigher: true,
        description: 'Profundidade da cobertura de tarifas; valores baixos sinalizam vazamento de instâncias sob demanda.',
        formula: '(Gastos computacionais com desconto por compromisso ÷ Gastos computacionais totais) × 100',
        category: 'tarifacao'
      },
      { 
        name: 'Custo por hora de vCPU/GPU', 
        value: 0.42, 
        unit: 'R$/h', 
        trend: -2.8, 
        target: 0.35, 
        isGoodWhenHigher: false,
        description: 'Normaliza o custo para uma unidade técnica, ideal para comparações de preços entre provedores.',
        formula: '(Custo computacional por hora ÷ Número de vCPUs ou GPUs)',
        category: 'tarifacao'
      },
      { 
        name: 'Variação orçamento vs. previsão', 
        value: 8.5, 
        unit: '%', 
        trend: -2.3, 
        target: 5, 
        isGoodWhenHigher: false,
        description: 'Quão próxima sua previsão contínua está do orçamento ano a data. Variância ajustada prova disciplina de planejamento.',
        formula: '((Orçado - Previsto) ÷ Orçado) × 100',
        category: 'planejamento'
      },
      { 
        name: 'Variação de gasto na nuvem', 
        value: 12.3, 
        unit: '%', 
        trend: -4.1, 
        target: 7, 
        isGoodWhenHigher: false,
        description: 'O sinal clássico de gasto acima/abaixo do orçado; combina com análises detalhadas de causa raiz.',
        formula: '((Orçado - Real) ÷ Orçado) × 100',
        category: 'planejamento'
      },
      { 
        name: 'Taxa de precisão da previsão', 
        value: 84, 
        unit: '%', 
        trend: 6.2, 
        target: 90, 
        isGoodWhenHigher: true,
        description: 'Precisão preditiva para capacidade ou valores; orienta ajustes no modelo de previsão.',
        formula: '100 - abs((Previsão - Real) ÷ Previsão) × 100',
        category: 'planejamento'
      },
      { 
        name: 'Percentual de custo não alocado', 
        value: 18, 
        unit: '%', 
        trend: -4.7, 
        target: 5, 
        isGoodWhenHigher: false,
        description: 'Quanto do gasto ainda não possui uma tag ou proprietário — mantém o chargeback transparente.',
        formula: '(Custos não alocados ÷ Gasto total na nuvem) × 100',
        category: 'governanca'
      },
      { 
        name: 'Taxa de conformidade com política de tags', 
        value: 76, 
        unit: '%', 
        trend: 8.5, 
        target: 95, 
        isGoodWhenHigher: true,
        description: 'Saúde da sua disciplina de tagueamento; valores baixos comprometem todos os outros KPIs.',
        formula: '(Recursos corretamente tagueados ÷ Total de recursos) × 100',
        category: 'governanca'
      },
      { 
        name: 'Economia por detecção de anomalias', 
        value: 45250, 
        unit: 'R$', 
        trend: 12.8, 
        target: 50000, 
        isGoodWhenHigher: true,
        description: 'Economia obtida ao detectar picos de gastos antecipadamente com alertas.',
        formula: 'Soma de (Custo previsto do pico - Custo no desligamento)',
        category: 'governanca'
      }
    ],

    costEventsData: [
      // Eventos passados (serão destacados em vermelho)
      { id: 'e1', date: '2025-04-20', title: 'Faturamento AWS (anterior)', type: 'billing', impact: 543210.50, currency: 'R$' },
      { id: 'e2', date: '2025-05-02', title: 'Renovação licenças (anterior)', type: 'contract', impact: 85000.00, currency: 'R$' },
      
      // Eventos do mês atual
      { id: 'e3', date: '2025-05-20', title: 'Faturamento AWS', type: 'billing', impact: 543210.50, currency: 'R$' },
      { id: 'e4', date: '2025-05-25', title: 'Renovação contrato Azure', type: 'contract', impact: 120000.00, currency: 'R$' },
      { id: 'e5', date: '2025-05-28', title: 'Revisão de orçamento', type: 'budget' },
      
      // Eventos futuros
      { id: 'e6', date: '2025-06-05', title: 'Faturamento GCP', type: 'billing', impact: 234567.40, currency: 'R$' },
      { id: 'e7', date: '2025-06-15', title: 'Renovação suporte', type: 'contract', impact: 75000.00, currency: 'R$' },
    ],

    environmentsData: [
      { name: 'Produção', cost: 890450.60, previousPeriodCost: 850340.20, efficiency: 82 },
      { name: 'Homologação', cost: 234560.30, previousPeriodCost: 220450.10, efficiency: 65 },
      { name: 'Desenvolvimento', cost: 120667.80, previousPeriodCost: 145890.40, efficiency: 58 },
    ],

    regionHeatmapData: [
      {
        name: 'AWS',
        value: 543210.50,
        children: [
          { name: 'us-east-1', value: 243210.30 },
          { name: 'sa-east-1', value: 120000.20 }
        ]
      },
      {
        name: 'Azure',
        value: 324567.80,
        children: [
          { name: 'East US', value: 124567.50 },
          { name: 'Brazil South', value: 100000.30 }
        ]
      },
      {
        name: 'GCP',
        value: 234567.40,
        children: [
          { name: 'us-central1', value: 114567.20 }
        ]
      },
    ],

    benchmarksData: [
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
        yourCost:42.30,
        industryAverage: 45.20,
        bestInClass: 39.10,
        percentile: 85
      },
    ],

    newServicesData: [
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
    ]
  };

  return {
    timeFilter,
    setTimeFilter,
    ...dashboardData
  };
};
