import React from 'react';
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { TrendingUp, TrendingDown, DollarSign, Calendar, AlertCircle, BarChart3, ArrowRight, Disc, Target, AlertTriangle, Coins, PieChart as PieChartIcon, Sparkles, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ProviderBreakdown {
  name: string;
  value: number;
  color: string;
}

interface SpendSummaryProps {
  totalSpend: number;
  currency: string;
  previousPeriodChange: number;
  sparklineData: number[];
  providerBreakdown?: ProviderBreakdown[];
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
  providerBreakdown = [
    { name: 'AWS', value: 58, color: '#F5A623' },
    { name: 'Azure', value: 22, color: '#0078D4' },
    { name: 'GCP', value: 12, color: '#4285F4' },
    { name: 'Oracle Cloud', value: 8, color: '#f80404' }
  ],
  wastedSpend = totalSpend * 0.15,
  budgetLimit = totalSpend * 1.2,
  budgetConsumed = 75,
  savingsRealized = totalSpend * 0.08
}: SpendSummaryProps) {
  const { isDark } = useTheme();
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
    if (budgetConsumed >= 90) return isDark ? 'text-red-400' : 'text-cloudcostx-red';
    if (budgetConsumed >= 75) return isDark ? 'text-amber-400' : 'text-amber-500';
    return isDark ? 'text-green-400' : 'text-cloudcostx-green';
  };

  // Dados para o gráfico de pizza
  const pieData = providerBreakdown.map(provider => ({
    name: provider.name,
    value: provider.value,
  }));
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill={isDark ? "#FFFFFF" : "#000000"} 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={10}
        fontWeight="bold"
        stroke={isDark ? "#333" : "#fff"}
        strokeWidth={0.5}
        paintOrder="stroke"
      >
        {`${pieData[index].value}%`}
      </text>
    );
  };
  
  // Personalizado para a barra de progresso
  const CustomProgressBar = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
  >(({ className, value, ...props }, ref) => {
    let indicatorClass = "bg-primary";
    if (value && value >= 90) {
      indicatorClass = isDark ? "bg-red-500" : "bg-cloudcostx-red";
    } else if (value && value >= 75) {
      indicatorClass = isDark ? "bg-amber-500" : "bg-amber-500";
    } else {
      indicatorClass = isDark ? "bg-green-500" : "bg-cloudcostx-green";
    }
    
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-1.5 w-full overflow-hidden rounded-full",
          isDark ? "bg-slate-700" : "bg-gray-100",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn("h-full w-full flex-1 transition-all", indicatorClass)}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  });
  CustomProgressBar.displayName = "CustomProgressBar";

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
          <div className="col-span-12 md:col-span-4 space-y-3">
          <div>
              <p className="text-sm text-muted-foreground mb-1">Gasto Total</p>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div className="flex items-baseline cursor-help">
                      <span className="text-4xl font-bold tracking-tight">
                        {currency} {totalSpend.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className={cn(
                    isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-200 text-slate-900"
                  )}>
                    <p>Gasto total: {currency} {totalSpend.toLocaleString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className={cn(
                "mt-2 inline-flex items-center px-2 py-1 rounded-md text-sm font-medium", 
                isIncrease 
                  ? isDark ? "bg-red-900/50 border border-red-800 text-red-400" : "bg-red-50 text-cloudcostx-red" 
                  : isDark ? "bg-green-900/50 border border-green-800 text-green-400" : "bg-green-50 text-cloudcostx-green"
              )}>
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
            
            <div className={cn(
              "grid grid-cols-3 gap-3 pt-3 border-t",
              isDark ? "border-slate-700" : "border-gray-100"
            )}>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Média Mensal</p>
                <div className="text-lg font-semibold">
                  {formatCurrency(monthlyAverage)}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Maior Gasto</p>
                <div className="flex items-center mt-0.5">
                  <Badge className={cn(
                    "mr-1 text-xs py-0",
                    isDark ? "bg-amber-900 text-amber-100 border-0" : "bg-amber-50 text-amber-700 border-amber-200"
                  )}>{topService.provider}</Badge>
                  <span className="font-medium text-xs">{topService.name}</span>
                </div>
                <div className="text-sm font-semibold mt-0.5">
                  {formatCurrency(topService.cost)}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Projeção Anual</p>
                <div className="text-lg font-semibold">
                  {formatCurrency(forecastYTD)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Ano corrente
                </div>
              </div>
            </div>

            <div className={cn(
              "pt-3 border-t",
              isDark ? "border-slate-700" : "border-gray-100"
            )}>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Limite Orçamentário</p>
                <span className={`text-xs font-medium ${getBudgetStatusColor()}`}>{budgetConsumed}%</span>
              </div>
              <div className="mt-1.5">
                <CustomProgressBar value={budgetConsumed} />
              </div>
              <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                <span>Consumido</span>
                <span>{formatCurrency(budgetLimit)}</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center mb-2">
              <p className="text-sm text-muted-foreground">Distribuição por Provedor</p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={providerBreakdown[index].color} 
                        stroke={isDark ? "#333" : "#fff"}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    formatter={(value) => <span className="text-xs">{value}</span>}
                    wrapperStyle={{ color: isDark ? "#E2E8F0" : undefined }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-4 space-y-3">
            <div className="flex items-center mb-2">
              <p className="text-sm text-muted-foreground">Highlights</p>
            </div>
            
            <div className={cn(
              "rounded-md p-3 border",
              isDark ? "bg-blue-900/50 border-blue-800" : "bg-blue-50 border-blue-100"
            )}>
              <div className="flex items-start">
                <Calendar className={cn(
                  "h-5 w-5 mr-2 mt-0.5",
                  isDark ? "text-blue-400" : "text-cloudcostx-blue"
                )} />
                <div>
                  <p className="text-xs text-muted-foreground">Previsão Próximo Mês</p>
                  <div className="flex items-center">
                    <span className={cn(
                      "text-lg font-bold",
                      isDark ? "text-blue-400" : "text-cloudcostx-blue"
                    )}>{formatCurrency(projectedNextMonth)}</span>
                    <ArrowRight className="h-3 w-3 mx-1 text-muted-foreground" />
                    <span className={cn(
                      "text-xs",
                      isIncrease 
                        ? isDark ? "text-red-400" : "text-cloudcostx-red" 
                        : isDark ? "text-green-400" : "text-cloudcostx-green"
                    )}>
                      {isIncrease ? '+' : ''}{previousPeriodChange}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={cn(
              "rounded-md p-3 border",
              isDark ? "bg-red-900/50 border-red-800" : "bg-red-50 border-red-100"
            )}>
              <div className="flex items-start">
                <AlertTriangle className={cn(
                  "h-5 w-5 mr-2 mt-0.5",
                  isDark ? "text-red-400" : "text-cloudcostx-red"
                )} />
                <div>
                  <p className="text-xs text-muted-foreground">Desperdício Estimado</p>
                  <div className="flex items-center">
                    <span className={cn(
                      "text-lg font-bold",
                      isDark ? "text-red-400" : "text-cloudcostx-red"
                    )}>{formatCurrency(wastedSpend)}</span>
                    <span className={cn(
                      "text-xs ml-2",
                      isDark ? "text-red-400" : "text-cloudcostx-red"
                    )}>
                      ({Math.round((wastedSpend/totalSpend)*100)}% do total)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={cn(
              "rounded-md p-3 border",
              isDark ? "bg-green-900/50 border-green-800" : "bg-green-50 border-green-100"
            )}>
              <div className="flex items-start">
                <Coins className={cn(
                  "h-5 w-5 mr-2 mt-0.5",
                  isDark ? "text-green-400" : "text-cloudcostx-green"
                )} />
                <div>
                  <p className="text-xs text-muted-foreground">Economias Realizadas</p>
                  <div className="flex items-center">
                    <span className={cn(
                      "text-lg font-bold",
                      isDark ? "text-green-400" : "text-cloudcostx-green"
                    )}>{formatCurrency(savingsRealized)}</span>
                    <span className={cn(
                      "text-xs ml-2",
                      isDark ? "text-green-400" : "text-cloudcostx-green"
                    )}>
                      ({Math.round((savingsRealized/totalSpend)*100)}% do total)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
