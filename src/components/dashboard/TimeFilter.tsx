import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

interface TimeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimeFilter({ value, onChange }: TimeFilterProps) {
  const isMobile = useIsMobile();
  
  // Função para mapear os valores para textos legíveis
  const getTimeFilterLabel = (value: string): string => {
    const options: Record<string, string> = {
      '7d': 'Últimos 7 dias',
      '30d': 'Últimos 30 dias',
      '90d': 'Últimos 90 dias',
      '1y': 'Último ano',
      'custom': 'Personalizado',
      'last-7-days': 'Últimos 7 dias',
      'last-30-days': 'Últimos 30 dias',
      'last-90-days': 'Últimos 90 dias',
      'last-year': 'Último ano'
    };
    
    return options[value] || 'Selecionar período';
  };
  
  return (
    <div className="flex items-center space-x-2">
      {!isMobile && <span className="text-sm text-XCost-gray-400">Período:</span>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`${isMobile ? 'w-40' : 'w-44'} h-8 text-sm`}>
          <SelectValue>{getTimeFilterLabel(value)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7d">Últimos 7 dias</SelectItem>
          <SelectItem value="30d">Últimos 30 dias</SelectItem>
          <SelectItem value="90d">Últimos 90 dias</SelectItem>
          <SelectItem value="1y">Último ano</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
