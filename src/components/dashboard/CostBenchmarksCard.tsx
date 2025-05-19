import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Benchmark {
  serviceType: string;
  yourCost: number;
  industryAverage: number;
  bestInClass: number;
  percentile: number;
}

interface CostBenchmarksCardProps {
  benchmarks: Benchmark[];
  currency: string;
}

export function CostBenchmarksCard({ benchmarks, currency }: CostBenchmarksCardProps) {
  const getPercentileBadge = (percentile: number) => {
    if (percentile <= 25) {
      return <Badge className="bg-green-500 text-white text-[10px] px-2 py-0.5 h-5 min-w-[48px] flex items-center justify-center">Top {percentile}%</Badge>;
    } else if (percentile <= 50) {
      return <Badge className="bg-blue-500 text-white text-[10px] px-2 py-0.5 h-5 min-w-[48px] flex items-center justify-center">Top {percentile}%</Badge>;
    } else if (percentile <= 75) {
      return <Badge className="bg-amber-500 text-white text-[10px] px-2 py-0.5 h-5 min-w-[48px] flex items-center justify-center">Bottom {100-percentile}%</Badge>;
    } else {
      return <Badge className="bg-red-500 text-white text-[10px] px-2 py-0.5 h-5 min-w-[48px] flex items-center justify-center">Bottom {100-percentile}%</Badge>;
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base font-semibold">
          <Search className="h-5 w-5 mr-2 text-purple-500" />
          Benchmarks de Custos
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          {benchmarks.map((benchmark) => {
            // Calculate position as percentage between best in class and industry average
            const range = benchmark.industryAverage - benchmark.bestInClass;
            const position = Math.max(0, Math.min(100, 
              ((benchmark.yourCost - benchmark.bestInClass) / range) * 100
            ));
            // Limitar posição para não ultrapassar o gráfico
            const safePosition = Math.max(0, Math.min(92, position));
            // Lógica de alinhamento do valor
            let valueAlign = 'center';
            if (safePosition <= 10) valueAlign = 'left';
            else if (safePosition >= 85) valueAlign = 'right';
            return (
              <div key={benchmark.serviceType} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium truncate max-w-[60%]">{benchmark.serviceType}</span>
                  {getPercentileBadge(benchmark.percentile)}
                </div>
                <div className="relative h-12 bg-muted rounded-md overflow-visible">
                  {/* Valor acima da barra, alinhado com o marcador */}
                  <div
                    className={
                      `absolute -top-4 w-max max-w-[90px] text-[10px] font-semibold px-1 rounded pointer-events-none bg-white bg-opacity-80 truncate ` +
                      (valueAlign === 'center' ? 'left-1/2 -translate-x-1/2 text-center' : valueAlign === 'left' ? 'left-0 text-left' : 'right-0 text-right')
                    }
                    style={{ left: valueAlign === 'center' ? `${safePosition}%` : valueAlign === 'left' ? '0' : undefined, right: valueAlign === 'right' ? '0' : undefined }}
                  >
                    Você: {currency} {benchmark.yourCost.toLocaleString()}
                  </div>
                  {/* Best in class marker */}
                  <div className="absolute top-0 left-0 h-full w-0.5 bg-green-500 flex items-center justify-center">
                    <div className="absolute bottom-full mb-0.5 text-[9px] whitespace-nowrap transform -translate-x-1/2">
                      Melhor: {currency} {benchmark.bestInClass.toLocaleString()}
                    </div>
                  </div>
                  {/* Industry average marker */}
                  <div className="absolute top-0 right-0 h-full w-0.5 bg-amber-500 flex items-center justify-center">
                    <div className="absolute bottom-full mb-0.5 text-[9px] whitespace-nowrap transform -translate-x-1/2">
                      Média: {currency} {benchmark.industryAverage.toLocaleString()}
                    </div>
                  </div>
                  {/* Your position */}
                  <div 
                    className="absolute top-1/2 h-5 w-5 bg-cloudcostx-blue rounded-full border-2 border-white shadow-sm transform -translate-y-1/2 z-10"
                    style={{ left: `${safePosition}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
