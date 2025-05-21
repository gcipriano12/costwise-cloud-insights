
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { PageHeader } from '@/components/layout/PageHeader';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const Anomalies = () => {
  const { isDark } = useTheme();
  
  return (
    <Dashboard>
      <div className="flex-1 w-full">
        <PageHeader 
          icon={AlertTriangle} 
          title="Anomalies" 
          description="Detect and resolve unexpected cost patterns."
          color="text-[#bd3bfd]"
        />
        
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Cost Anomalies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "flex items-center justify-center h-64 border rounded-lg",
                isDark ? "border-slate-700" : "border-slate-200"
              )}>
                <p className="text-muted-foreground">Anomalies content will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default Anomalies;
