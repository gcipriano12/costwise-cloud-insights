
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
      <span className="text-sm text-cloudcostx-gray-400 dark:text-slate-400">Período:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-48 h-8 text-sm dark:bg-[#1A202C] dark:text-white dark:border-gray-700">
          <SelectValue placeholder="Selecionar período" />
        </SelectTrigger>
        <SelectContent className="dark:bg-[#1A202C] dark:text-white dark:border-gray-700">
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
