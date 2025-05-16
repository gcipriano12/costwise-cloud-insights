
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categories}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis 
                tickFormatter={(value) => `${currency} ${value.toLocaleString()}`}
                width={70}
              />
              <Tooltip 
                formatter={(value: number) => [`${currency} ${value.toLocaleString()}`, 'Valor']}
                labelFormatter={(label) => `Categoria: ${label}`}
              />
              <Bar 
                dataKey="value" 
                fill="#60A5FA" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
