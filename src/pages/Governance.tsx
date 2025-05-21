
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { PageHeader } from '@/components/layout/PageHeader';
import { GanttChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const Governance = () => {
  const { isDark } = useTheme();
  
  return (
    <Dashboard>
      <div className="flex-1 w-full">
        <PageHeader 
          icon={GanttChart} 
          title="Governance" 
          description="Configure and manage FinOps governance policies and compliance."
          color="text-[#00c693]"
          actions={
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:border-green-800 dark:text-green-400">
              New
            </Badge>
          }
        />
        
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Governance Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "flex items-center justify-center h-64 border rounded-lg",
                isDark ? "border-slate-700" : "border-slate-200"
              )}>
                <p className="text-muted-foreground">Governance content will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default Governance;
