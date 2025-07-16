import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Lamp as Campaign, Mail, Calendar, BarChart3, Building2, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Campaigns', href: '/campaigns', icon: Campaign },
  { name: 'Email Templates', href: '/templates', icon: Mail },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">TechStart</h1>
          <p className="text-sm text-gray-500">LeadGen CRM</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <img 
            src={user?.avatar} 
            alt={user?.name} 
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};