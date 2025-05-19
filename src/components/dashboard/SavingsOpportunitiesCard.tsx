import React, { useState } from 'react';
import { CheckCircle, Lightbulb, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  savings: number;
  effort: 'low' | 'medium' | 'high';
}

interface SavingsOpportunitiesProps {
  opportunities: ReadonlyArray<Opportunity> | Opportunity[];
  totalPotentialSavings: number;
  currency: string;
}

export function SavingsOpportunitiesCard({ 
  opportunities, 
  totalPotentialSavings, 
  currency 
}: SavingsOpportunitiesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${currency} ${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${currency} ${(value / 1000).toFixed(2)}K`;
    }
    return `${currency} ${value.toLocaleString()}`;
  };

  const getEffortLabel = (effort: string) => {
    switch(effort) {
      case 'low': return 'Baixo';
      case 'medium': return 'Médio';
      case 'high': return 'Alto';
      default: return '';
    }
  };
  
  const getEffortColor = (effort: string) => {
    switch(effort) {
      case 'low': return 'bg-green-100 text-green-700 border-0';
      case 'medium': return 'bg-amber-100 text-amber-700 border-0';
      case 'high': return 'bg-red-100 text-red-700 border-0';
      default: return '';
    }
  };

  const getEffortCardColor = (effort: string) => {
    switch(effort) {
      case 'low': return 'bg-green-50 border-green-100';
      case 'medium': return 'bg-amber-50 border-amber-200';
      case 'high': return 'bg-red-50 border-red-200';
      default: return 'bg-green-50 border-green-100';
    }
  };

  const getEffortTextColor = (effort: string) => {
    switch(effort) {
      case 'low': return 'text-cloudcostx-green';
      case 'medium': return 'text-amber-600';
      case 'high': return 'text-cloudcostx-red';
      default: return 'text-cloudcostx-green';
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : opportunities.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < opportunities.length - 1 ? prev + 1 : 0));
  };

  // Calcular a porcentagem de cada oportunidade em relação ao total
  const calculatePercentage = (savings: number) => {
    return (savings / totalPotentialSavings) * 100;
  };

  // Verificar se é necessário exibir a paginação
  const shouldShowPagination = opportunities.length > 7;

  // Definir a cor do texto para o cabeçalho com base na criticidade
  const headerTextColorClass = "text-cloudcostx-green";
  // Pegar a cor atual do texto com base na oportunidade selecionada
  const currentEffortColor = getEffortTextColor(opportunities[currentIndex]?.effort || 'low');
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-1 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg font-medium">
            <Lightbulb className="mr-2 h-5 w-5 text-cloudcostx-green" />
            Oportunidades de Economia
          </CardTitle>
          <div className={`text-xl font-bold ${headerTextColorClass}`}>
            {formatCurrency(totalPotentialSavings)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-3 pt-2 pb-3 overflow-auto">
        {opportunities.length > 0 ? (
          <div className="flex flex-col h-full">
            {/* Card principal */}
            <div className={`flex-shrink-0 p-3 rounded-lg border mb-2 ${getEffortCardColor(opportunities[currentIndex].effort)}`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <CheckCircle className={`h-5 w-5 ${currentEffortColor} mr-2`} />
                  <h4 className="font-medium text-sm">{opportunities[currentIndex].title}</h4>
        </div>
                <Badge className={getEffortColor(opportunities[currentIndex].effort)}>
                  {getEffortLabel(opportunities[currentIndex].effort)}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground my-1 line-clamp-2 ml-7">
                {opportunities[currentIndex].description}
              </p>
              
              <div className="mt-2 mb-1 ml-7">
                <div className="flex justify-between items-center text-xs mb-0.5">
                  <span>Contribuição</span>
                  <span className="font-medium">{calculatePercentage(opportunities[currentIndex].savings).toFixed(1)}%</span>
                </div>
                <Progress 
                  value={calculatePercentage(opportunities[currentIndex].savings)}
                  className="h-1.5 bg-gray-100"
                />
              </div>
              
              <div className="flex justify-between items-center mt-2 ml-7">
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${currentEffortColor}`}>
                    {formatCurrency(opportunities[currentIndex].savings)}
                </span>
                  <span className="text-muted-foreground ml-1 text-xs">/mês</span>
                </div>
                
                <Button 
                  size="sm" 
                  variant="ghost"
                  className={`h-6 text-xs ${currentEffortColor}`}
                >
                  <span className="mr-1">Implementar</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Lista de outras oportunidades */}
            <div className="flex-grow overflow-auto space-y-1.5">
              {opportunities.map((opportunity, idx) => {
                if (idx === currentIndex) return null;
                const opportunityColor = getEffortTextColor(opportunity.effort);
                return (
                  <div 
                    key={opportunity.id} 
                    className="flex items-center justify-between p-2 border border-gray-100 rounded-lg text-xs hover:bg-gray-50 cursor-pointer"
                    onClick={() => setCurrentIndex(idx)}
                  >
                    <div className="flex items-center flex-1">
                      <div 
                        className="h-2 w-2 rounded-full mr-2"
                        style={{backgroundColor: opportunity.effort === 'low' ? '#22c55e' : opportunity.effort === 'medium' ? '#f59e0b' : '#ef4444'}}
                      />
                      <span className="font-medium truncate">{opportunity.title}</span>
                    </div>
                    <span className={`font-medium ml-2 ${opportunityColor}`}>
                      {formatCurrency(opportunity.savings)}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Paginação - só exibe se tiver mais de 7 itens */}
            {shouldShowPagination && (
              <div className="flex justify-center items-center mt-2 pt-1 border-t border-gray-100">
                <div className="text-xs flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={handlePrevious}
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  <span className="px-1 text-muted-foreground">
                    {currentIndex + 1}/{opportunities.length}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={handleNext}
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
            </div>
        ) : (
          <div className="h-full flex items-center justify-center border border-dashed rounded-lg">
            <p className="text-muted-foreground text-sm">Nenhuma oportunidade de economia encontrada.</p>
        </div>
        )}
      </CardContent>
    </Card>
  );
}
