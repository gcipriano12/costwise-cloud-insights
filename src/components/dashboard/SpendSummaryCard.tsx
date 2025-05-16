
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SparkAreaChart } from '@/components/dashboard/SparkAreaChart';

interface SpendSummaryProps {
  totalSpend: number;
  currency: string;
  previousPeriodChange: number;
  sparklineData: number[];
}

export function SpendSummaryCard({ 
  totalSpend, 
  currency, 
  previousPeriodChange, 
  sparklineData 
}: SpendSummaryProps) {
  const isIncrease = previousPeriodChange > 0;
  const changeAbs = Math.abs(previousPeriodChange);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Resumo de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-3xl font-bold">
              {currency} {totalSpend.toLocaleString()}
            </div>
            
            <div className={`flex items-center mt-1 ${isIncrease ? 'text-cloudcostx-red' : 'text-cloudcostx-green'}`}>
              {isIncrease ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm">
                {isIncrease ? '+' : '-'}{changeAbs}% vs período anterior
              </span>
            </div>
          </div>
          
          <div className="h-16 w-32">
            <SparkAreaChart data={sparklineData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
