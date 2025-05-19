import React from 'react';
import { Bell, Menu, Settings, X, User } from 'lucide-react';
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
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();

  // Desabilitar rolagem quando menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Visão Geral', href: '/', active: true },
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
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Logo e navegação */}
          <div className="flex items-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
              CloudCostX
            </div>
            
            {/* Navegação Desktop */}
            <nav className="hidden md:block ml-8">
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
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Botão do tema */}
            <ThemeToggle />
            
            {/* Botão do menu mobile - mais à direita para facilitar acesso */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden relative z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            {/* Outros controles - ocultos em mobile */}
            <div className="hidden sm:flex items-center gap-1">
              {/* Notificações */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            
              {/* Configurações - exibido em telas maiores */}
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            
              {/* Menu do usuário */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Minha Conta</span>
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
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay do menu mobile */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden",
          mobileMenuOpen 
            ? "opacity-100" 
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />
        
      {/* Menu Mobile - reposicionado e estilizado para melhor experiência */}
      <div 
        className={cn(
          "fixed top-[57px] left-0 right-0 bottom-0 z-40 bg-white dark:bg-black overflow-y-auto transition-transform duration-300 ease-in-out transform md:hidden",
          isDark ? "border-t border-slate-700" : "border-t border-slate-200",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 pt-4 pb-8">
          <nav>
            <ul className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className={cn(
                      "block py-3 px-4 text-base font-medium rounded-md transition-colors",
                      item.active 
                        ? isDark 
                          ? "bg-blue-900/20 text-blue-500" 
                          : "bg-blue-50 text-blue-500"
                        : isDark 
                          ? "text-white hover:bg-slate-800" 
                          : "text-slate-900 hover:bg-gray-50"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Ações adicionais para mobile */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
              <div className="flex flex-col space-y-3">
                <a href="#" className="flex items-center py-3 px-4 text-base font-medium rounded-md hover:bg-gray-50 dark:hover:bg-slate-800">
                  <Bell className="h-5 w-5 mr-3" />
                  Notificações
                </a>
                <a href="#" className="flex items-center py-3 px-4 text-base font-medium rounded-md hover:bg-gray-50 dark:hover:bg-slate-800">
                  <Settings className="h-5 w-5 mr-3" />
                  Configurações
                </a>
                <a href="#" className="flex items-center py-3 px-4 text-base font-medium rounded-md hover:bg-gray-50 dark:hover:bg-slate-800">
                  <User className="h-5 w-5 mr-3" />
                  Minha Conta
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
