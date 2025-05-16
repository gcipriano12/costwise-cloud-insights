import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResourceUsage {
  name: string;
  usage: number;
  totalAvailable: number;
  warningThreshold: number;
}

interface ResourceUtilizationCardProps {
  resources: ResourceUsage[];
}

export function ResourceUtilizationCard({ resources }: ResourceUtilizationCardProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  
  const getUtilizationColor = (usage: number, warningThreshold: number) => {
    if (usage >= warningThreshold) return 'bg-cloudcostx-red';
    if (usage >= warningThreshold * 0.8) return 'bg-amber-500';
    return 'bg-cloudcostx-blue';
  };

  // Calcular a média de utilização geral
  const averageUtilization = Math.round(
    resources.reduce((sum, resource) => {
      const utilizationPercentage = Math.round((resource.usage / resource.totalAvailable) * 100);
      return sum + utilizationPercentage;
    }, 0) / resources.length
  );

  // Determinar a classe de cor com base na média
  const getAverageUtilizationColor = () => {
    if (averageUtilization >= 85) return 'text-cloudcostx-red';
    if (averageUtilization >= 70) return 'text-amber-500';
    return 'text-cloudcostx-blue';
  };
  
  // Calcular o número total de páginas
  const totalPages = Math.ceil(resources.length / itemsPerPage);
  
  // Obter os recursos da página atual
  const paginatedResources = resources.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );
  
  // Verificar se é necessário exibir a paginação
  const shouldShowPagination = resources.length > itemsPerPage;
  
  // Funções para navegação entre páginas
  const handlePrevious = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="flex items-center text-lg font-medium">
          <Activity className="mr-2 h-5 w-5 text-amber-500" />
          Utilização de Recursos
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-3 flex flex-col">
        <div className="flex-grow space-y-4">
          <div className="text-center mb-4">
            <div className={`text-3xl font-bold ${getAverageUtilizationColor()}`}>{averageUtilization}%</div>
            <div className="text-sm text-muted-foreground">
              Utilização média dos recursos
            </div>
            <Progress 
              value={averageUtilization} 
              className={`h-2 mt-2 ${
                averageUtilization >= 85 ? 'bg-cloudcostx-red' : 
                averageUtilization >= 70 ? 'bg-amber-500' : 
                'bg-cloudcostx-blue'
              }`}
            />
          </div>
          
          <div className="space-y-3">
            {paginatedResources.map((resource) => {
              const utilizationPercentage = Math.round((resource.usage / resource.totalAvailable) * 100);
              return (
                <div key={resource.name} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{resource.name}</span>
                    <span className={`text-xs font-medium ${
                      utilizationPercentage >= resource.warningThreshold ? 'text-cloudcostx-red' : 
                      utilizationPercentage >= resource.warningThreshold * 0.8 ? 'text-amber-500' : 
                      'text-muted-foreground'
                    }`}>
                      {utilizationPercentage}%
                    </span>
                  </div>
                  <Progress 
                    value={utilizationPercentage} 
                    className={`h-1.5 ${getUtilizationColor(utilizationPercentage, resource.warningThreshold)}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Paginação - Só exibir se tiver mais de 4 itens */}
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
                {currentPage + 1}/{totalPages}
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
      </CardContent>
    </Card>
  );
}
