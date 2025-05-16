import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

interface SpendingCategory {
  name: string;
  value: number;
  color: string;
}

interface SpendingTrendsCardProps {
  categories: SpendingCategory[];
  currency: string;
}

export function SpendingTrendsCard({ categories, currency }: SpendingTrendsCardProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${currency} ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${currency} ${(value / 1000).toFixed(0)}K`;
    }
    return `${currency} ${value}`;
  };
  
  // Cores padrão caso a propriedade color não esteja preenchida
  const defaultColors = ['#60A5FA', '#F97316', '#10B981', '#8B5CF6', '#EC4899'];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="flex items-center text-lg font-medium">
          <BarChart3 className="mr-2 h-5 w-5 text-cloudcostx-blue" />
          Gastos por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-3 flex flex-col">
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categories}
              margin={{ top: 25, right: 30, left: 20, bottom: 120 }}
              barGap={8}
              barCategoryGap={30}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#e0e0e0' }}
                dy={10}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                width={80}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e0e0e0' }}
                tickCount={6}
              />
              <Tooltip 
                formatter={(value: number) => [`${currency} ${value.toLocaleString()}`, 'Valor']}
                labelFormatter={(label) => `Categoria: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                barSize={55}
                animationDuration={500}
              >
                {categories.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color || defaultColors[index % defaultColors.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
