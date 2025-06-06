import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { BudgetCreate, BudgetUpdate, BudgetResponse } from '@/hooks/useBudgets';

interface BudgetFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BudgetCreate | BudgetUpdate) => Promise<void>;
  budget?: BudgetResponse; // Para edição
  mode: 'create' | 'edit';
}

export function BudgetFormDialog({
  open,
  onOpenChange,
  onSubmit,
  budget,
  mode
}: BudgetFormDialogProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    budget_name: budget?.budget_name || '',
    provider_name: budget?.provider_name || null,
    service_name: budget?.service_name || '',
    budget_amount: budget?.budget_amount || '',
    budget_period: budget?.budget_period || 'monthly',
    alert_threshold: budget?.alert_threshold || '80.00',
    is_active: budget?.is_active ?? true,
    tags: budget?.tags || {}
  });

  const [tagsText, setTagsText] = useState(
    budget?.tags ? JSON.stringify(budget.tags, null, 2) : ''
  );

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  const validateForm = (): string | null => {
    if (!formData.budget_name.trim()) {
      return 'Budget name is required';
    }
    
    if (!formData.budget_amount || parseFloat(formData.budget_amount) <= 0) {
      return 'Budget amount must be greater than 0';
    }

    const threshold = parseFloat(formData.alert_threshold);
    if (isNaN(threshold) || threshold < 0 || threshold > 100) {
      return 'Alert threshold must be between 0 and 100';
    }

    if (tagsText.trim()) {
      try {
        JSON.parse(tagsText);
      } catch {
        return 'Tags must be valid JSON format';
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let tags = {};
      if (tagsText.trim()) {
        tags = JSON.parse(tagsText);
      }

      const submitData = {
        ...formData,
        budget_amount: parseFloat(formData.budget_amount).toFixed(4),
        alert_threshold: parseFloat(formData.alert_threshold).toFixed(2),
        tags: Object.keys(tags).length > 0 ? tags : undefined,
        // Tratamento correto para provider_name
        provider_name: formData.provider_name && formData.provider_name !== "all_providers" ? formData.provider_name : undefined,
        service_name: formData.service_name.trim() || undefined,
      };

      await onSubmit(submitData);
      onOpenChange(false);
      
      // Reset form
      if (mode === 'create') {
        setFormData({
          budget_name: '',
          provider_name: '',
          service_name: '',
          budget_amount: '',
          budget_period: 'monthly',
          alert_threshold: '80.00',
          is_active: true,
          tags: {}
        });
        setTagsText('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            {mode === 'create' ? 'Create New Budget' : 'Edit Budget'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Define a budget and set up alerts for cost monitoring.'
              : 'Update budget settings and configuration.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="budget_name">Budget Name *</Label>
                <Input
                  id="budget_name"
                  value={formData.budget_name}
                  onChange={(e) => handleInputChange('budget_name', e.target.value)}
                  placeholder="e.g., Engineering Team Q2, Production AWS"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="budget_amount">Budget Amount *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                    <Input
                      id="budget_amount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.budget_amount}
                      onChange={(e) => handleInputChange('budget_amount', e.target.value)}
                      placeholder="0.00"
                      className="pl-7"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="budget_period">Period</Label>
                  <Select
                    value={formData.budget_period}
                    onValueChange={(value) => handleInputChange('budget_period', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="alert_threshold">Alert Threshold (%)</Label>
                <Input
                  id="alert_threshold"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.alert_threshold}
                  onChange={(e) => handleInputChange('alert_threshold', e.target.value)}
                  placeholder="80.00"
                />
                <p className="text-xs text-muted-foreground">
                  Alert when budget consumption reaches this percentage
                </p>
              </div>
            </div>
          </div>

          {/* Scope Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Scope Configuration</h3>              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="provider_name">Cloud Provider</Label>
                  <Select
                    value={formData.provider_name || "all_providers"}
                    onValueChange={(value) => handleInputChange('provider_name', value === "all_providers" ? "" : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Providers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_providers">All Providers</SelectItem>
                      <SelectItem value="AWS">AWS</SelectItem>
                      <SelectItem value="Azure">Azure</SelectItem>
                      <SelectItem value="GCP">Google Cloud Platform</SelectItem>
                      <SelectItem value="Oracle Cloud">Oracle Cloud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              <div className="grid gap-2">
                <Label htmlFor="service_name">Service</Label>
                <Input
                  id="service_name"
                  value={formData.service_name}
                  onChange={(e) => handleInputChange('service_name', e.target.value)}
                  placeholder="e.g., EC2, S3, Virtual Machines (optional)"
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Advanced Settings</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_active">Active Budget</Label>
                <p className="text-sm text-muted-foreground">
                  Whether this budget should actively monitor costs
                </p>
              </div>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange('is_active', checked)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (JSON)</Label>
              <Textarea
                id="tags"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder='{"department": "engineering", "team": "platform"}'
                rows={4}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Optional JSON object for additional metadata and filtering
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
              {mode === 'create' ? 'Create Budget' : 'Update Budget'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
