import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Anomaly {
  id: string;
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  impact: number;
}

interface AnomaliesCardProps {
  anomalies: ReadonlyArray<Anomaly> | Anomaly[];
  currency: string;
}

export function AnomaliesCard({ anomalies, currency }: AnomaliesCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${currency} ${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${currency} ${(value / 1000).toFixed(2)}K`;
    }
    return `${currency} ${value.toLocaleString()}`;
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-amber-50 border-amber-200';
      case 'low': return 'bg-blue-50 border-blue-200';
      default: return '';
    }
  };
  
  const getSeverityTextColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'text-cloudcostx-red';
      case 'medium': return 'text-amber-600';
      case 'low': return 'text-cloudcostx-blue';
      default: return '';
    }
  };

  const getSeverityBadgeStyle = (severity: string) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-700 border-0';
      case 'medium': return 'bg-amber-100 text-amber-700 border-0';
      case 'low': return 'bg-blue-100 text-blue-700 border-0';
      default: return '';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch(severity) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return '';
    }
  };

  const getSeverityDotColor = (severity: string) => {
    switch(severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#3b82f6';
      default: return '#71717a';
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : anomalies.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < anomalies.length - 1 ? prev + 1 : 0));
  };
  
  // Verificar se é necessário exibir a paginação
  const shouldShowPagination = anomalies.length > 7;
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-1 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg font-medium">
            <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
            Anomalias Detectadas
          </CardTitle>
          <div className="text-sm font-medium text-muted-foreground">
            {anomalies.length} anomalias
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-3 pt-2 pb-3 overflow-auto">
        {anomalies.length > 0 ? (
          <div className="flex flex-col h-full">
            {/* Card principal */}
            <div className={`flex-shrink-0 p-3 rounded-lg border mb-2 ${getSeverityColor(anomalies[currentIndex].severity)}`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <AlertTriangle className={`h-5 w-5 mr-2 ${getSeverityTextColor(anomalies[currentIndex].severity)}`} />
                  <h4 className={`font-medium text-sm ${getSeverityTextColor(anomalies[currentIndex].severity)}`}>
                    {anomalies[currentIndex].title}
                  </h4>
                </div>
                <Badge 
                  variant="outline"
                  className={`ml-2 text-xs ${getSeverityBadgeStyle(anomalies[currentIndex].severity)}`}
                >
                  {getSeverityLabel(anomalies[currentIndex].severity)}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground my-1 ml-7">
                {anomalies[currentIndex].description}
              </p>
              
              <div className="flex justify-between items-center mt-2 ml-7">
                <div className="flex items-center text-xs">
                  <span className="text-muted-foreground mr-1">Impacto:</span>
                  <span className={`font-medium ${getSeverityTextColor(anomalies[currentIndex].severity)}`}>
                    {formatCurrency(anomalies[currentIndex].impact)}
                  </span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-6 text-xs ${getSeverityTextColor(anomalies[currentIndex].severity)}`}
                >
                  <span className="mr-1">Investigar</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Lista de outras anomalias */}
            <div className="flex-grow overflow-auto space-y-1.5">
              {anomalies.map((anomaly, idx) => {
                if (idx === currentIndex) return null;
                return (
                  <div 
                    key={anomaly.id} 
                    className="flex items-center justify-between p-2 border border-gray-100 rounded-lg text-xs hover:bg-gray-50 cursor-pointer"
                    onClick={() => setCurrentIndex(idx)}
                  >
                    <div className="flex items-center flex-1">
                      <div 
                        className="h-2 w-2 rounded-full mr-2"
                        style={{backgroundColor: getSeverityDotColor(anomaly.severity)}}
                      />
                      <span className="font-medium truncate">{anomaly.title}</span>
                    </div>
                    <span className={`font-medium ml-2 ${getSeverityTextColor(anomaly.severity)}`}>
                      {formatCurrency(anomaly.impact)}
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
                    {currentIndex + 1}/{anomalies.length}
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
            <p className="text-muted-foreground text-sm">Nenhuma anomalia detectada no período selecionado.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
