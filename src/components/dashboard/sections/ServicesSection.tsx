import React from 'react';
import { TopServicesCard } from '../TopServicesCard';
import { SpendingForecastCard } from '../SpendingForecastCard';

interface ServicesSectionProps {
  topServicesData: {
    id: string;
    name: string;
    provider: string;
    currentSpend: number;
    previousSpend: number;
    trend: number;
  }[];
  forecastData: {
    month: string;
    actual?: number;
    forecast?: number;
    budget?: number;
  }[];
  currency: string;
}

export function ServicesSection({ topServicesData, forecastData, currency }: ServicesSectionProps) {
  return (
    <div className="grid grid-cols-12 gap-4 mb-4">
      <div className="col-span-12 md:col-span-12 lg:col-span-6">
        <TopServicesCard 
          services={topServicesData}
          currency={currency}
        />
      </div>

      <div className="col-span-12 md:col-span-12 lg:col-span-6">
        <SpendingForecastCard 
          data={forecastData}
          currency={currency}
        />
      </div>
    </div>
  );
}
