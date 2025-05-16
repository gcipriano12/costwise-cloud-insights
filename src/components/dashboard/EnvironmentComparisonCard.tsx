
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <MapPin className="h-5 w-5 mr-2" />
          Comparação de Ambientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {environments.map((env) => {
            const changePercentage = ((env.cost - env.previousPeriodCost) / env.previousPeriodCost) * 100;
            const isIncrease = changePercentage > 0;
            
            return (
              <div key={env.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{env.name}</span>
                  <span className="text-sm font-bold">
                    {currency} {env.cost.toLocaleString()}
                  </span>
                </div>
                
                <Progress 
                  value={(env.cost / maxCost) * 100} 
                  className="h-2" 
                />
                
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <span>{currency} {env.previousPeriodCost.toLocaleString()}</span>
                    <ArrowRight className="h-3 w-3 mx-1" />
                    <span>{currency} {env.cost.toLocaleString()}</span>
                  </div>
                  <div className={isIncrease ? 'text-cloudcostx-red' : 'text-cloudcostx-green'}>
                    {isIncrease ? '+' : ''}{changePercentage.toFixed(1)}%
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span>Eficiência:</span>
                  <span className={env.efficiency >= 70 ? 'text-cloudcostx-green' : 'text-cloudcostx-red'}>
                    {env.efficiency}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
