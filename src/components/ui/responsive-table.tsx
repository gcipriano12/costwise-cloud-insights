
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface Column {
  header: React.ReactNode;
  accessorKey: string;
  cell?: (value: any, row: any) => React.ReactNode;
  className?: string;
  isNumeric?: boolean;
}

interface ResponsiveTableProps {
  data: any[];
  columns: Column[];
  onRowClick?: (row: any) => void;
  responsiveMode?: 'cards' | 'scroll';
  cardClassName?: string;
}

export function ResponsiveTable({
  data,
  columns,
  onRowClick,
  responsiveMode = 'cards',
  cardClassName
}: ResponsiveTableProps) {
  const isMobile = useIsMobile();
  
  if (isMobile && responsiveMode === 'cards') {
    return (
      <div className="space-y-3">
        {data.map((row, rowIndex) => (
          <Card 
            key={rowIndex}
            className={cn(
              "cursor-pointer hover:shadow-md transition-shadow", 
              cardClassName,
              onRowClick ? "cursor-pointer" : ""
            )}
            onClick={() => onRowClick?.(row)}
          >
            <CardContent className="px-4 py-3">
              {columns.map((column, columnIndex) => {
                const value = row[column.accessorKey];
                const content = column.cell ? column.cell(value, row) : value;
                return (
                  <div key={columnIndex} className="flex items-center justify-between py-1.5">
                    <span className="text-sm font-medium text-muted-foreground">{column.header}</span>
                    <span className={cn("text-sm", column.isNumeric ? "font-mono" : "", column.className)}>
                      {content}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className={isMobile ? "overflow-x-auto -mx-4 px-4" : ""}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
            >
              {columns.map((column, columnIndex) => {
                const value = row[column.accessorKey];
                const content = column.cell ? column.cell(value, row) : value;
                return (
                  <TableCell key={columnIndex} className={column.className}>
                    {content}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
