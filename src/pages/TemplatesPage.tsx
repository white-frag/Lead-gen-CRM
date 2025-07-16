import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Plus, Edit, Copy, Trash2, Mail, TrendingUp, Eye } from 'lucide-react';
import { mockEmailTemplates } from '../data/mockData';

export const TemplatesPage: React.FC = () => {
  const [templates] = useState(mockEmailTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const replaceVariables = (content: string, variables: Record<string, string>) => {
    let result = content;
    Object.entries(variables).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return result;
  };

  const previewVariables = {
    FirstName: 'John',
    Company: 'TechCorp Solutions',
    SenderName: 'Alex Chen'
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
            <p className="text-gray-600">Manage your email templates and track performance</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Template Subject */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Subject</p>
                    <p className="text-sm text-gray-900 font-medium">{template.subject}</p>
                  </div>

                  {/* Template Preview */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Preview</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {replaceVariables(template.content, previewVariables)}
                      </p>
                    </div>
                  </div>

                  {/* Variables */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Variables</p>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((variable, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {`{{${variable}}}`}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{template.openRate}%</p>
                      <p className="text-xs text-gray-600">Open Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{template.responseRate}%</p>
                      <p className="text-xs text-gray-600">Response Rate</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <Card className="fixed inset-4 z-50 bg-white shadow-xl rounded-lg overflow-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Template Details</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedTemplate(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {(() => {
                const template = templates.find(t => t.id === selectedTemplate);
                if (!template) return null;

                return (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Template Name
                      </label>
                      <Input value={template.name} readOnly />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject Line
                      </label>
                      <Input value={template.subject} readOnly />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Content
                      </label>
                      <Textarea 
                        value={template.content} 
                        rows={10} 
                        readOnly 
                        className="font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview with Sample Data
                      </label>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium mb-2">
                          Subject: {replaceVariables(template.subject, previewVariables)}
                        </p>
                        <div className="whitespace-pre-wrap text-sm">
                          {replaceVariables(template.content, previewVariables)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Performance Metrics
                        </label>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">Open Rate: {template.openRate}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm">Response Rate: {template.responseRate}%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Template Info
                        </label>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm mb-1">Created by: {template.createdBy}</p>
                          <p className="text-sm">
                            Last updated: {new Date(template.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};