import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, TrendingUp, Users, Target, Activity } from 'lucide-react';
import { mockChartData, mockLeads, mockCampaigns } from '../data/mockData';

export const ReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Mock report data
  const reportData = {
    overview: {
      totalLeads: mockLeads.length,
      qualifiedLeads: mockLeads.filter(l => l.status === 'qualified').length,
      conversionRate: 14.2,
      avgResponseTime: '2.3 hours',
      activeCampaigns: mockCampaigns.filter(c => c.status === 'active').length,
      topPerformer: 'Alex Chen'
    },
    performance: mockChartData.outreachData,
    conversion: mockChartData.conversionData,
    sources: [
      { name: 'LinkedIn', value: 35, color: '#0077B5' },
      { name: 'Cold Email', value: 28, color: '#DC2626' },
      { name: 'Referral', value: 22, color: '#10B981' },
      { name: 'Website', value: 10, color: '#F59E0B' },
      { name: 'Event', value: 5, color: '#8B5CF6' }
    ]
  };

  const generateReport = () => {
    // Mock report generation
    const reportData = {
      title: 'Monthly Performance Report',
      period: selectedPeriod,
      generatedAt: new Date().toISOString(),
      metrics: reportData.overview
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Track performance and generate insights</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={generateReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Report Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalLeads}</p>
                  <Badge variant="secondary" className="mt-1">+12% vs last month</Badge>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Qualified Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{reportData.overview.qualifiedLeads}</p>
                  <Badge variant="secondary" className="mt-1">+8% vs last month</Badge>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{reportData.overview.conversionRate}%</p>
                  <Badge variant="secondary" className="mt-1">+2.1% vs last month</Badge>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">{reportData.overview.avgResponseTime}</p>
                  <Badge variant="secondary" className="mt-1">-15% vs last month</Badge>
                </div>
                <div className="p-3 bg-orange-50 rounded-full">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reportData.performance}>
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
              <CardTitle>Lead Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportData.sources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {reportData.sources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={reportData.conversion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="#3B82F6" name="Total Leads" />
                <Bar dataKey="qualified" fill="#10B981" name="Qualified" />
                <Bar dataKey="closed" fill="#F59E0B" name="Closed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Report Table */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">SDR</th>
                    <th className="text-left p-3">Leads Contacted</th>
                    <th className="text-left p-3">Response Rate</th>
                    <th className="text-left p-3">Qualified</th>
                    <th className="text-left p-3">Closed</th>
                    <th className="text-left p-3">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Alex Chen</td>
                    <td className="p-3">89</td>
                    <td className="p-3">18.5%</td>
                    <td className="p-3">12</td>
                    <td className="p-3">5</td>
                    <td className="p-3">
                      <Badge variant="default">Excellent</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Jessica Liu</td>
                    <td className="p-3">76</td>
                    <td className="p-3">15.2%</td>
                    <td className="p-3">9</td>
                    <td className="p-3">3</td>
                    <td className="p-3">
                      <Badge variant="secondary">Good</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Team Average</td>
                    <td className="p-3">82.5</td>
                    <td className="p-3">16.9%</td>
                    <td className="p-3">10.5</td>
                    <td className="p-3">4</td>
                    <td className="p-3">
                      <Badge variant="outline">Baseline</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};