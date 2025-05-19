
import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DarkModeToggle } from '@/components/theme/DarkModeToggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="bg-white dark:bg-[#1A202C] border-b border-cloudcostx-gray-200 dark:border-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-cloudcostx-blue font-bold text-xl mr-8">CloudCostX</div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent text-cloudcostx-blue dark:text-white"
                  )}
                  href="/"
                >
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent text-cloudcostx-gray-400 hover:text-cloudcostx-blue dark:hover:text-white"
                  )}
                  href="/analise"
                >
                  Análise
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent text-cloudcostx-gray-400 hover:text-cloudcostx-blue dark:hover:text-white"
                  )}
                  href="/alocacao"
                >
                  Alocação
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent text-cloudcostx-gray-400 hover:text-cloudcostx-blue dark:hover:text-white"
                  )}
                  href="/recomendacoes"
                >
                  Recomendações
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(), 
                    "bg-transparent text-cloudcostx-gray-400 hover:text-cloudcostx-blue dark:hover:text-white"
                  )}
                  href="/integracoes"
                >
                  Integrações
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2">
          <DarkModeToggle />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-cloudcostx-red rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-[#1A202C] dark:text-white dark:border-gray-700">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem className="dark:hover:bg-gray-700">Perfil</DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-gray-700">Configurações</DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-gray-700">Suporte</DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem className="dark:hover:bg-gray-700">Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
