import React, { useState, useMemo } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import { PageHeader } from '@/components/layout/PageHeader';
import { LineChart, Plus, Search, AlertTriangle, CheckCircle, AlertCircle, Edit, Trash2, Eye, Power, PowerOff, RefreshCw, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { useBudgets, BudgetResponse, BudgetCreate, BudgetUpdate } from '@/hooks/useBudgets';
import { BudgetFormDialog } from '@/components/dashboard/BudgetFormDialog';
import { BudgetDetailsDialog } from '@/components/dashboard/BudgetDetailsDialog';

const formatCurrency = (amount: string | number) => {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getStatusInfo = (budget: BudgetResponse, isActive: boolean = true) => {
  if (!isActive) {
    return {
      status: 'inactive',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      icon: <AlertCircle className="h-4 w-4" />
    };
  }

  // For active budgets, we'll show based on basic info
  // Real consumption status will be shown in details dialog
  return {
    status: 'active',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    icon: <CheckCircle className="h-4 w-4" />
  };
};

const BudgetStatusBadge = ({ budget }: { budget: BudgetResponse }) => {
  const statusInfo = getStatusInfo(budget, budget.is_active);
  
  return (
    <Badge 
      variant="outline" 
      className={cn("text-xs", statusInfo.color, statusInfo.bgColor)}
    >
      {statusInfo.icon}
      <span className="ml-1">
        {budget.is_active ? 'Active' : 'Inactive'}
      </span>
    </Badge>
  );
};

const Budgets = () => {
  const { isDark } = useTheme();
  
  // API Integration
  const [filters, setFilters] = useState({
    provider_name: '',
    service_name: '',
    is_active: undefined as boolean | undefined
  });
  
  const {
    budgets,
    totalCount,
    totalBudgetAmount,
    totalConsumption,
    overallConsumptionPercentage,
    loading,
    error,
    createBudget,
    updateBudget,
    deleteBudget,
    getBudgetConsumption,
    getBudgetAlerts,
    activateBudget,
    deactivateBudget,
    refreshBudgets
  } = useBudgets(filters);

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<BudgetResponse | null>(null);

  // Filter and search budgets
  const filteredBudgets = useMemo(() => {
    return budgets.filter(budget => {
      const matchesSearch = searchQuery === '' || 
        budget.budget_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        budget.provider_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        budget.service_name?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [budgets, searchQuery]);

  const handleCreateBudget = async (data: BudgetCreate) => {
    await createBudget(data);
  };

  const handleUpdateBudget = async (data: BudgetUpdate) => {
    if (selectedBudget) {
      await updateBudget(selectedBudget.id, data);
      setSelectedBudget(null);
    }
  };

  const handleDeleteBudget = async (budget: BudgetResponse) => {
    if (confirm(`Are you sure you want to delete "${budget.budget_name}"?`)) {
      await deleteBudget(budget.id);
    }
  };

  const handleToggleBudgetStatus = async (budget: BudgetResponse) => {
    if (budget.is_active) {
      await deactivateBudget(budget.id);
    } else {
      await activateBudget(budget.id);
    }
  };

  const handleViewDetails = (budget: BudgetResponse) => {
    setSelectedBudget(budget);
    setDetailsDialogOpen(true);
  };

  const handleEditBudget = (budget: BudgetResponse) => {
    setSelectedBudget(budget);
    setEditDialogOpen(true);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }));
  };

  const overallProgress = parseFloat(overallConsumptionPercentage) || 0;

  // Debug: verificar estado de autenticação
  console.log('🔍 [Budgets] Debug auth state:', {
    loading,
    error,
    budgetsCount: budgets.length,
    totalCount,
    token: localStorage.getItem('access_token') ? 'Present' : 'Missing'
  });

  if (loading) {
    return (
      <Dashboard>
        <div className="flex-1 w-full">
          <PageHeader 
            icon={LineChart} 
            title="Budgets" 
            description="Define and monitor cloud budget allocations."
            color="text-[#0080af]"
          />
          <div className="p-4 flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <div className="flex-1 w-full">
        <PageHeader 
          icon={LineChart} 
          title="Budgets" 
          description="Define and monitor cloud budget allocations."
          color="text-[#0080af]"
          actions={
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshBudgets}
                disabled={loading}
              >
                <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
                Refresh
              </Button>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Budget
              </Button>
            </div>
          }
        />
        
        {error && (
          <div className="p-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
        
        <div className="p-4 space-y-6">
          {/* Overall Budget Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Budgets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalBudgetAmount)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalConsumption)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
                  <Progress 
                    value={overallProgress} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budgets Table */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <CardTitle className="text-lg font-medium">Budget Management</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search budgets..."
                      className="w-[250px] pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select 
                    value={filters.provider_name || 'all'} 
                    onValueChange={(value) => handleFilterChange('provider_name', value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Providers</SelectItem>
                      <SelectItem value="AWS">AWS</SelectItem>
                      <SelectItem value="Azure">Azure</SelectItem>
                      <SelectItem value="GCP">GCP</SelectItem>
                      <SelectItem value="Oracle Cloud">Oracle Cloud</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={filters.is_active === undefined ? 'all' : filters.is_active.toString()} 
                    onValueChange={(value) => handleFilterChange('is_active', value === 'all' ? undefined : value === 'true')}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Budget Name</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Budget Amount</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBudgets.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          {searchQuery || filters.provider_name || filters.service_name || filters.is_active !== undefined
                            ? "No budgets found matching the current filters."
                            : "No budgets created yet. Create your first budget to get started."
                          }
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBudgets.map((budget) => (
                        <TableRow key={budget.id}>
                          <TableCell>
                            <BudgetStatusBadge budget={budget} />
                          </TableCell>
                          <TableCell className="font-medium">{budget.budget_name}</TableCell>
                          <TableCell>{budget.provider_name || 'All'}</TableCell>
                          <TableCell>{budget.service_name || 'All'}</TableCell>
                          <TableCell>{formatCurrency(budget.budget_amount)}</TableCell>
                          <TableCell className="capitalize">{budget.budget_period}</TableCell>
                          <TableCell>{formatDate(budget.created_at)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(budget)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditBudget(budget)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleBudgetStatus(budget)}>
                                  {budget.is_active ? (
                                    <>
                                      <PowerOff className="mr-2 h-4 w-4" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <Power className="mr-2 h-4 w-4" />
                                      Activate
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteBudget(budget)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dialog Components */}
        <BudgetFormDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={handleCreateBudget}
          mode="create"
        />

        <BudgetFormDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSubmit={handleUpdateBudget}
          mode="edit"
          budget={selectedBudget || undefined}
        />

        <BudgetDetailsDialog
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
          budget={selectedBudget}
          onGetConsumption={getBudgetConsumption}
          onGetAlerts={getBudgetAlerts}
          onActivate={activateBudget}
          onDeactivate={deactivateBudget}
        />
      </div>
    </Dashboard>
  );
};

export default Budgets;
