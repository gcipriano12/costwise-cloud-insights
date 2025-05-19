import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { PieChart, BarChart3, Cloud } from 'lucide-react';

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
    if (value >= 1000000) {
      return `${currency} ${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${currency} ${(value / 1000).toFixed(2)}K`;
    }
    return `${currency} ${value.toLocaleString()}`;
  };
  
  const formatPercentage = (value: number) => {
    return ((value / total) * 100).toFixed(1);
  };
  
  // Transformar dados para o formato adequado ao Treemap
  const treeMapData = {
    name: 'Provedores',
    children: data.map(provider => ({
      name: provider.name,
      value: provider.value,
      color: provider.color,
      percentage: formatPercentage(provider.value)
    }))
  };
  
  // Custom tooltip para o treemap
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-lg">
          <p className="font-semibold text-sm mb-1">{data.name}</p>
          <p className="text-sm font-mono">
            {formatCurrency(data.value)}
          </p>
          <p className="text-xs text-muted-foreground mt-1 font-medium">
            {data.percentage}% do total
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // Componente de conteúdo customizado para o treemap
  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, value, color, index } = props;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: color,
            stroke: '#fff',
            strokeWidth: 2,
            strokeOpacity: 1,
          }}
        />
        {width > 40 && height > 30 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 8}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fill: '#000',
                stroke: '#000',
                strokeWidth: 0.5,
                fontSize: 12,
                fontWeight: 'bold',
                paintOrder: 'stroke',
              }}
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 8}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fill: '#000',
                stroke: '#000',
                strokeWidth: 0.5,
                fontSize: 10,
                paintOrder: 'stroke',
              }}
            >
              {formatPercentage(value)}%
            </text>
          </>
        )}
      </g>
    );
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-1 flex-shrink-0">
        <div className="flex items-center">
          <CardTitle className="flex items-center text-lg font-medium whitespace-nowrap">
            <Cloud className="mr-2 h-5 w-5 text-cloudcostx-blue" />
            Distribuição por Provedor
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-3">
        <div className="h-[360px] rounded border border-gray-100">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={treeMapData.children}
                dataKey="value"
              stroke="#fff"
              animationDuration={500}
              content={<CustomizedContent />}
              >
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
