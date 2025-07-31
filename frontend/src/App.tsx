import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import TimesheetList from './components/TimesheetList';
import AdminEmployees from './components/AdminEmployees';
import AdminTimesheets from './components/AdminTimesheets';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <Login onToggleMode={() => setIsLogin(false)} />
  ) : (
    <Register onToggleMode={() => setIsLogin(true)} />
  );
};

const MainApp: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return <AuthScreen />;
  }

  const renderContent = () => {
    if (user.role === 'admin') {
      switch (activeTab) {
        case 'dashboard':
          return <AdminDashboard onTabChange={setActiveTab} />;
        case 'timesheets':
          return <AdminTimesheets />;
        case 'employees':
          return <AdminEmployees />;
        default:
          return <AdminDashboard onTabChange={setActiveTab} />;
      }
    } else if (user.role === 'employee') {
      switch (activeTab) {
        case 'dashboard':
          return <Dashboard />;
        case 'timesheets':
          return <TimesheetList />;
        default:
          return <Dashboard />;
      }
    } else {
      return <div className="p-6 text-red-500">Invalid role</div>;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} role={user.role}>
      {renderContent()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
