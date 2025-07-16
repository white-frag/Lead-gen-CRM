import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search leads, companies, or campaigns..."
              className="pl-10 pr-4 py-2 w-96"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">{user?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};