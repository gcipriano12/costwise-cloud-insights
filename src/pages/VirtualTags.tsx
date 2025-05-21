
import React, { useState } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tags, Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

// Mock data for Virtual Tags
const mockTags = [
  { 
    id: '1', 
    name: 'Development Environment', 
    conditions: 'Provider: AWS, Name contains: dev-', 
    tag: 'Environment:Development', 
    scope: 'Global',
    status: true,
    createdAt: '2025-04-15',
    modifiedAt: '2025-05-10',
    affectedResources: 128
  },
  { 
    id: '2', 
    name: 'Database Resources', 
    conditions: 'Service: RDS, DynamoDB', 
    tag: 'ResourceType:Database', 
    scope: 'US-East-1',
    status: true,
    createdAt: '2025-03-22',
    modifiedAt: '2025-05-01',
    affectedResources: 45
  },
  { 
    id: '3', 
    name: 'Team Alpha Resources', 
    conditions: 'Name contains: alpha-', 
    tag: 'Team:Alpha', 
    scope: 'All Regions',
    status: false,
    createdAt: '2025-01-10',
    modifiedAt: '2025-04-20',
    affectedResources: 73
  },
  { 
    id: '4', 
    name: 'Production Services', 
    conditions: 'Provider: GCP, Name contains: prod-', 
    tag: 'Environment:Production', 
    scope: 'Global',
    status: true,
    createdAt: '2025-02-28',
    modifiedAt: '2025-05-12',
    affectedResources: 92
  },
  { 
    id: '5', 
    name: 'Untagged Compute', 
    conditions: 'Service: EC2, Tags missing: Owner', 
    tag: 'RequiresTagging:Yes', 
    scope: 'US-West-2',
    status: true,
    createdAt: '2025-03-15',
    modifiedAt: '2025-05-08',
    affectedResources: 37
  }
];

const VirtualTags = () => {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTags, setFilteredTags] = useState(mockTags);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredTags(mockTags);
    } else {
      setFilteredTags(
        mockTags.filter(tag => 
          tag.name.toLowerCase().includes(term.toLowerCase()) || 
          tag.conditions.toLowerCase().includes(term.toLowerCase()) ||
          tag.tag.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  return (
    <Dashboard>
      <div className="flex-1 w-full">
        <PageHeader 
          icon={Tags} 
          title="Virtual Tags" 
          description="Create and manage virtual tagging rules for untagged resources."
          color="text-[#0080af]"
          actions={
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Rule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create Virtual Tag Rule</DialogTitle>
                  <DialogDescription>
                    Define conditions to automatically apply tags to resources that match criteria.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Rule Name</Label>
                    <Input id="name" placeholder="Enter rule name" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="conditions">Conditions</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="provider" className="text-xs">Provider</Label>
                        <Select />
                      </div>
                      <div>
                        <Label htmlFor="service" className="text-xs">Service</Label>
                        <Select />
                      </div>
                    </div>
                    <Input placeholder="Name contains..." className="mt-2" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="tag">Tag to Apply</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Key" />
                      <Input placeholder="Value" />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="scope">Scope</Label>
                    <Select />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={() => setOpen(false)}>
                    Create Rule
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          }
        />
        
        <div className="p-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-wrap justify-between items-center">
                <CardTitle className="text-lg font-medium">Virtual Tag Rules</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search rules..."
                      className="w-full pl-9 md:w-[300px]"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rule Name</TableHead>
                      <TableHead>Conditions</TableHead>
                      <TableHead>Tag</TableHead>
                      <TableHead>Scope</TableHead>
                      <TableHead>Affected Resources</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTags.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No rules found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTags.map(rule => (
                        <TableRow key={rule.id}>
                          <TableCell className="font-medium">{rule.name}</TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">{rule.conditions}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn(
                              "border-blue-500/50",
                              isDark ? "bg-blue-950/30 text-blue-400" : "bg-blue-50 text-blue-700"
                            )}>
                              {rule.tag}
                            </Badge>
                          </TableCell>
                          <TableCell>{rule.scope}</TableCell>
                          <TableCell>{rule.affectedResources}</TableCell>
                          <TableCell>
                            <Switch checked={rule.status} />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Rule History</h4>
                <div className={cn(
                  "flex flex-col gap-2 p-3 rounded-md text-sm",
                  isDark ? "bg-slate-900" : "bg-slate-50"
                )}>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">2025-05-12</span>
                    <span>Rule "Production Services" updated by admin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">2025-05-10</span>
                    <span>Rule "Development Environment" updated by admin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">2025-05-08</span>
                    <span>Rule "Untagged Compute" updated by admin</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
};

export default VirtualTags;
