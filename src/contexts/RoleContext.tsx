import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'employee' | 'hr' | 'crm';

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    // Check URL hash first
    const hash = window.location.hash.slice(1);
    if (hash === 'hr') return 'hr';
    if (hash === 'crm') return 'crm';
    
    // Check localStorage
    const savedRole = localStorage.getItem('currentRole') as UserRole;
    return savedRole || 'employee';
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('currentRole', currentRole);
    
    // Update URL hash for non-employee roles
    if (currentRole === 'hr') {
      window.location.hash = 'hr';
    } else if (currentRole === 'crm') {
      window.location.hash = 'crm';
    } else {
      window.location.hash = 'dashboard';
    }
  }, [currentRole]);

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
  };

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

