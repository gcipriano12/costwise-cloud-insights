import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';

interface RegionCost {
  name: string;
  value: number;
  children?: RegionCost[];
}

interface RegionHeatmapCardProps {
  data: RegionCost[];
  currency: string;
}

export function RegionHeatmapCard({ data, currency }: RegionHeatmapCardProps) {
  // Garantir que apenas as top 5 regiões sejam exibidas
  const topRegions = [...data]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Custom tooltip for the treemap
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">
            {currency} {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom content component for the treemap rectangles
  const CustomizedContent = (props: any) => {
    const { x, y, width, height, depth, name, value } = props;
    
    // Usar cores mais distintas entre si para melhor visualização
    const color = `hsl(${(props.index * 55) % 360}, 70%, ${80 - (depth * 10 + Math.floor(value / 10000) * 20)}%)`;
    
    // Mostrar texto apenas se houver espaço suficiente
    const shouldRenderText = width > 40 && height > 25;
    
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
            strokeWidth: 3,
            strokeOpacity: 1,
          }}
        />
        {shouldRenderText && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 6}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fill: '#fff',
                fontSize: Math.min(12, Math.max(9, width / 10)),
                fontWeight: 'bold',
                textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
              }}
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 10}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fill: '#fff',
                fontSize: Math.min(10, Math.max(8, width / 12)),
                fontWeight: 'medium',
                textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
              }}
            >
              {currency} {Math.round(value / 1000)}K
            </text>
          </>
        )}
      </g>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="text-lg font-medium">Heatmap de Custos por Região</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-2 flex flex-col">
        <div className="flex-grow h-[360px] min-h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={topRegions}
              dataKey="value"
              stroke="#fff"
              fill="#8884d8"
              content={<CustomizedContent />}
              animationDuration={500}
            >
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
