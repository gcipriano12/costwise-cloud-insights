
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TimeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimeFilter({ value, onChange }: TimeFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-XCost-gray-400">Período:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-48 h-8 text-sm">
          <SelectValue placeholder="Selecionar período" />
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
