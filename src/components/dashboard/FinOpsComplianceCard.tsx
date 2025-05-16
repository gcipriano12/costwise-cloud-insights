
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ComplianceItem {
  id: string;
  name: string;
  status: 'compliant' | 'non-compliant';
  description: string;
}

interface FinOpsComplianceCardProps {
  items: ComplianceItem[];
}

export function FinOpsComplianceCard({ items }: FinOpsComplianceCardProps) {
  const compliantCount = items.filter(item => item.status === 'compliant').length;
  const compliancePercentage = Math.round((compliantCount / items.length) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Conformidade FinOps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{compliancePercentage}%</div>
            <div className="text-sm text-muted-foreground">
              {compliantCount} de {items.length} práticas em conformidade
            </div>
            <Progress 
              value={compliancePercentage} 
              className="h-2 mt-2"
            />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-sm hover:no-underline py-2">
                  <div className="flex items-center w-full">
                    {item.status === 'compliant' ? (
                      <CheckCircle className="h-4 w-4 mr-2 text-cloudcostx-green" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2 text-cloudcostx-red" />
                    )}
                    <span className="text-left">{item.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground pl-6">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
