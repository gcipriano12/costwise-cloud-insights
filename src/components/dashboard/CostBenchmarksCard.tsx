
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
      return <Badge className="bg-green-500">Top {percentile}%</Badge>;
    } else if (percentile <= 50) {
      return <Badge className="bg-blue-500">Top {percentile}%</Badge>;
    } else if (percentile <= 75) {
      return <Badge className="bg-amber-500">Bottom {100-percentile}%</Badge>;
    } else {
      return <Badge className="bg-red-500">Bottom {100-percentile}%</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <Search className="h-5 w-5 mr-2" />
          Benchmarks de Custos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {benchmarks.map((benchmark) => {
            // Calculate position as percentage between best in class and industry average
            const range = benchmark.industryAverage - benchmark.bestInClass;
            const position = Math.max(0, Math.min(100, 
              ((benchmark.yourCost - benchmark.bestInClass) / range) * 100
            ));
            
            return (
              <div key={benchmark.serviceType} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{benchmark.serviceType}</span>
                  {getPercentileBadge(benchmark.percentile)}
                </div>
                
                <div className="relative h-8 bg-muted rounded-md">
                  {/* Best in class marker */}
                  <div className="absolute top-0 left-0 h-full w-0.5 bg-green-500 flex items-center justify-center">
                    <div className="absolute bottom-full mb-1 text-[10px] whitespace-nowrap transform -translate-x-1/2">
                      Melhor: {currency} {benchmark.bestInClass.toLocaleString()}
                    </div>
                  </div>
                  
                  {/* Industry average marker */}
                  <div className="absolute top-0 right-0 h-full w-0.5 bg-amber-500 flex items-center justify-center">
                    <div className="absolute bottom-full mb-1 text-[10px] whitespace-nowrap transform -translate-x-1/2">
                      Média: {currency} {benchmark.industryAverage.toLocaleString()}
                    </div>
                  </div>
                  
                  {/* Your position */}
                  <div 
                    className="absolute top-1/2 h-6 w-6 bg-cloudcostx-blue rounded-full transform -translate-y-1/2"
                    style={{ left: `${position}%` }}
                  >
                    <div className="absolute top-full mt-1 text-[10px] font-semibold whitespace-nowrap transform -translate-x-1/2" style={{ left: '50%' }}>
                      Você: {currency} {benchmark.yourCost.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
