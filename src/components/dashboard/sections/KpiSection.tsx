
import React from 'react';
import { EfficiencyKPIsCard } from '../EfficiencyKPIsCard';
import { CostEventCalendarCard } from '../CostEventCalendarCard';
import { ChartBar } from 'lucide-react';

type KPICategory = 'eficiencia' | 'tarifacao' | 'planejamento' | 'governanca';

interface KpiSectionProps {
  kpiData: {
    name: string;
    value: number;
    unit?: string;
    trend?: number;
    target?: number;
    isGoodWhenHigher?: boolean;
    description?: string;
    formula?: string;
    category: KPICategory;
  }[];
  costEventsData: {
    id: string;
    date: string;
    title: string;
    type: 'billing' | 'contract' | 'budget' | 'other';
    impact?: number;
    currency?: string;
  }[];
  currentMonth: string;
}

export function KpiSection({ kpiData, costEventsData, currentMonth }: KpiSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <ChartBar className="h-5 w-5 mr-2 text-red-600" />
        <h2 className="text-lg font-semibold">Indicadores e Eventos</h2>
      </div>
      
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-6">
          <EfficiencyKPIsCard 
            kpis={kpiData}
          />
        </div>
        
        <div className="col-span-12 lg:col-span-6">
          <CostEventCalendarCard 
            events={costEventsData}
          />
        </div>
      </div>
    </div>
  );
}
