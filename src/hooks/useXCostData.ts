
import { useState, useEffect } from 'react';
import { useCredentials } from './useCredentials';
import { useAnalytics } from './useAnalytics';
import type { 
  SpendSummary,
  ProviderDistribution,
  CategoryDistribution,
  TopService,
  Anomaly,
  SavingsOpportunities
} from './useDashboardData';
import type {
  TrendData,
  ServiceCost,
  RegionCost
} from '../types/api';

export const useXCostData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { credentials } = useCredentials();
  const { getTrend, getServiceCosts, getRegionCosts } = useAnalytics();

  // Estado para dados integrados
  const [spendSummary, setSpendSummary] = useState<SpendSummary | null>(null);
  const [providerDistribution, setProviderDistribution] = useState<ProviderDistribution[]>([]);
  const [topServices, setTopServices] = useState<TopService[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [serviceCosts, setServiceCosts] = useState<ServiceCost[]>([]);
  const [regionCosts, setRegionCosts] = useState<RegionCost[]>([]);

  // Função para carregar dados de uma credencial específica
  const loadDataForCredential = async (credentialId: number, days: number = 30) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`Loading X Cost data for credential ${credentialId}`);
      
      const [trends, services, regions] = await Promise.all([
        getTrend(credentialId, days).catch(err => {
          console.log('Trend data not available:', err.message);
          return [];
        }),
        getServiceCosts(credentialId, days).catch(err => {
          console.log('Service costs not available:', err.message);
          return [];
        }),
        getRegionCosts(credentialId, days).catch(err => {
          console.log('Region costs not available:', err.message);
          return [];
        })
      ]);

      // Converter dados da API para o formato do dashboard
      setTrendData(trends);
      setServiceCosts(services);
      setRegionCosts(regions);

      // Converter ServiceCost[] para TopService[]
      const convertedTopServices: TopService[] = services.slice(0, 5).map((service, index) => ({
        id: `service-${index}`,
        name: service.service_name,
        provider: 'AWS', // Assumindo AWS por padrão
        currentSpend: service.cost,
        previousSpend: service.cost - (service.cost * service.change_from_previous / 100),
        trend: service.change_from_previous
      }));
      setTopServices(convertedTopServices);

      // Criar distribuição por provedor baseada nos custos por região
      const providerDist: ProviderDistribution[] = regions.map(region => ({
        name: region.region,
        value: region.cost,
        color: getColorForProvider(region.region)
      }));
      setProviderDistribution(providerDist);

      // Criar resumo de gastos - corrigindo a lógica de soma
      const totalSpend = services.reduce((total, service) => total + service.cost, 0);
      const previousTotalSpend = services.reduce((total, service) => {
        const previousCost = service.cost - (service.cost * service.change_from_previous / 100);
        return total + previousCost;
      }, 0);
      
      const changePercentage = previousTotalSpend > 0 
        ? ((totalSpend - previousTotalSpend) / previousTotalSpend) * 100
        : 0;

      const summary: SpendSummary = {
        totalSpend,
        currency: 'R$',
        previousPeriodChange: changePercentage,
        sparklineData: trends.map(t => t.total_cost),
        providerBreakdown: providerDist.map(p => ({
          name: p.name,
          value: (p.value / totalSpend) * 100,
          color: p.color
        }))
      };
      setSpendSummary(summary);

      console.log('X Cost data loaded successfully');
    } catch (err: any) {
      console.error('Error loading X Cost data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Função auxiliar para obter cores dos provedores
  const getColorForProvider = (region: string): string => {
    if (region.includes('us-') || region.includes('sa-')) return '#FF9900'; // AWS
    if (region.includes('East') || region.includes('Brazil')) return '#0078D4'; // Azure
    if (region.includes('central')) return '#4285F4'; // GCP
    return '#F80000'; // Oracle Cloud
  };

  // Carregar dados automaticamente se houver credenciais
  useEffect(() => {
    if (credentials.length > 0) {
      const activeCredential = credentials.find(c => c.is_active) || credentials[0];
      if (activeCredential) {
        loadDataForCredential(activeCredential.id);
      }
    }
  }, [credentials]);

  return {
    loading,
    error,
    spendSummary,
    providerDistribution,
    topServices,
    trendData,
    serviceCosts,
    regionCosts,
    loadDataForCredential,
    hasCredentials: credentials.length > 0,
    activeCredential: credentials.find(c => c.is_active) || credentials[0]
  };
};
