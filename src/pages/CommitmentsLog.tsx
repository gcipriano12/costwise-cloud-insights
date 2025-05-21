
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { PageHeader } from '@/components/layout/PageHeader';
import { ClipboardList } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const CommitmentsLog = () => {
  const { isDark } = useTheme();
  
  return (
    <Dashboard>
      <div className="flex-1 w-full">
        <PageHeader 
          icon={ClipboardList} 
          title="Commitments Log" 
          description="Detailed history of all past and present discount commitments."
          color="text-[#bd3bfd]"
        />
        
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Commitments History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "flex items-center justify-center h-64 border rounded-lg",
                isDark ? "border-slate-700" : "border-slate-200"
              )}>
                <p className="text-muted-foreground">Commitments log content will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default CommitmentsLog;
