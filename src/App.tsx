import React, { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Orders } from "./components/Orders";
import { HR } from "./components/HR";
import { CRM } from "./components/CRM";
import { Agent } from "./components/Agent";
import { Links } from "./components/Links";
import { RoleProvider, useRole } from "./contexts/RoleContext";

function AppContent() {
  const { currentRole } = useRole();
  
  // Persist authentication in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.slice(1);
    // Map hash to appropriate page based on role
    if (hash && !['hr', 'crm', 'links', 'link'].includes(hash)) {
      return hash;
    }
    // Get default page based on role
    if (currentRole === 'hr') return 'overview';
    if (currentRole === 'crm') return 'dashboard';
    // Employee role default
    const savedPage = localStorage.getItem('currentPage');
    return savedPage || 'dashboard';
  });

  const [currentHash, setCurrentHash] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentHash(hash);
      if (currentRole === 'employee') {
        if (['dashboard', 'orders', 'agent'].includes(hash)) {
          setCurrentPage(hash);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRole]);

  // Update page when role changes
  useEffect(() => {
    if (currentRole === 'hr') {
      setCurrentPage('overview');
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else if (currentRole === 'crm') {
      setCurrentPage('dashboard');
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else if (currentRole === 'employee') {
      const savedPage = localStorage.getItem('currentPage');
      setCurrentPage(savedPage || 'dashboard');
    }
  }, [currentRole]);

  // Persist currentPage for employee role
  useEffect(() => {
    if (currentRole === 'employee') {
      localStorage.setItem('currentPage', currentPage);
    }
  }, [currentPage, currentRole]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setCurrentPage('dashboard');
    window.location.hash = 'dashboard';
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    if (currentRole === 'employee') {
      setCurrentPage('dashboard');
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (currentRole === 'employee') {
      window.location.hash = page;
    }
  };

  // Public Links page (accessible via #links or #link)
  if (currentHash === 'links' || currentHash === 'link') {
    return <Links />;
  }

  // Employee Interface - requires login
  if (currentRole === 'employee' && !isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Render based on current role
  if (currentRole === 'hr') {
    return <HR onLogout={handleLogout} />;
  }

  if (currentRole === 'crm') {
    return <CRM onLogout={handleLogout} />;
  }

  // Employee role pages
  if (currentPage === 'dashboard') {
    return <Dashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
  } else if (currentPage === 'orders') {
    return <Orders onLogout={handleLogout} onNavigate={handleNavigate} />;
  } else if (currentPage === 'agent') {
    return <Agent onLogout={handleLogout} onNavigate={handleNavigate} />;
  }

  return <Dashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
}

export function App() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}


