import React from 'react';
import { EfficiencyKPIsCard } from '../EfficiencyKPIsCard';
import { CostEventCalendarCard } from '../CostEventCalendarCard';

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
    <div className="grid grid-cols-12 gap-4 mb-4">
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
  );
}
