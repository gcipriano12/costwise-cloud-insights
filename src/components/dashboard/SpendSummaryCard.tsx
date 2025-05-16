import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, AlertCircle, BarChart3, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SparkAreaChart } from '@/components/dashboard/SparkAreaChart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

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
  
  // Valores calculados para informações adicionais (poderia vir dos dados reais)
  const monthlyAverage = totalSpend / 6; // Calculando média mensal dos últimos 6 meses
  const projectedNextMonth = totalSpend * (1 + (previousPeriodChange / 100)); // Projeção simples baseada na tendência atual
  const topService = {
    name: "EC2",
    cost: totalSpend * 0.25, // 25% do total
    provider: "AWS"
  };
  const forecastYTD = totalSpend * 12; // Projeção anual simples
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${currency} ${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${currency} ${(value / 1000).toFixed(2)}K`;
    }
    return `${currency} ${value.toLocaleString()}`;
  };
  
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <DollarSign className="mr-2 h-5 w-5 text-cloudcostx-blue" />
          Resumo de Gastos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-6">
          {/* Coluna da esquerda - Gasto total e variação */}
          <div className="col-span-12 md:col-span-3 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gasto Total</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-baseline cursor-help">
                      <span className="text-4xl font-bold tracking-tight">
                        {formatCurrency(totalSpend)}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Gasto total: {currency} {totalSpend.toLocaleString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className={`mt-2 inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${isIncrease ? 'bg-red-50 text-cloudcostx-red' : 'bg-green-50 text-cloudcostx-green'}`}>
                {isIncrease ? (
                  <TrendingUp className="h-4 w-4 mr-1 flex-shrink-0" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1 flex-shrink-0" />
                )}
                <span>
                  {isIncrease ? '+' : '-'}{changeAbs}% vs período anterior
                </span>
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-100">
              <p className="text-sm text-muted-foreground mb-1">Média Mensal</p>
              <div className="text-2xl font-semibold">
                {formatCurrency(monthlyAverage)}
              </div>
            </div>
          </div>
          
          {/* Coluna central - Gráfico de tendência */}
          <div className="col-span-12 md:col-span-5">
            <p className="text-sm text-muted-foreground mb-2">Tendência de Gastos</p>
            <div className="h-36 w-full">
              <SparkAreaChart data={sparklineData} />
            </div>
          </div>
          
          {/* Coluna da direita - Informações adicionais */}
          <div className="col-span-12 md:col-span-4 space-y-4">
            <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-cloudcostx-blue mr-2 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Previsão Próximo Mês</p>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-cloudcostx-blue">{formatCurrency(projectedNextMonth)}</span>
                    <ArrowRight className="h-3 w-3 mx-1 text-muted-foreground" />
                    <span className={`text-xs ${isIncrease ? 'text-cloudcostx-red' : 'text-cloudcostx-green'}`}>
                      {isIncrease ? '+' : ''}{previousPeriodChange}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Maior Gasto</p>
                <div className="flex items-center mt-1">
                  <Badge className="bg-amber-50 text-amber-700 border-amber-200 mr-2">{topService.provider}</Badge>
                  <span className="font-medium">{topService.name}</span>
                </div>
                <div className="text-sm font-semibold mt-1">
                  {formatCurrency(topService.cost)}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Projeção Anual</p>
                <div className="text-sm font-semibold mt-1">
                  {formatCurrency(forecastYTD)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Ano corrente
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
