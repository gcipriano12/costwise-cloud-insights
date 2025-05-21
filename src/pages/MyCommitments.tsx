
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { PageHeader } from '@/components/layout/PageHeader';
import { CalendarCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const MyCommitments = () => {
  const { isDark } = useTheme();
  
  return (
    <Dashboard>
      <div className="flex-1 w-full">
        <PageHeader 
          icon={CalendarCheck} 
          title="My Commitments" 
          description="Manage discount commitments like Reserved Instances and Savings Plans."
          color="text-[#bd3bfd]"
        />
        
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Active Commitments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "flex items-center justify-center h-64 border rounded-lg",
                isDark ? "border-slate-700" : "border-slate-200"
              )}>
                <p className="text-muted-foreground">Commitments content will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default MyCommitments;
