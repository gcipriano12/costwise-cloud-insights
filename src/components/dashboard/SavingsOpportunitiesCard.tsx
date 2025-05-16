
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

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
      case 'low': return 'bg-cloudcostx-green/20 text-cloudcostx-green';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'high': return 'bg-cloudcostx-red/20 text-cloudcostx-red';
      default: return '';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Oportunidades de Economia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-center">
          <p className="text-sm text-cloudcostx-gray-400 mb-1">Economia potencial mensal</p>
          <p className="text-2xl font-bold text-cloudcostx-green">
            {currency} {totalPotentialSavings.toLocaleString()}
          </p>
        </div>
        
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="border border-cloudcostx-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{opportunity.title}</h4>
                  <p className="text-sm text-cloudcostx-gray-400 mt-1">{opportunity.description}</p>
                </div>
                <span className={`text-xs rounded-full px-2 py-0.5 ${getEffortColor(opportunity.effort)}`}>
                  Esforço: {getEffortLabel(opportunity.effort)}
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm font-medium">
                  Economia: {currency} {opportunity.savings.toLocaleString()}/mês
                </span>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    Agendar
                  </Button>
                  <Button size="sm" className="text-xs bg-cloudcostx-green hover:bg-cloudcostx-green/90 h-7">
                    <CheckCircle className="h-3 w-3 mr-1" /> Implementar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
