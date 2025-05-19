import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, BarChart2, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

type KPICategory = 'eficiencia' | 'tarifacao' | 'planejamento' | 'governanca';

interface KPI {
  name: string;
  value: number | string;
  unit?: string;
  trend?: number;
  target?: number;
  isGoodWhenHigher?: boolean;
  description?: string;
  formula?: string;
  category: KPICategory;
}

interface EfficiencyKPIsCardProps {
  kpis: KPI[];
}

// Função para criar as definições de cores para cada categoria com suporte a dark mode
const createCategoryColors = (isDark: boolean) => {
  return {
    eficiencia: {
      bg: isDark ? 'bg-blue-900' : 'bg-blue-500',
      hover: isDark ? 'hover:bg-blue-800' : 'hover:bg-blue-600',
      text: isDark ? 'text-blue-400' : 'text-blue-500',
      tileBg: isDark ? 'bg-blue-900/50' : 'bg-blue-50',
      border: isDark ? 'border-blue-800' : 'border-blue-100'
    },
    tarifacao: {
      bg: isDark ? 'bg-purple-900' : 'bg-purple-500',
      hover: isDark ? 'hover:bg-purple-800' : 'hover:bg-purple-600',
      text: isDark ? 'text-purple-400' : 'text-purple-500',
      tileBg: isDark ? 'bg-purple-900/50' : 'bg-purple-50',
      border: isDark ? 'border-purple-800' : 'border-purple-100'
    },
    planejamento: {
      bg: isDark ? 'bg-amber-900' : 'bg-amber-500',
      hover: isDark ? 'hover:bg-amber-800' : 'hover:bg-amber-600',
      text: isDark ? 'text-amber-400' : 'text-amber-500',
      tileBg: isDark ? 'bg-amber-900/50' : 'bg-amber-50',
      border: isDark ? 'border-amber-800' : 'border-amber-100'
    },
    governanca: {
      bg: isDark ? 'bg-emerald-900' : 'bg-emerald-500',
      hover: isDark ? 'hover:bg-emerald-800' : 'hover:bg-emerald-600',
      text: isDark ? 'text-emerald-400' : 'text-emerald-500',
      tileBg: isDark ? 'bg-emerald-900/50' : 'bg-emerald-50',
      border: isDark ? 'border-emerald-800' : 'border-emerald-100'
    }
  } as const;
};

const CATEGORY_LABELS: Record<KPICategory, string> = {
  eficiencia: 'Eficiência',
  tarifacao: 'Tarifação',
  planejamento: 'Planejamento',
  governanca: 'Governança'
};

export function EfficiencyKPIsCard({ kpis }: EfficiencyKPIsCardProps) {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState<KPICategory>('eficiencia');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  // Gerar cores de categoria com base no tema atual
  const CATEGORY_COLORS = createCategoryColors(isDark);

  // Filtrando KPIs pela categoria selecionada
  const filteredKPIs = kpis.filter(kpi => kpi.category === activeCategory);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(filteredKPIs.length / itemsPerPage);
  
  // Resetar página atual ao trocar de categoria
  const handleCategoryChange = (category: KPICategory) => {
    setActiveCategory(category);
    setCurrentPage(0);
  };

  // Obter os KPIs da página atual
  const paginatedKPIs = filteredKPIs.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );
  
  // Verificar se é necessário exibir a paginação
  const shouldShowPagination = filteredKPIs.length > itemsPerPage;
  
  // Funções para navegação entre páginas
  const handlePrevious = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const getTrendIcon = (trend: number | undefined, isGoodWhenHigher = true) => {
    if (trend === undefined) return null;
    
    const isPositive = trend > 0;
    const isGoodTrend = isGoodWhenHigher ? isPositive : !isPositive;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;
    
    return (
      <TrendIcon 
        className={`h-4 w-4 ml-2 ${isGoodTrend 
          ? isDark ? 'text-green-400' : 'text-cloudcostx-green' 
          : isDark ? 'text-red-400' : 'text-cloudcostx-red'
        }`} 
      />
    );
  };

  // Lista de todas as categorias
  const categories: KPICategory[] = ['eficiencia', 'tarifacao', 'planejamento', 'governanca'];

  const activeColor = CATEGORY_COLORS[activeCategory];
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg font-medium">
            <BarChart2 className={`h-5 w-5 mr-2 ${activeColor.text}`} />
            KPIs de Eficiência
          </CardTitle>
          
          <div className="flex space-x-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                className={`px-3 py-1 h-8 text-xs ${
                  activeCategory === category 
                    ? `${CATEGORY_COLORS[category].bg} ${CATEGORY_COLORS[category].hover} text-white` 
                    : cn(
                      "bg-transparent",
                      isDark 
                        ? `border-slate-700 ${CATEGORY_COLORS[category].text} hover:text-white` 
                        : `border-gray-200 ${CATEGORY_COLORS[category].text} hover:text-white`,
                      `hover:${CATEGORY_COLORS[category].bg}`
                    )
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {CATEGORY_LABELS[category]}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className={`flex-grow pb-3 flex flex-col border-t-2 ${activeColor.border}`}>
        {filteredKPIs.length > 0 ? (
          <>
            <div className="flex-grow pt-3">
              <div className="grid grid-cols-2 gap-4">
                {paginatedKPIs.map((kpi) => (
                  <div 
                    key={kpi.name} 
                    className={`p-3 rounded-md border ${activeColor.border} ${activeColor.tileBg}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">{kpi.name}</div>
                      {kpi.description && (
                        <TooltipProvider>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-transparent">
                                <HelpCircle className={`h-4 w-4 ${activeColor.text}`} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className={cn(
                              "max-w-xs",
                              isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-200 text-slate-900"
                            )}>
                              <div>
                                <p className="font-medium mb-1">{kpi.name}</p>
                                <p className="text-xs mb-1">{kpi.description}</p>
                                {kpi.formula && (
                                  <div className={cn(
                                    "p-1 rounded text-xs font-mono",
                                    isDark ? "bg-slate-700" : "bg-slate-100"
                                  )}>
                                    {kpi.formula}
                                  </div>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      <div className={`text-xl font-bold ${activeColor.text}`}>
                        {typeof kpi.value === 'number' 
                          ? kpi.value.toLocaleString() 
                          : kpi.value}
                        {kpi.unit && <span className="text-sm font-normal ml-1">{kpi.unit}</span>}
                      </div>
                      {getTrendIcon(kpi.trend, kpi.isGoodWhenHigher)}
                    </div>
                    {kpi.target !== undefined && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Meta: {kpi.target.toLocaleString()}{kpi.unit}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Paginação */}
            {shouldShowPagination && (
              <div className={cn(
                "flex justify-center items-center mt-4 pt-2 border-t",
                isDark ? "border-slate-700" : "border-gray-100"
              )}>
                <div className="text-xs flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-6 w-6 ${activeColor.text}`}
                    onClick={handlePrevious}
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  <span className="px-1 text-muted-foreground">
                    {currentPage + 1}/{totalPages}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-6 w-6 ${activeColor.text}`}
                    onClick={handleNext}
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Nenhum KPI disponível para esta categoria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
