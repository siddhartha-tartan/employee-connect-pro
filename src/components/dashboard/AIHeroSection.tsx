import React from "react";
import { Button } from "@/components/ui/button";

interface AIHeroSectionProps {
  userName: string;
  onOpenChat: () => void;
  onNavigate?: (page: 'dashboard' | 'orders' | 'agent') => void;
}

export const AIHeroSection: React.FC<AIHeroSectionProps> = ({ userName, onOpenChat, onNavigate }) => {
  const quickActions = [
    { 
      icon: '🏦', 
      label: 'Open Bank Account', 
      description: 'Digital account in 5 minutes',
      gradient: 'from-blue-500 to-indigo-600',
      navigateToAgent: true
    },
    { 
      icon: '🏠', 
      label: 'Home Loan', 
      description: 'Pre-approved up to ₹50L',
      gradient: 'from-purple-500 to-pink-500',
      navigateToAgent: false
    },
    { 
      icon: '📊', 
      label: 'Tax Optimization', 
      description: 'Save up to ₹1.5L this year',
      gradient: 'from-orange-500 to-red-500',
      navigateToAgent: false
    },
    { 
      icon: '💰', 
      label: 'Smart Investments', 
      description: 'Mutual funds & FDs',
      gradient: 'from-green-500 to-emerald-600',
      navigateToAgent: false
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 p-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-blue-500"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rotate-45 border-2 border-purple-500"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-blue-500/20"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
              Hello, {userName.split(' ')[0]}! 👋
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Open your HDFC Bank account digitally in just 5 minutes with FinAgent! Explore personalized products, track your goals, and make smarter financial decisions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => action.navigateToAgent ? onNavigate?.('agent') : onOpenChat()}
              className="group relative bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-left transition-all hover:scale-105 shadow-sm hover:shadow-md"
            >
              {idx === 0 && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                  ⚡ 5 mins
                </div>
              )}
              <div className="text-3xl mb-2">{action.icon}</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{action.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{action.description}</div>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <Button 
            onClick={() => onNavigate?.('agent')}
            className="font-semibold"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Open Account with FinAgent
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Or ask any financial question instantly →
          </p>
        </div>
      </div>
    </div>
  );
};
