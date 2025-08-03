import React from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, Calendar, Target, Phone, Mail, UserCheck, Activity } from 'lucide-react';
import { mockKPIs, mockChartData } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const kpis = [
    {
      title: 'Leads Contacted',
      value: mockKPIs.leadsContacted,
      change: '+12%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Conversion Rate',
      value: `${mockKPIs.conversionRate}%`,
      change: '+3.2%',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Meetings Booked',
      value: mockKPIs.meetingsBooked,
      change: '+8%',
      changeType: 'positive',
      icon: Calendar
    },
    {
      title: 'Active Campaigns',
      value: mockKPIs.activeCampaigns,
      change: 'Stable',
      changeType: 'neutral',
      icon: Target
    }
  ];

  const todayTasks = [
    { id: 1, title: 'Call TechCorp Solutions', type: 'call', time: '10:00 AM', priority: 'high' },
    { id: 2, title: 'Follow up with Digital Innovations', type: 'email', time: '2:00 PM', priority: 'medium' },
    { id: 3, title: 'Demo for FinanceFlow', type: 'meeting', time: '4:00 PM', priority: 'high' },
  ];

  const recentActivities = [
    { id: 1, action: 'Lead qualified', lead: 'Sarah Johnson - TechCorp', time: '2 hours ago', type: 'positive' },
    { id: 2, action: 'Email sent', lead: 'Mike Rodriguez - Digital Innovations', time: '4 hours ago', type: 'neutral' },
    { id: 3, action: 'Call completed', lead: 'David Kim - FinanceFlow', time: '6 hours ago', type: 'positive' },
  ];

  return (
    <div className="flex-1 overflow-auto w-full">
      <Header />
      
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Welcome back, Alex!</h1>
            <p className="text-gray-600">Here's what's happening with your leads today.</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {kpis.map((kpi, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{kpi.value}</p>
                    <Badge 
                      variant={kpi.changeType === 'positive' ? 'default' : 'secondary'}
                      className="mt-2"
                    >
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className="p-2 lg:p-3 bg-blue-50 rounded-full">
                    <kpi.icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Outreach vs Response</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="min-h-[250px]">
                <LineChart data={mockChartData.outreachData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="outreach" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="responses" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="min-h-[250px]">
                <BarChart data={mockChartData.conversionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#3B82F6" />
                  <Bar dataKey="qualified" fill="#10B981" />
                  <Bar dataKey="closed" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks and Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {task.type === 'call' && <Phone className="w-4 h-4 text-blue-600" />}
                      {task.type === 'email' && <Mail className="w-4 h-4 text-blue-600" />}
                      {task.type === 'meeting' && <UserCheck className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{task.title}</p>
                      <p className="text-sm text-gray-600">{task.time}</p>
                    </div>
                    <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'} className="shrink-0">
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      activity.type === 'positive' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{activity.action}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.lead}</p>
                    </div>
                    <span className="text-xs text-gray-500 shrink-0">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};