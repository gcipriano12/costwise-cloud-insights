
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CostEvent {
  id: string;
  date: string;
  title: string;
  type: 'billing' | 'contract' | 'budget' | 'other';
  impact?: number;
  currency?: string;
}

interface CostEventCalendarCardProps {
  events: CostEvent[];
  currentMonth: string;
}

export function CostEventCalendarCard({ events, currentMonth }: CostEventCalendarCardProps) {
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'billing': return 'bg-blue-500 hover:bg-blue-600';
      case 'contract': return 'bg-purple-500 hover:bg-purple-600';
      case 'budget': return 'bg-amber-500 hover:bg-amber-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Calendário de Eventos de Custos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium mb-3">{currentMonth}</div>
        <div className="space-y-2">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium">{new Date(event.date).getDate()}</div>
                <div>
                  <div className="text-sm">{event.title}</div>
                  {event.impact && event.currency && (
                    <div className="text-xs text-muted-foreground">
                      Impacto: {event.currency} {event.impact.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
              <Badge className={getEventTypeColor(event.type)}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
