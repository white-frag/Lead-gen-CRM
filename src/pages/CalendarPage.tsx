import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Calendar, Clock, Plus, Phone, Mail, Users, Video } from 'lucide-react';
import { mockTasks } from '../data/mockData';

export const CalendarPage: React.FC = () => {
  const [tasks] = useState(mockTasks);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
  });

  const upcomingTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    return taskDate > today;
  });

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'demo': return <Video className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  // Mock calendar events
  const mockEvents = [
    { id: 1, title: 'Demo with TechCorp', time: '10:00 AM', type: 'demo', priority: 'high' },
    { id: 2, title: 'Follow-up call', time: '2:00 PM', type: 'call', priority: 'medium' },
    { id: 3, title: 'Team standup', time: '4:00 PM', type: 'meeting', priority: 'low' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <Header />
      
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calendar & Tasks</h1>
            <p className="text-gray-600">Manage your schedule and outreach tasks</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Task
          </Button>
        </div>

        {/* Today's Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{todayTasks.length}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingTasks.length}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.filter(t => t.completed).length}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-full">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Calendar Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  {/* Calendar Days */}
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i - 5);
                    const isToday = date.toDateString() === new Date().toDateString();
                    const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                    
                    return (
                      <div 
                        key={i} 
                        className={`p-2 text-center text-sm border rounded cursor-pointer hover:bg-gray-50 ${
                          isToday ? 'bg-blue-100 text-blue-700 font-semibold' : 
                          isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {date.getDate()}
                        {isToday && (
                          <div className="flex flex-col gap-1 mt-1">
                            {todayTasks.slice(0, 2).map(task => (
                              <div key={task.id} className="w-full h-1 bg-blue-500 rounded"></div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {getTaskIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-gray-600">{event.time}</p>
                    </div>
                    <StatusBadge status={event.priority} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Management */}
        <Card>
          <CardHeader>
            <CardTitle>Task Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Task Filters */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">All Tasks</Button>
                <Button variant="outline" size="sm">Today</Button>
                <Button variant="outline" size="sm">Upcoming</Button>
                <Button variant="outline" size="sm">Overdue</Button>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="p-2 bg-blue-50 rounded-full">
                      {getTaskIcon(task.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <StatusBadge status={task.priority} />
                      </div>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          Assigned to: {task.assignedTo}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Complete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};