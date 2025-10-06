import React, { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Orders } from "./components/Orders";
import { HR } from "./components/HR";
import { CRM } from "./components/CRM";
import { Agent } from "./components/Agent";
import { Links } from "./components/Links";

export function App() {
  // Persist authentication in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'orders' | 'agent' | 'hr' | 'crm' | 'links'>(() => {
    const hash = window.location.hash.slice(1);
    if (hash === 'hr') return 'hr';
    if (hash === 'crm') return 'crm';
    if (hash === 'links' || hash === 'link') return 'links';
    if (hash === 'orders') return 'orders';
    if (hash === 'agent') return 'agent';
    if (hash === 'dashboard') return 'dashboard';
    // Only read from localStorage for employee pages (dashboard/orders/agent), never 'hr', 'crm', or 'links'
    const savedPage = localStorage.getItem('currentPage') as 'dashboard' | 'orders' | 'agent' | 'hr' | 'crm' | 'links';
    return (savedPage === 'dashboard' || savedPage === 'orders' || savedPage === 'agent') ? savedPage : 'dashboard';
  });

  // Handle hash changes for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'hr') {
        setCurrentPage('hr');
        // Auto-authenticate for HR portal (separate role in real app)
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
      } else if (hash === 'crm') {
        setCurrentPage('crm');
        // Auto-authenticate for CRM portal (separate role in real app)
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
      } else if (hash === 'links' || hash === 'link') {
        setCurrentPage('links');
      } else if (hash === 'orders') {
        setCurrentPage('orders');
      } else if (hash === 'agent') {
        setCurrentPage('agent');
      } else if (hash === 'dashboard' || hash === '') {
        setCurrentPage('dashboard');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check hash on initial load
    const initialHash = window.location.hash.slice(1);
    if (initialHash === 'hr') {
      setCurrentPage('hr');
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else if (initialHash === 'crm') {
      setCurrentPage('crm');
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else if (initialHash === 'links' || initialHash === 'link') {
      setCurrentPage('links');
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist currentPage (but not 'hr', 'crm', or 'links' - they're always accessed via their hash)
  useEffect(() => {
    if (currentPage !== 'hr' && currentPage !== 'crm' && currentPage !== 'links') {
      localStorage.setItem('currentPage', currentPage);
    }
  }, [currentPage]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setCurrentPage('dashboard');
    window.location.hash = 'dashboard';
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setCurrentPage('dashboard');
    window.location.hash = '';
  };

  const handleNavigate = (page: 'dashboard' | 'orders' | 'agent') => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  // Links page - accessible via #links or #link (public navigation page)
  if (currentPage === 'links') {
    return <Links />;
  }

  // HR Portal - accessible via #hr (separate role-based interface)
  if (currentPage === 'hr') {
    return <HR />;
  }

  // CRM Portal - accessible via #crm (separate role-based interface for Relationship Managers)
  if (currentPage === 'crm') {
    return <CRM />;
  }

  // Employee Interface - requires login
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (currentPage === 'dashboard') {
    return <Dashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
  } else if (currentPage === 'orders') {
    return <Orders onLogout={handleLogout} onNavigate={handleNavigate} />;
  } else if (currentPage === 'agent') {
    return <Agent onLogout={handleLogout} onNavigate={handleNavigate} />;
  }

  return <Dashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
}


