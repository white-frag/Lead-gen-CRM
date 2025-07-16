export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost';
  stage: 'prospecting' | 'discovery' | 'demo' | 'negotiation' | 'closed';
  industry: string;
  source: 'linkedin' | 'website' | 'referral' | 'cold-email' | 'event';
  assignedSDR: string;
  score: number;
  notes: Note[];
  interactions: Interaction[];
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

export interface Interaction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'demo';
  description: string;
  timestamp: string;
  outcome?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  leadsCount: number;
  responseRate: number;
  conversionRate: number;
  assignedSDRs: string[];
  createdBy: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
  tags: string[];
  openRate: number;
  responseRate: number;
  createdBy: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'call' | 'email' | 'follow-up' | 'demo' | 'meeting';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  leadId: string;
  assignedTo: string;
  completed: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'sdr' | 'marketing' | 'manager';
  avatar: string;
}

export interface KPI {
  leadsContacted: number;
  conversionRate: number;
  meetingsBooked: number;
  activeCampaigns: number;
}