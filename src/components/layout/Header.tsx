
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Header() {
  return (
    <header className="bg-white border-b border-cloudcostx-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-cloudcostx-blue font-bold text-xl mr-4">CloudCostX</div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li className="font-medium text-cloudcostx-blue">Dashboard</li>
              <li className="text-cloudcostx-gray-400 hover:text-cloudcostx-blue">Análise</li>
              <li className="text-cloudcostx-gray-400 hover:text-cloudcostx-blue">Alocação</li>
              <li className="text-cloudcostx-gray-400 hover:text-cloudcostx-blue">Recomendações</li>
              <li className="text-cloudcostx-gray-400 hover:text-cloudcostx-blue">Integrações</li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <Select defaultValue="lastMonth">
              <SelectTrigger className="w-48 border-cloudcostx-gray-200">
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastMonth">Último mês</SelectItem>
                <SelectItem value="lastQuarter">Último trimestre</SelectItem>
                <SelectItem value="lastYear">Último ano</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
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
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Suporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
