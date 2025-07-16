import { Lead, Campaign, EmailTemplate, Task, User, KPI } from '../types';

export const mockLeads: Lead[] = [
  {
    id: '1',
    companyName: 'TechCorp Solutions',
    contactName: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    status: 'qualified',
    stage: 'discovery',
    industry: 'Software',
    source: 'linkedin',
    assignedSDR: 'Alex Chen',
    score: 85,
    notes: [
      { id: '1', content: 'Interested in enterprise solution', author: 'Alex Chen', timestamp: '2024-01-15T10:30:00Z' },
      { id: '2', content: 'Budget approved for Q2', author: 'Alex Chen', timestamp: '2024-01-16T14:15:00Z' }
    ],
    interactions: [
      { id: '1', type: 'call', description: 'Initial discovery call', timestamp: '2024-01-15T09:00:00Z', outcome: 'Positive' },
      { id: '2', type: 'email', description: 'Sent product demo link', timestamp: '2024-01-16T11:30:00Z' }
    ],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-16T14:15:00Z'
  },
  {
    id: '2',
    companyName: 'Digital Innovations',
    contactName: 'Mike Rodriguez',
    email: 'mike.r@diginnovations.com',
    phone: '+1 (555) 987-6543',
    status: 'contacted',
    stage: 'prospecting',
    industry: 'Marketing',
    source: 'cold-email',
    assignedSDR: 'Jessica Liu',
    score: 65,
    notes: [
      { id: '3', content: 'Responded to cold email', author: 'Jessica Liu', timestamp: '2024-01-17T16:45:00Z' }
    ],
    interactions: [
      { id: '3', type: 'email', description: 'Initial outreach', timestamp: '2024-01-17T14:00:00Z', outcome: 'Replied' }
    ],
    createdAt: '2024-01-17T08:00:00Z',
    updatedAt: '2024-01-17T16:45:00Z'
  },
  {
    id: '3',
    companyName: 'FinanceFlow Inc',
    contactName: 'David Kim',
    email: 'david.kim@financeflow.com',
    phone: '+1 (555) 456-7890',
    status: 'proposal',
    stage: 'negotiation',
    industry: 'Finance',
    source: 'referral',
    assignedSDR: 'Alex Chen',
    score: 92,
    notes: [
      { id: '4', content: 'Ready for proposal review', author: 'Alex Chen', timestamp: '2024-01-18T12:00:00Z' }
    ],
    interactions: [
      { id: '4', type: 'meeting', description: 'Proposal presentation', timestamp: '2024-01-18T10:00:00Z', outcome: 'Interested' }
    ],
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-18T12:00:00Z'
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'AI SaaS Push - Q1 2024',
    description: 'Targeting AI and machine learning companies for our SaaS solution',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    leadsCount: 250,
    responseRate: 18.5,
    conversionRate: 12.3,
    assignedSDRs: ['Alex Chen', 'Jessica Liu'],
    createdBy: 'Sarah Manager'
  },
  {
    id: '2',
    name: 'FinTech Expansion',
    description: 'Expanding into financial technology sector',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    leadsCount: 180,
    responseRate: 22.1,
    conversionRate: 15.7,
    assignedSDRs: ['Alex Chen'],
    createdBy: 'Sarah Manager'
  }
];

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Cold Outreach - AI Companies',
    subject: 'Quick question about {{Company}}\'s AI initiatives',
    content: 'Hi {{FirstName}},\n\nI noticed {{Company}} is doing some interesting work in AI. I\'d love to share how we\'ve helped similar companies like yours increase efficiency by 40%.\n\nWould you be open to a brief 15-minute call this week?\n\nBest regards,\n{{SenderName}}',
    variables: ['FirstName', 'Company', 'SenderName'],
    tags: ['High Open Rate', 'AI Focus'],
    openRate: 34.2,
    responseRate: 8.7,
    createdBy: 'Alex Chen',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Follow-up Template',
    subject: 'Following up on our conversation',
    content: 'Hi {{FirstName}},\n\nI wanted to follow up on our conversation about {{Company}}\'s needs. I\'ve prepared a customized proposal that addresses the specific challenges we discussed.\n\nWhen would be a good time for a quick call to review it?\n\nBest,\n{{SenderName}}',
    variables: ['FirstName', 'Company', 'SenderName'],
    tags: ['Follow-up', 'Proposal'],
    openRate: 45.8,
    responseRate: 15.2,
    createdBy: 'Jessica Liu',
    updatedAt: '2024-01-16T14:30:00Z'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with TechCorp Solutions',
    description: 'Send proposal and schedule demo',
    type: 'follow-up',
    priority: 'high',
    dueDate: '2024-01-20T10:00:00Z',
    leadId: '1',
    assignedTo: 'Alex Chen',
    completed: false,
    createdAt: '2024-01-18T15:00:00Z'
  },
  {
    id: '2',
    title: 'Initial call with Digital Innovations',
    description: 'Discovery call to understand their needs',
    type: 'call',
    priority: 'medium',
    dueDate: '2024-01-21T14:00:00Z',
    leadId: '2',
    assignedTo: 'Jessica Liu',
    completed: false,
    createdAt: '2024-01-18T16:00:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex.chen@techstart.com',
    role: 'sdr',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Jessica Liu',
    email: 'jessica.liu@techstart.com',
    role: 'sdr',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Sarah Manager',
    email: 'sarah.manager@techstart.com',
    role: 'manager',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockKPIs: KPI = {
  leadsContacted: 147,
  conversionRate: 14.2,
  meetingsBooked: 23,
  activeCampaigns: 5
};

export const mockChartData = {
  outreachData: [
    { name: 'Jan 1', outreach: 45, responses: 8 },
    { name: 'Jan 2', outreach: 52, responses: 12 },
    { name: 'Jan 3', outreach: 38, responses: 6 },
    { name: 'Jan 4', outreach: 61, responses: 15 },
    { name: 'Jan 5', outreach: 49, responses: 11 },
    { name: 'Jan 6', outreach: 58, responses: 13 },
    { name: 'Jan 7', outreach: 43, responses: 9 }
  ],
  conversionData: [
    { name: 'Week 1', leads: 120, qualified: 18, closed: 3 },
    { name: 'Week 2', leads: 135, qualified: 22, closed: 5 },
    { name: 'Week 3', leads: 98, qualified: 15, closed: 2 },
    { name: 'Week 4', leads: 156, qualified: 28, closed: 7 }
  ]
};