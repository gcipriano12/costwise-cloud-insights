
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
  const getUtilizationColor = (usage: number, warningThreshold: number) => {
    if (usage >= warningThreshold) return 'bg-cloudcostx-red';
    if (usage >= warningThreshold * 0.8) return 'bg-amber-500';
    return 'bg-cloudcostx-blue';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Utilização de Recursos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource) => {
            const utilizationPercentage = Math.round((resource.usage / resource.totalAvailable) * 100);
            return (
              <div key={resource.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{resource.name}</span>
                  <span className="text-sm text-muted-foreground">{utilizationPercentage}%</span>
                </div>
                <Progress 
                  value={utilizationPercentage} 
                  className={`h-2 ${getUtilizationColor(utilizationPercentage, resource.warningThreshold)}`}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
