
import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { PageHeader } from '@/components/layout/PageHeader';
import { LayoutGrid } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const Resources = () => {
  const { isDark } = useTheme();
  
  return (
    <Dashboard>
      <div className="flex-1 w-full">
        <PageHeader 
          icon={LayoutGrid} 
          title="Resources" 
          description="View and manage all your cloud resources in one place."
          color="text-[#0080af]"
        />
        
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Cloud Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "flex items-center justify-center h-64 border rounded-lg",
                isDark ? "border-slate-700" : "border-slate-200"
              )}>
                <p className="text-muted-foreground">Resources content will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default Resources;
