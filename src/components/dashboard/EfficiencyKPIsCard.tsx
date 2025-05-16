
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';

interface KPI {
  name: string;
  value: number | string;
  unit?: string;
  trend?: number;
  target?: number;
  isGoodWhenHigher?: boolean;
}

interface EfficiencyKPIsCardProps {
  kpis: KPI[];
}

export function EfficiencyKPIsCard({ kpis }: EfficiencyKPIsCardProps) {
  const getTrendIcon = (trend: number | undefined, isGoodWhenHigher = true) => {
    if (trend === undefined) return null;
    
    const isPositive = trend > 0;
    const isGoodTrend = isGoodWhenHigher ? isPositive : !isPositive;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;
    
    return (
      <TrendIcon 
        className={`h-4 w-4 ml-2 ${isGoodTrend ? 'text-cloudcostx-green' : 'text-cloudcostx-red'}`} 
      />
    );
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <BarChart2 className="h-5 w-5 mr-2" />
          KPIs de Eficiência
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.name} className="p-3 bg-muted/50 rounded-md">
              <div className="text-sm text-muted-foreground">{kpi.name}</div>
              <div className="flex items-center mt-1">
                <div className="text-xl font-bold">
                  {typeof kpi.value === 'number' 
                    ? kpi.value.toLocaleString() 
                    : kpi.value}
                  {kpi.unit && <span className="text-sm font-normal ml-1">{kpi.unit}</span>}
                </div>
                {getTrendIcon(kpi.trend, kpi.isGoodWhenHigher)}
              </div>
              {kpi.target !== undefined && (
                <div className="text-xs text-muted-foreground mt-1">
                  Meta: {kpi.target.toLocaleString()}{kpi.unit}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
