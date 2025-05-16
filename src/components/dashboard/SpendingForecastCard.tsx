import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  // Verificar se o último valor previsto ultrapassa o orçamento
  const lastPoint = data[data.length - 1];
  const budgetExceeded = lastPoint.forecast && lastPoint.budget && lastPoint.forecast > lastPoint.budget;
  
  const formatCurrency = (value: number) => {
    if (!value) return '-';
    
    if (value >= 1000000) {
      return `${currency} ${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${currency} ${(value / 1000).toFixed(2)}K`;
    }
    return `${currency} ${value.toLocaleString()}`;
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium text-xs border-b pb-1 mb-2">{label}</p>
          {payload.map((entry: any) => (
            <div key={entry.dataKey} className="flex items-center text-sm mb-1 last:mb-0">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              <span className="mr-2 text-xs text-muted-foreground">{entry.name}:</span>
              <span className="font-medium">
                {entry.value ? formatCurrency(entry.value) : '-'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg font-medium">
            <TrendingUp className="mr-2 h-5 w-5 text-cloudcostx-blue-light" />
            Previsão de Gastos
          </CardTitle>
          
          {budgetExceeded && (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span className="text-xs">Previsão acima do orçamento</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[330px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tickFormatter={(value) => `${currency} ${(value/1000).toFixed(0)}K`}
                width={65}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine 
                y={data[0].budget} 
                stroke="#F87171" 
                strokeDasharray="3 3" 
                strokeWidth={2}
                label={{ 
                  position: 'right',
                  value: 'Orçamento', 
                  fill: '#F87171', 
                  fontSize: 11
                }}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#1A2B3C" 
                strokeWidth={2} 
                dot={{ r: 4, fill: '#1A2B3C', strokeWidth: 0 }}
                name="Gasto Real"
                activeDot={{ r: 6, fill: '#1A2B3C', stroke: 'white', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#60A5FA" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={{ r: 4, fill: '#60A5FA', strokeWidth: 0 }}
                name="Previsão"
                activeDot={{ r: 6, fill: '#60A5FA', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#1A2B3C] mr-1"></div>
            <span>Gasto real</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#60A5FA] mr-1"></div>
            <span>Previsão</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#F87171] mr-1"></div>
            <span>Orçamento: {formatCurrency(data[0].budget || 0)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
