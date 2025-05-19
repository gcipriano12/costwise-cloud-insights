import React from 'react';
import { TrendingUp, TrendingDown, BarChart2, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ServiceData {
  id: string;
  name: string;
  provider: string;
  currentSpend: number;
  previousSpend: number;
  trend: number;
}

interface TopServicesProps {
  services: ServiceData[];
  currency: string;
}

export function TopServicesCard({ services, currency }: TopServicesProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${currency} ${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${currency} ${(value / 1000).toFixed(2)}K`;
    }
    return `${currency} ${value.toLocaleString()}`;
  };

  const getProviderColor = (provider: string) => {
    switch(provider.toLowerCase()) {
      case 'aws': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'azure': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'gcp': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <BarChart2 className="mr-2 h-5 w-5 text-cloudcostx-blue" />
          Top Serviços
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[358px] overflow-y-auto">
        <Table>
            <TableHeader className="bg-gray-50 sticky top-0 z-10">
            <TableRow>
                <TableHead className="font-medium text-xs">Serviço</TableHead>
                <TableHead className="font-medium text-xs">Provedor</TableHead>
                <TableHead className="text-right font-medium text-xs">Gasto Atual</TableHead>
                <TableHead className="text-right font-medium text-xs">Variação</TableHead>
                <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => {
              const isIncrease = service.trend > 0;
              
              return (
                  <TableRow key={service.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium py-3 text-sm">{service.name}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`font-normal text-xs ${getProviderColor(service.provider)}`}
                      >
                        {service.provider}
                      </Badge>
                    </TableCell>
                  <TableCell className="text-right">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="font-medium cursor-help">
                              {formatCurrency(service.currentSpend)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{currency} {service.currentSpend.toLocaleString()}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                  </TableCell>
                  <TableCell className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        isIncrease 
                          ? 'bg-red-50 text-cloudcostx-red' 
                          : 'bg-green-50 text-cloudcostx-green'
                      }`}>
                        {isIncrease ? (
                          <TrendingUp className="h-3 w-3 mr-1 flex-shrink-0" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1 flex-shrink-0" />
                        )}
                        {Math.abs(service.trend)}%
                    </span>
                  </TableCell>
                  <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-xs w-full text-cloudcostx-blue flex items-center justify-center"
                      >
                        <span className="mr-1">Detalhes</span>
                        <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}
