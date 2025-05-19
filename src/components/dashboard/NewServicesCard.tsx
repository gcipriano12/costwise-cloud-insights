import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

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
  const { isDark } = useTheme();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="flex items-center text-base font-semibold">
          <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
          Novos Serviços
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow px-4 pt-2 pb-3 overflow-auto">
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className={cn(
              "border-b pb-3 last:border-0 last:pb-0",
              isDark ? "border-slate-700" : "border-gray-100"
            )}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium">{service.name}</div>
                  <div className={cn(
                    "text-xs",
                    isDark ? "text-slate-400" : "text-muted-foreground"
                  )}>{service.provider}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold">{service.currency} {service.cost.toLocaleString()}</div>
                  <div className={cn(
                    "text-xs",
                    isDark ? "text-slate-400" : "text-muted-foreground"
                  )}>{formatDate(service.addedDate)}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {service.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
          
          {services.length === 0 && (
            <div className={cn(
              "text-center py-4",
              isDark ? "text-slate-400" : "text-muted-foreground"
            )}>
              Nenhum novo serviço detectado no período.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
