import React, { useState } from "react";
import { AIHeroSection } from "./dashboard/AIHeroSection";
import { FinancialHealthCard } from "./dashboard/FinancialHealthCard";
import { PreApprovedOffers } from "./dashboard/PreApprovedOffers";
import { GoalJourneys } from "./dashboard/GoalJourneys";
import { ProductMarketplace } from "./dashboard/ProductMarketplace";
import { Sidebar } from "./Sidebar";

interface DashboardProps {
  onLogout: () => void;
  onNavigate?: (page: 'dashboard' | 'orders' | 'agent') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, onNavigate }) => {
  const [chatExpanded, setChatExpanded] = useState(false);

  // Mock user data - in real app, this would come from API
  const userData = {
    name: "Rahul Sharma",
    company: "Tech Corp India",
    employeeId: "EMP12345",
    salary: 850000,
    tenure: 3.5, // years
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <Sidebar 
        user={userData} 
        onLogout={onLogout} 
        currentPage="dashboard"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* AI Hero Section */}
            <AIHeroSection 
              userName={userData.name}
              onOpenChat={() => setChatExpanded(true)}
              onNavigate={onNavigate}
            />

            {/* Financial Health Score */}
            <FinancialHealthCard 
              score={78}
              salary={userData.salary}
              tenure={userData.tenure}
            />

            {/* Pre-approved Offers */}
            <section>
              <PreApprovedOffers />
            </section>

            {/* Goal-based Journeys */}
            <section>
              <GoalJourneys />
            </section>

            {/* Product Marketplace */}
            <section>
              <ProductMarketplace />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};