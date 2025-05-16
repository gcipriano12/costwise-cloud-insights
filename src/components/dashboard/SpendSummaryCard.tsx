import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, AlertCircle, BarChart3, ArrowRight, Disc, Target, AlertTriangle, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SparkAreaChart } from '@/components/dashboard/SparkAreaChart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CategoryBreakdown {
  name: string;
  value: number;
  color: string;
}

interface SpendSummaryProps {
  totalSpend: number;
  currency: string;
  previousPeriodChange: number;
  sparklineData: number[];
  categoryBreakdown?: CategoryBreakdown[];
  wastedSpend?: number;
  budgetLimit?: number;
  budgetConsumed?: number;
  savingsRealized?: number;
}

export function SpendSummaryCard({ 
  totalSpend, 
  currency, 
  previousPeriodChange, 
  sparklineData,
  categoryBreakdown = [
    { name: 'Computação', value: 58, color: '#60A5FA' },
    { name: 'Armazenamento', value: 22, color: '#F97316' },
    { name: 'Rede', value: 12, color: '#10B981' },
    { name: 'Outros', value: 8, color: '#8B5CF6' }
  ],
  wastedSpend = totalSpend * 0.15,
  budgetLimit = totalSpend * 1.2,
  budgetConsumed = 75,
  savingsRealized = totalSpend * 0.08
}: SpendSummaryProps) {
  const isIncrease = previousPeriodChange > 0;
  const changeAbs = Math.abs(previousPeriodChange);
  
  const monthlyAverage = totalSpend / 6;
  const projectedNextMonth = totalSpend * (1 + (previousPeriodChange / 100));
  const topService = {
    name: "EC2",
    cost: totalSpend * 0.25,
    provider: "AWS"
  };
  const forecastYTD = totalSpend * 12;
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${currency} ${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${currency} ${(value / 1000).toFixed(2)}K`;
    }
    return `${currency} ${value.toLocaleString()}`;
  };

  const getBudgetStatusColor = () => {
    if (budgetConsumed >= 90) return 'text-cloudcostx-red';
    if (budgetConsumed >= 75) return 'text-amber-500';
    return 'text-cloudcostx-green';
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
          <div className="col-span-12 md:col-span-3 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Gasto Total</p>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
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

            <div className="pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Limite Orçamentário</p>
                <span className={`text-xs font-medium ${getBudgetStatusColor()}`}>{budgetConsumed}%</span>
              </div>
              <div className="mt-1.5">
                <Progress 
                  value={budgetConsumed} 
                  className="h-1.5"
                />
              </div>
              <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                <span>Consumido</span>
                <span>{formatCurrency(budgetLimit)}</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-5">
            <p className="text-sm text-muted-foreground mb-2">Tendência de Gastos</p>
            <div className="h-28 w-full mb-4">
              <SparkAreaChart data={sparklineData} />
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">Distribuição por Categoria</p>
              </div>
              <div className="flex w-full h-4 rounded-full overflow-hidden">
                {categoryBreakdown.map((category, idx) => (
                  <TooltipProvider key={idx}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <div 
                          className="h-full cursor-help"
                          style={{ 
                            width: `${category.value}%`, 
                            backgroundColor: category.color,
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">{category.name}: {category.value}%</p>
                        <p className="text-xs">
                          {formatCurrency(totalSpend * (category.value / 100))}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
              <div className="flex flex-wrap mt-2 gap-2">
                {categoryBreakdown.map((category, idx) => (
                  <div key={idx} className="flex items-center text-xs">
                    <div 
                      className="w-2 h-2 rounded-full mr-1"
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name} ({category.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-4 space-y-3">
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

            <div className="bg-red-50 rounded-md p-3 border border-red-100">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-cloudcostx-red mr-2 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Desperdício Estimado</p>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-cloudcostx-red">{formatCurrency(wastedSpend)}</span>
                    <span className="text-xs text-cloudcostx-red ml-2">
                      ({Math.round((wastedSpend/totalSpend)*100)}% do total)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-md p-3 border border-green-100">
              <div className="flex items-start">
                <Coins className="h-5 w-5 text-cloudcostx-green mr-2 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Economias Realizadas</p>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-cloudcostx-green">{formatCurrency(savingsRealized)}</span>
                    <span className="text-xs text-cloudcostx-green ml-2">
                      ({Math.round((savingsRealized/totalSpend)*100)}% do total)
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
