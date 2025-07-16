import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { LeadsPage } from './pages/LeadsPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { CalendarPage } from './pages/CalendarPage';
import { ReportsPage } from './pages/ReportsPage';
import { Sidebar } from './components/layout/Sidebar';
import { Toaster } from './components/ui/sonner';
import './App.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <DashboardPage />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/leads" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <LeadsPage />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/campaigns" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <CampaignsPage />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/templates" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <TemplatesPage />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/calendar" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <CalendarPage />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ReportsPage />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;