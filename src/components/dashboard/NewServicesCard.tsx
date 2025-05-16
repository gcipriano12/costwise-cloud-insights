
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NewService {
  id: string;
  name: string;
  provider: string;
  addedDate: string;
  cost: number;
  currency: string;
  tags: string[];
}

interface NewServicesCardProps {
  services: NewService[];
}

export function NewServicesCard({ services }: NewServicesCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <Sparkles className="h-5 w-5 mr-2" />
          Novos Serviços
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="border-b border-border pb-2 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{service.name}</div>
                  <div className="text-sm text-muted-foreground">{service.provider}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{service.currency} {service.cost.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Adicionado em {formatDate(service.addedDate)}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {service.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
          
          {services.length === 0 && (
            <div className="text-center text-muted-foreground py-4">
              Nenhum novo serviço detectado no período.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
