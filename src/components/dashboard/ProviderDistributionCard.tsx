
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProviderData {
  name: string;
  value: number;
  color: string;
}

interface ProviderDistributionProps {
  data: ProviderData[];
  currency: string;
}

export function ProviderDistributionCard({ data, currency }: ProviderDistributionProps) {
  const total = data.reduce((sum, provider) => sum + provider.value, 0);
  
  const formatCurrency = (value: number) => {
    return `${currency} ${value.toLocaleString()}`;
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-2 border border-cloudcostx-gray-200 rounded shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-cloudcostx-gray-400">
            {formatCurrency(data.value)} ({percentage}%)
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Distribuição por Provedores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right" 
                formatter={(value, entry, index) => {
                  const item = data[index];
                  const percentage = ((item.value / total) * 100).toFixed(1);
                  return <span className="text-sm">{value} ({percentage}%)</span>;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
