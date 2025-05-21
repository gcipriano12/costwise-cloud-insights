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
    <Dashboard />
  );
};

export default VirtualTags;
