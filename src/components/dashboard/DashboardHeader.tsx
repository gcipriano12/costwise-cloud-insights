
import React from 'react';
import { TimeFilter } from './TimeFilter';

interface DashboardHeaderProps {
  timeFilter: string;
  onTimeFilterChange: (filter: string) => void;
}

export function DashboardHeader({ timeFilter, onTimeFilterChange }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h1 className="text-2xl font-semibold text-cloudcostx-blue dark:text-white">Dashboard</h1>
      <TimeFilter value={timeFilter} onChange={onTimeFilterChange} />
    </div>
  );
}
