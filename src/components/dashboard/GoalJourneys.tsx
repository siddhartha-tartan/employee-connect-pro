import React from "react";
import { Button } from "@/components/ui/button";
import { Car, Globe, Home, GraduationCap, PiggyBank, Lightbulb } from "lucide-react";

export const GoalJourneys: React.FC = () => {
  const activeGoals = [
    {
      id: 1,
      icon: Car,
      title: 'Buy a Car',
      target: '₹8L',
      current: '₹2.3L',
      progress: 29,
      timeline: '14 months',
      status: 'On track',
      statusColor: 'text-green-600',
      recommendations: [
        { type: 'Auto Loan', value: '₹5.7L pre-approved' },
        { type: 'RD Account', value: 'Save ₹15k/month' }
      ]
    },
    {
      id: 2,
      icon: Globe,
      title: 'Europe Trip',
      target: '₹3.5L',
      current: '₹1.8L',
      progress: 51,
      timeline: '8 months',
      status: 'Ahead of schedule',
      statusColor: 'text-blue-600',
      recommendations: [
        { type: 'Travel Card', value: 'Zero forex fees' },
        { type: 'Travel Insurance', value: '₹999 only' }
      ]
    }
  ];

  const suggestedGoals = [
    { icon: Home, title: 'Buy a Home', timeline: '3-5 years' },
    { icon: GraduationCap, title: 'Child Education', timeline: '10+ years' },
    { icon: PiggyBank, title: 'Retirement Planning', timeline: '20+ years' },
    { icon: Home, title: 'Wedding', timeline: '1-2 years' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Financial Journeys</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">AI-powered goal planning & tracking</p>
        </div>
      </div>

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {activeGoals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <goal.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{goal.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{goal.timeline} remaining</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold ${goal.statusColor}`}>
                  {goal.status}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {goal.current} / {goal.target}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{goal.progress}% complete</p>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-2 inline-flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5" /> AI Recommendations
                </p>
                <div className="space-y-2">
                  {goal.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start text-xs">
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 dark:text-white">{rec.type}:</span>
                        <span className="text-gray-600 dark:text-gray-400"> {rec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 text-sm">
                  View Plan
                </Button>
                <Button className="flex-1 text-sm">
                  Add Funds
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Start New Journey */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Start a New Financial Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Let AI help you plan and achieve your goals
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {suggestedGoals.map((goal, idx) => (
            <button
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 text-left hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-2">
                <goal.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{goal.title}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{goal.timeline}</p>
            </button>
          ))}
        </div>

        <Button className="w-full md:w-auto">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Custom Goal
        </Button>
      </div>
    </div>
  );
};
