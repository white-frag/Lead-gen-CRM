import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ScoreIndicator } from '../components/ui/ScoreIndicator';
import { Plus, Search, Phone, Mail, Calendar, Eye } from 'lucide-react';
import { mockLeads } from '../data/mockData';
import { Lead } from '../types';

export const LeadsPage: React.FC = () => {
  const [leads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || lead.industry === industryFilter;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });



  return (
    <div className="flex-1 overflow-auto">
      <Header />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
            <p className="text-gray-600">Manage and track your sales leads</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">
            Showing {filteredLeads.length} of {leads.length} leads
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary">New: {leads.filter(l => l.status === 'new').length}</Badge>
            <Badge variant="secondary">Qualified: {leads.filter(l => l.status === 'qualified').length}</Badge>
            <Badge variant="secondary">Proposals: {leads.filter(l => l.status === 'proposal').length}</Badge>
          </div>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Company</th>
                    <th className="text-left p-3">Contact</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Industry</th>
                    <th className="text-left p-3">Score</th>
                    <th className="text-left p-3">SDR</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-gray-900">{lead.companyName}</p>
                          <p className="text-sm text-gray-500">{lead.source}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-gray-900">{lead.contactName}</p>
                          <p className="text-sm text-gray-500">{lead.email}</p>
                          <p className="text-sm text-gray-500">{lead.phone}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{lead.industry}</Badge>
                      </td>
                      <td className="p-3">
                        <ScoreIndicator score={lead.score} size="sm" showLabel={false} />
                      </td>
                      <td className="p-3">
                        <p className="text-sm font-medium">{lead.assignedSDR}</p>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};