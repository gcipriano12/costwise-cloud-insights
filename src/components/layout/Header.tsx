import React from 'react';
import { Bell, Menu, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();

  const navItems = [
    { name: 'Dashboard', href: '/', active: true },
    { name: 'Análise', href: '/analise' },
    { name: 'Alocação', href: '/alocacao' },
    { name: 'Recomendações', href: '/recomendacoes' },
    { name: 'Integrações', href: '/integracoes' }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-colors duration-200",
      isDark 
        ? "bg-black border-slate-700" 
        : "bg-white border-slate-200"
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo e navegação */}
          <div className="flex items-center space-x-8">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
              CloudCostX
            </div>
            
            {/* Navegação Desktop */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-blue-500",
                        item.active 
                          ? "text-blue-500" 
                          : isDark ? "text-slate-200" : "text-slate-600"
                      )}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Ações do header */}
          <div className="flex items-center space-x-2">
            {/* Botão do tema */}
            <ThemeToggle />
            
            {/* Notificações */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* Configurações */}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            
            {/* Menu do usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  <span className="font-medium">Minha Conta</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Usuário</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuItem>Suporte</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Botão de menu mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-2 pb-3 border-t mt-2">
            <nav>
              <ul className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className={cn(
                        "block py-2 px-3 text-base font-medium rounded-md",
                        item.active 
                          ? "bg-blue-50 text-blue-500 dark:bg-blue-900/20" 
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
