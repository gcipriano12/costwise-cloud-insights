
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
  const CustomizedContent: React.FC<any> = (props) => {
    const { x, y, width, height, depth, name, value } = props;
    const color = `hsl(220, 70%, ${80 - (depth * 10 + Math.floor(value / 10000) * 20)}%)`;
    
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
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {width > 30 && height > 20 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fill: '#fff',
              fontSize: 12,
              fontWeight: 'bold',
              textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
            }}
          >
            {name}
          </text>
        )}
      </g>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Heatmap de Custos por Região</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={data}
              dataKey="value"
              stroke="#fff"
              fill="#8884d8"
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
