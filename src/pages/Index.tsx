
import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import { ResponsivePage } from '@/components/layout/ResponsivePage';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <Dashboard>
      <ResponsivePage
        icon={LayoutDashboard}
        title="FinOps Dashboard"
        description="Welcome to your cloud financial management platform."
        color="text-primary"
        actions={
          <Button size={isMobile ? "sm" : "default"}>
            Get Started
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Sample content to show responsiveness */}
          <div className="bg-card border rounded-lg p-4 h-32 flex items-center justify-center">
            Dashboard Card 1
          </div>
          <div className="bg-card border rounded-lg p-4 h-32 flex items-center justify-center">
            Dashboard Card 2
          </div>
          <div className="bg-card border rounded-lg p-4 h-32 flex items-center justify-center">
            Dashboard Card 3
          </div>
        </div>
      </ResponsivePage>
    </Dashboard>
  );
};

export default Index;
