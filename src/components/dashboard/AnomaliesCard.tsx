
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface Anomaly {
  id: string;
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  impact: number;
}

interface AnomaliesCardProps {
  anomalies: Anomaly[];
  currency: string;
}

export function AnomaliesCard({ anomalies, currency }: AnomaliesCardProps) {
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'bg-cloudcostx-red/10 border-cloudcostx-red/50 text-cloudcostx-red';
      case 'medium': return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'low': return 'bg-cloudcostx-blue-light/10 border-cloudcostx-blue-light/50 text-cloudcostx-blue-light';
      default: return '';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Anomalias Detectadas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {anomalies.length > 0 ? (
            anomalies.map((anomaly) => (
              <Alert key={anomaly.id} className={getSeverityColor(anomaly.severity)}>
                <div className="flex justify-between">
                  <div>
                    <AlertTitle className="font-medium">{anomaly.title}</AlertTitle>
                    <AlertDescription className="text-sm mt-1">
                      {anomaly.description}
                    </AlertDescription>
                    <p className="text-xs mt-1 font-medium">
                      Impacto estimado: {currency} {anomaly.impact.toLocaleString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="self-start border-current text-current bg-white">
                    Investigar
                  </Button>
                </div>
              </Alert>
            ))
          ) : (
            <p className="text-cloudcostx-gray-400 text-center py-8">Nenhuma anomalia detectada no período selecionado.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
