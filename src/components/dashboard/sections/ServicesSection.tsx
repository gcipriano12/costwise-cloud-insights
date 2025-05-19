
import React from 'react';
import { TopServicesCard } from '../TopServicesCard';
import { SpendingForecastCard } from '../SpendingForecastCard';
import { Layers } from 'lucide-react';

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
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <Layers className="h-5 w-5 mr-2 text-green-600" />
        <h2 className="text-lg font-semibold">Serviços e Previsões</h2>
      </div>
      
      <div className="grid grid-cols-12 gap-4">
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
    </div>
  );
}
