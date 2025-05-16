
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ForecastDataPoint {
  month: string;
  actual?: number;
  forecast?: number;
  budget?: number;
}

interface SpendingForecastCardProps {
  data: ForecastDataPoint[];
  currency: string;
}

export function SpendingForecastCard({ data, currency }: SpendingForecastCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Previsão de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis 
                tickFormatter={(value) => `${currency} ${(value/1000).toFixed(0)}K`}
                width={70}
              />
              <Tooltip 
                formatter={(value: number) => [`${currency} ${value.toLocaleString()}`, 'Valor']}
              />
              <ReferenceLine y={data[0].budget} stroke="#F87171" strokeDasharray="3 3" label="Orçamento" />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#1A2B3C" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                name="Gasto Real"
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#60A5FA" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={{ r: 4, strokeDasharray: '' }}
                name="Previsão"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
