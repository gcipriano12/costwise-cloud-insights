
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Environment {
  name: string;
  cost: number;
  previousPeriodCost: number;
  efficiency: number;
}

interface EnvironmentComparisonCardProps {
  environments: Environment[];
  currency: string;
}

export function EnvironmentComparisonCard({ environments, currency }: EnvironmentComparisonCardProps) {
  // Find the environment with the highest cost for scaling
  const maxCost = Math.max(...environments.map(env => env.cost));
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base font-semibold">
          <MapPin className="h-5 w-5 mr-2 text-green-500" />
          Comparação de Ambientes
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <div className="space-y-3">
          {environments.map((env) => {
            const changePercentage = ((env.cost - env.previousPeriodCost) / env.previousPeriodCost) * 100;
            const isIncrease = changePercentage > 0;
            return (
              <div key={env.name} className="space-y-0.5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium truncate max-w-[40%]">{env.name}</span>
                  <span className="text-base font-bold truncate max-w-[55%] text-right">
                    {currency} {env.cost.toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1})}
                  </span>
                </div>
                <Progress 
                  value={(env.cost / maxCost) * 100} 
                  className="h-1.5"
                />
                <div className="flex justify-between items-center text-[11px] text-muted-foreground mt-1">
                  <div className="flex items-center truncate max-w-[70%]">
                    <span className="whitespace-nowrap">{currency} {env.previousPeriodCost.toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1})}</span>
                    <ArrowRight className="h-3 w-3 mx-1 flex-shrink-0" />
                    <span className="whitespace-nowrap">{currency} {env.cost.toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1})}</span>
                  </div>
                  <div className={`whitespace-nowrap ${isIncrease ? 'text-cloudcostx-red' : 'text-cloudcostx-green'}`}>
                    {isIncrease ? '+' : ''}{changePercentage.toFixed(1)}%
                  </div>
                </div>
                <div className="flex justify-between items-center text-[11px] mt-0.5">
                  <span>Eficiência:</span>
                  <span className={env.efficiency >= 70 ? 'text-cloudcostx-green' : 'text-cloudcostx-red'}>
                    {env.efficiency}%
                  </span>
                </div>
                <hr className="my-1 border-t border-gray-100 last:hidden" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
