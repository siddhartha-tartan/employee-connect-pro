import React from "react";
import { Building2, Home, TrendingUp, Wallet, Zap } from "lucide-react";

interface AIHeroSectionProps {
  userName: string;
  onOpenChat: () => void;
  onNavigate?: (page: 'dashboard' | 'orders' | 'agent') => void;
}

export const AIHeroSection: React.FC<AIHeroSectionProps> = ({ userName, onOpenChat, onNavigate }) => {
  const quickActions = [
    { 
      icon: Building2, 
      label: 'Open Bank Account', 
      description: 'Digital account in 5 minutes',
      gradient: 'from-blue-500 to-indigo-600',
      navigateToAgent: true
    },
    { 
      icon: Home, 
      label: 'Home Loan', 
      description: 'Pre-approved up to ₹50L',
      gradient: 'from-purple-500 to-pink-500',
      navigateToAgent: false
    },
    { 
      icon: TrendingUp, 
      label: 'Tax Optimization', 
      description: 'Save up to ₹1.5L this year',
      gradient: 'from-orange-500 to-red-500',
      navigateToAgent: false
    },
    { 
      icon: Wallet, 
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
              Hello, {userName.split(' ')[0]}!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Open your HDFC Bank account digitally in just 5 minutes with FinAgent! Explore personalized products, track your goals, and make smarter financial decisions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {quickActions.map((action, idx) => {
            const IconComponent = action.icon;
            return (
              <button
                key={idx}
                onClick={() => action.navigateToAgent ? onNavigate?.('agent') : onOpenChat()}
                className="group relative bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-left transition-all hover:scale-105 shadow-sm hover:shadow-md"
              >
                {idx === 0 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>5 mins</span>
                  </div>
                )}
                <div className="mb-2">
                  <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{action.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{action.description}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
