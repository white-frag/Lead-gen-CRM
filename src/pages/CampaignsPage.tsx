import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Progress } from '../components/ui/progress';
import { Plus, Target, TrendingUp, Users, Calendar } from 'lucide-react';
import { mockCampaigns } from '../data/mockData';

export const CampaignsPage: React.FC = () => {
  const [campaigns] = useState(mockCampaigns);

  const totalStats = {
    totalLeads: campaigns.reduce((sum, camp) => sum + camp.leadsCount, 0),
    avgResponseRate: campaigns.reduce((sum, camp) => sum + camp.responseRate, 0) / campaigns.length,
    avgConversionRate: campaigns.reduce((sum, camp) => sum + camp.conversionRate, 0) / campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length
  };

  return (
    <div className="flex-1 overflow-auto w-full">
      <Header />
      
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Campaign Management</h1>
            <p className="text-gray-600">Create and manage your outreach campaigns</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalStats.totalLeads}</p>
                </div>
                <div className="p-2 lg:p-3 bg-blue-50 rounded-full">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response Rate</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalStats.avgResponseRate.toFixed(1)}%</p>
                </div>
                <div className="p-2 lg:p-3 bg-green-50 rounded-full">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Conversion Rate</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalStats.avgConversionRate.toFixed(1)}%</p>
                </div>
                <div className="p-2 lg:p-3 bg-purple-50 rounded-full">
                  <Target className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                  <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalStats.activeCampaigns}</p>
                </div>
                <div className="p-2 lg:p-3 bg-orange-50 rounded-full">
                  <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns List */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <StatusBadge status={campaign.status} />
                </div>
                <p className="text-sm text-gray-600">{campaign.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Campaign Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{campaign.responseRate}% response rate</span>
                    </div>
                    <Progress value={campaign.responseRate} className="h-2" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{campaign.leadsCount}</p>
                      <p className="text-sm text-gray-600">Leads</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{campaign.responseRate}%</p>
                      <p className="text-sm text-gray-600">Response</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{campaign.conversionRate}%</p>
                      <p className="text-sm text-gray-600">Conversion</p>
                    </div>
                  </div>

                  {/* Campaign Details */}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Duration</span>
                      <span className="text-sm font-medium">
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Created by</span>
                      <span className="text-sm font-medium">{campaign.createdBy}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Assigned SDRs</span>
                      <div className="flex gap-1">
                        {campaign.assignedSDRs.map((sdr, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {sdr}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Campaign
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};