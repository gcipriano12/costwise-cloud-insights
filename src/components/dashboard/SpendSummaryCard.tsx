import React from 'react';
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { TrendingUp, TrendingDown, DollarSign, Calendar, AlertCircle, BarChart3, ArrowRight, Disc, Target, AlertTriangle, Coins, PieChart as PieChartIcon, Sparkles, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip, Sector } from 'recharts';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const isIncrease = previousPeriodChange > 0;
  const changeAbs = Math.abs(previousPeriodChange);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  
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
    if (budgetConsumed >= 90) return isDark ? 'text-red-400' : 'text-XCost-red';
    if (budgetConsumed >= 75) return isDark ? 'text-amber-400' : 'text-amber-500';
    return isDark ? 'text-green-400' : 'text-XCost-green';
  };

  // Calcular valores absolutos para cada provedor
  const providerValues = providerBreakdown.map(provider => ({
    ...provider,
    absoluteValue: (provider.value / 100) * totalSpend
  }));

  // Dados para o gráfico de pizza
  const pieData = providerValues.map(provider => ({
    name: provider.name,
    value: provider.value,
    absoluteValue: provider.absoluteValue,
    color: provider.color
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

  // Componente para setor ativo (quando o mouse passa por cima)
  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          strokeWidth={2}
          stroke={isDark ? "#fff" : "#000"}
        />
      </g>
    );
  };

  // Tooltip customizado para o gráfico de pizza
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className={cn(
          "p-3 border rounded-md shadow-md",
          isDark 
            ? "bg-slate-800 border-slate-700 text-white" 
            : "bg-white border-gray-200 text-slate-900"
        )}>
          <p className="font-medium text-sm mb-1">{data.name}</p>
          <p className="text-sm">
            <span className="font-semibold">{formatCurrency(data.absoluteValue)}</span>
          </p>
          <p className={cn(
            "text-xs mt-1",
            isDark ? "text-slate-400" : "text-muted-foreground"
          )}>
            {data.value}% do total
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // Função para lidar com o hover/touch no gráfico de pizza
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  // Função para lidar com o mouse saindo do gráfico
  const onPieLeave = () => {
    setActiveIndex(null);
  };
  
  // Personalizado para a barra de progresso
  const CustomProgressBar = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
  >(({ className, value, ...props }, ref) => {
    let indicatorClass = "bg-primary";
    if (value && value >= 90) {
      indicatorClass = isDark ? "bg-red-500" : "bg-XCost-red";
    } else if (value && value >= 75) {
      indicatorClass = isDark ? "bg-amber-500" : "bg-amber-500";
    } else {
      indicatorClass = isDark ? "bg-green-500" : "bg-XCost-green";
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
          <DollarSign className="mr-2 h-5 w-5 text-XCost-blue" />
          Resumo de Gastos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4 space-y-3">
          <div>
              <p className={`text-sm text-muted-foreground mb-${isMobile ? '0' : '1'}`}>
                Gasto Total
              </p>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div className="flex items-baseline cursor-help">
                      <span className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold tracking-tight`}>
                        {currency} {totalSpend.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
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
                `mt-2 inline-flex items-center px-2 py-1 rounded-md ${isMobile ? 'text-xs' : 'text-sm'} font-medium`, 
                isIncrease 
                  ? isDark ? "bg-red-900/50 border border-red-800 text-red-400" : "bg-red-50 text-XCost-red" 
                  : isDark ? "bg-green-900/50 border border-green-800 text-green-400" : "bg-green-50 text-XCost-green"
              )}>
                {isIncrease ? (
                  <TrendingUp className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-1 flex-shrink-0`} />
                ) : (
                  <TrendingDown className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-1 flex-shrink-0`} />
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
                <p className="text-xs text-muted-foreground mb-1">
                  {isMobile ? "Média" : "Média Mensal"}
                </p>
                <div className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold`}>
                  {formatCurrency(monthlyAverage)}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {isMobile ? "Maior" : "Maior Gasto"}
                </p>
                <div className="flex items-center mt-0.5">
                  <Badge className={cn(
                    "mr-1 text-xs py-0",
                    isDark ? "bg-amber-900 text-amber-100 border-0" : "bg-amber-50 text-amber-700 border-amber-200"
                  )}>{topService.provider}</Badge>
                  <span className="font-medium text-xs">{topService.name}</span>
                </div>
                <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold mt-0.5`}>
                  {formatCurrency(topService.cost)}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {isMobile ? "Projeção" : "Projeção Anual"}
                </p>
                <div className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold`}>
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
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                  {isMobile ? "Orçamento" : "Limite Orçamentário"}
                </p>
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
                    activeIndex={activeIndex !== null ? activeIndex : undefined}
                    activeShape={renderActiveShape}
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    onClick={onPieEnter}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke={isDark ? "#333" : "#fff"}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Legend 
                    layout={isMobile ? "horizontal" : "vertical"}
                    verticalAlign={isMobile ? "bottom" : "middle"}
                    align={isMobile ? "center" : "right"}
                    formatter={(value) => <span className="text-xs">{value}</span>}
                    wrapperStyle={isMobile ? 
                      { paddingTop: '10px', color: isDark ? "#E2E8F0" : undefined }
                      : { color: isDark ? "#E2E8F0" : undefined }
                    }
                  />
                  <RechartsTooltip 
                    content={<CustomPieTooltip />}
                    wrapperStyle={{ outline: 'none' }}
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
                  isDark ? "text-blue-400" : "text-XCost-blue"
                )} />
                <div>
                  <p className="text-xs text-muted-foreground">Previsão Próximo Mês</p>
                  <div className="flex items-center">
                    <span className={cn(
                      "text-lg font-bold",
                      isDark ? "text-blue-400" : "text-XCost-blue"
                    )}>{formatCurrency(projectedNextMonth)}</span>
                    <ArrowRight className="h-3 w-3 mx-1 text-muted-foreground" />
                    <span className={cn(
                      "text-xs",
                      isIncrease 
                        ? isDark ? "text-red-400" : "text-XCost-red" 
                        : isDark ? "text-green-400" : "text-XCost-green"
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
                  isDark ? "text-red-400" : "text-XCost-red"
                )} />
                <div>
                  <p className="text-xs text-muted-foreground">Desperdício Estimado</p>
                  <div className="flex items-center">
                    <span className={cn(
                      "text-lg font-bold",
                      isDark ? "text-red-400" : "text-XCost-red"
                    )}>{formatCurrency(wastedSpend)}</span>
                    <span className={cn(
                      "text-xs ml-2",
                      isDark ? "text-red-400" : "text-XCost-red"
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
                  isDark ? "text-green-400" : "text-XCost-green"
                )} />
                <div>
                  <p className="text-xs text-muted-foreground">Economias Realizadas</p>
                  <div className="flex items-center">
                    <span className={cn(
                      "text-lg font-bold",
                      isDark ? "text-green-400" : "text-XCost-green"
                    )}>{formatCurrency(savingsRealized)}</span>
                    <span className={cn(
                      "text-xs ml-2",
                      isDark ? "text-green-400" : "text-XCost-green"
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
