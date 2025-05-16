
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface ServiceData {
  id: string;
  name: string;
  provider: string;
  currentSpend: number;
  previousSpend: number;
  trend: number;
}

interface TopServicesProps {
  services: ServiceData[];
  currency: string;
}

export function TopServicesCard({ services, currency }: TopServicesProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Top 10 Serviços</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Provedor</TableHead>
              <TableHead className="text-right">Gasto Atual</TableHead>
              <TableHead className="text-right">Variação</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => {
              const isIncrease = service.trend > 0;
              
              return (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.provider}</TableCell>
                  <TableCell className="text-right">
                    {currency} {service.currentSpend.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={isIncrease ? 'trend-up' : 'trend-down'}>
                      <span className="inline-flex items-center">
                        {isIncrease ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(service.trend)}%
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
