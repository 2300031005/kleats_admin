import React, { useState } from 'react';

// Page Imports
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

// --- Main App Component ---
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [error, setError] = useState('');

  // Hardcoded credentials
  const VITE_APP_USER_EMAIL = 'adda@kleats.in';
  const VITE_APP_USER_PASSWORD = '1234';

  const handleLogin = (email, password) => {
    if (email === VITE_APP_USER_EMAIL && password === VITE_APP_USER_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    // --- THE FIX IS HERE ---
    // The props object now correctly uses 'handleLogout' which is defined in this component's scope.
    const props = { onLogout: handleLogout, navigateTo, currentPage };
    
    switch (currentPage) {
      case 'dashboard': return <DashboardPage {...props} />;
      case 'menu': return <MenuPage {...props} />;
      case 'orders': return <OrdersPage {...props} />;
      case 'reports': return <ReportsPage {...props} />;
      case 'settings': return <SettingsPage {...props} />;
      default: return <DashboardPage {...props} />;
    }
  };

  return (
    <>
      {isLoggedIn ? renderPage() : <LoginPage onLogin={handleLogin} error={error} />}
    </>
  );
}
