import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  currentMonth?: string;
}

export function CostEventCalendarCard({ events }: CostEventCalendarCardProps) {
  // Estado para controlar o mês e ano selecionados
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  
  const currentDate = new Date();
  
  // Lista de meses para o seletor
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  // Gerar anos para o seletor (2 anos atrás até 2 anos à frente)
  const years = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i);
  
  // Função para verificar se um evento é do mês/ano selecionado
  const isEventInSelectedPeriod = (eventDate: Date) => {
    return eventDate.getFullYear() === selectedYear && eventDate.getMonth() === selectedMonth;
  };
  
  // Função para verificar se um evento é passado (anterior à data atual)
  const isEventInPast = (eventDate: Date) => {
    return eventDate < currentDate;
  };
  
  // Ordenar eventos por data
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  
  // Filtrar eventos do mês/ano selecionado
  const filteredEvents = sortedEvents.filter(event => {
    const eventDate = new Date(event.date);
    return isEventInSelectedPeriod(eventDate);
  });
  
  // Definir classe baseada no tipo de evento
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'billing': return 'bg-blue-500 hover:bg-blue-600';
      case 'contract': return 'bg-purple-500 hover:bg-purple-600';
      case 'budget': return 'bg-amber-500 hover:bg-amber-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  // Navegar para o mês anterior
  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };
  
  // Navegar para o próximo mês
  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };
  
  // Formatação de data para exibição
  const formatDate = (dateString: string) => {
    const eventDate = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(eventDate);
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="flex items-center text-lg font-medium">
            <CalendarIcon className="h-5 w-5 mr-2 text-cloudcostx-blue" />
            Calendário de Planejamento
          </CardTitle>
          
          {/* Controles de navegação do calendário */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={goToPreviousMonth}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
            <div className="flex items-center space-x-2">
              <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => setSelectedMonth(parseInt(value))}
              >
                <SelectTrigger className="w-[100px] h-8 text-sm">
                  <SelectValue placeholder="Selecione o mês" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger className="w-[80px] h-8 text-sm">
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <button 
              onClick={goToNextMonth}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Próximo mês"
            >
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-3 flex flex-col">
        {/* Lista de eventos */}
        <div className="flex-grow space-y-2">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const eventDate = new Date(event.date);
              const isPastEvent = isEventInPast(eventDate);
              
              return (
                <div 
                  key={event.id} 
                  className={`flex items-center justify-between p-2 rounded-md ${
                    isPastEvent ? 'bg-red-50 border border-red-100' : 'bg-muted/30'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center ${
                      isPastEvent ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {eventDate.getDate()}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${isPastEvent ? 'text-red-700' : ''}`}>
                        {event.title}
                      </div>
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
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Nenhum evento para {months[selectedMonth]} de {selectedYear}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
