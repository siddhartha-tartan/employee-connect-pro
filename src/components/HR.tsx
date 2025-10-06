import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const HR: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'benefits' | 'approvals'>('overview');
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncStep, setSyncStep] = useState<'provider' | 'credentials' | 'connecting' | 'success'>('provider');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [credentials, setCredentials] = useState({ apiKey: '', domain: '' });
  const [isFirstTime, setIsFirstTime] = useState(() => {
    return localStorage.getItem('hrms_synced') !== 'true';
  });

  // Show first-time sync modal on mount
  useEffect(() => {
    if (isFirstTime) {
      setShowSyncModal(true);
    }
  }, [isFirstTime]);

  // Mock HR data
  const stats = {
    totalEmployees: 1247,
    activeProducts: 3891,
    pendingApprovals: 23,
    avgFinScore: 76,
    monthlyDisbursals: '₹2.3Cr',
    adoptionRate: 68
  };

  const employees = [
    { id: 'EMP12345', name: 'Rahul Sharma', department: 'Engineering', salary: 850000, tenure: 3.5, score: 78, products: 3, status: 'active' },
    { id: 'EMP12346', name: 'Priya Mehta', department: 'Marketing', salary: 650000, tenure: 2.1, score: 72, products: 2, status: 'active' },
    { id: 'EMP12347', name: 'Amit Kumar', department: 'Sales', salary: 720000, tenure: 4.2, score: 81, products: 4, status: 'active' },
    { id: 'EMP12348', name: 'Sneha Patel', department: 'Engineering', salary: 920000, tenure: 5.0, score: 85, products: 5, status: 'active' },
    { id: 'EMP12349', name: 'Vikram Singh', department: 'Operations', salary: 580000, tenure: 1.8, score: 68, products: 1, status: 'active' },
    { id: 'EMP12350', name: 'Anita Desai', department: 'HR', salary: 700000, tenure: 3.0, score: 75, products: 3, status: 'active' },
  ];

  const benefits = [
    {
      id: 1,
      name: 'Pre-approved Personal Loans',
      description: 'Instant personal loans up to 20x monthly salary',
      category: 'Loans',
      enabled: true,
      eligibility: 'Min 6 months tenure',
      utilizationRate: 45,
      totalUsers: 562
    },
    {
      id: 2,
      name: 'Premium Credit Cards',
      description: 'Lifetime free credit cards with rewards',
      category: 'Cards',
      enabled: true,
      eligibility: 'All employees',
      utilizationRate: 68,
      totalUsers: 847
    },
    {
      id: 3,
      name: 'Group Health Insurance',
      description: 'Comprehensive health coverage for family',
      category: 'Insurance',
      enabled: true,
      eligibility: 'All employees',
      utilizationRate: 89,
      totalUsers: 1109
    },
    {
      id: 4,
      name: 'Tax Saving FD',
      description: 'Fixed deposits with tax benefits under 80C',
      category: 'Savings',
      enabled: true,
      eligibility: 'Min 3 months tenure',
      utilizationRate: 34,
      totalUsers: 424
    },
    {
      id: 5,
      name: 'Home Loan Benefits',
      description: 'Special interest rates for home loans',
      category: 'Loans',
      enabled: true,
      eligibility: 'Min 1 year tenure',
      utilizationRate: 12,
      totalUsers: 150
    },
    {
      id: 6,
      name: 'Travel Insurance',
      description: 'International and domestic travel cover',
      category: 'Insurance',
      enabled: false,
      eligibility: 'All employees',
      utilizationRate: 0,
      totalUsers: 0
    },
  ];

  const approvals = [
    {
      id: 1,
      empId: 'EMP12380',
      empName: 'Rajesh Gupta',
      productType: 'Personal Loan',
      amount: '₹10,00,000',
      appliedDate: '2 days ago',
      status: 'Pending HR Approval',
      urgency: 'high'
    },
    {
      id: 2,
      empId: 'EMP12391',
      empName: 'Kavita Sharma',
      productType: 'Home Loan',
      amount: '₹45,00,000',
      appliedDate: '5 days ago',
      status: 'Pending HR Approval',
      urgency: 'medium'
    },
    {
      id: 3,
      empId: 'EMP12402',
      empName: 'Sanjay Reddy',
      productType: 'Credit Card',
      amount: '₹5,00,000 limit',
      appliedDate: '1 day ago',
      status: 'Pending HR Approval',
      urgency: 'low'
    },
  ];

  const hrmsProviders = [
    { id: 'workday', name: 'Workday', icon: '💼', popular: true },
    { id: 'bamboohr', name: 'BambooHR', icon: '🎋', popular: true },
    { id: 'sap', name: 'SAP SuccessFactors', icon: '🏢', popular: true },
    { id: 'adp', name: 'ADP Workforce', icon: '📊', popular: false },
    { id: 'oracle', name: 'Oracle HCM', icon: '☁️', popular: false },
    { id: 'zoho', name: 'Zoho People', icon: '👥', popular: false },
  ];

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleContinueToCredentials = () => {
    if (selectedProvider) {
      setSyncStep('credentials');
    }
  };

  const handleConnect = async () => {
    setSyncStep('connecting');
    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 3000));
    setSyncStep('success');
    localStorage.setItem('hrms_synced', 'true');
    localStorage.setItem('hrms_provider', selectedProvider);
    setIsFirstTime(false);
    setTimeout(() => {
      setShowSyncModal(false);
      setSyncStep('provider');
      setSelectedProvider('');
      setCredentials({ apiKey: '', domain: '' });
    }, 2500);
  };

  const handleCloseModal = () => {
    setShowSyncModal(false);
    setSyncStep('provider');
    setSelectedProvider('');
    setCredentials({ apiKey: '', domain: '' });
  };

  const toggleBenefit = (benefitId: number) => {
    // Handle benefit toggle
    console.log('Toggle benefit:', benefitId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-gray-900 dark:to-gray-800">
      {/* HR Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--primary))] to-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">HR Portal</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tech Corp India</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {!isFirstTime && (
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  HRMS Connected
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={() => setShowSyncModal(true)}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Sync HRMS
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container with proper spacing */}
      <div className="min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-md border border-gray-200 dark:border-gray-700 inline-flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2.5 font-medium text-sm transition-all rounded-md ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`px-6 py-2.5 font-medium text-sm transition-all rounded-md ${
              activeTab === 'employees'
                ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Employees ({employees.length})
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-6 py-2.5 font-medium text-sm transition-all rounded-md ${
              activeTab === 'benefits'
                ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Benefits ({benefits.length})
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-6 py-2.5 font-medium text-sm transition-all rounded-md relative ${
              activeTab === 'approvals'
                ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Approvals
            {approvals.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {approvals.length}
              </span>
            )}
          </button>
        </div>

         {/* Overview Tab */}
         {activeTab === 'overview' && (
           <div className="space-y-6">
             {/* Key Metrics */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <Card className="p-5">
                 <div className="flex items-center justify-between mb-2">
                   <p className="text-sm text-gray-600 dark:text-gray-400">Total Employees</p>
                   <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                   </svg>
                 </div>
                 <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalEmployees.toLocaleString()}</p>
               </Card>

               <Card className="p-5">
                 <div className="flex items-center justify-between mb-2">
                   <p className="text-sm text-gray-600 dark:text-gray-400">Active Products</p>
                   <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                   </svg>
                 </div>
                 <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.activeProducts.toLocaleString()}</p>
               </Card>

               <Card className="p-5">
                 <div className="flex items-center justify-between mb-2">
                   <p className="text-sm text-gray-600 dark:text-gray-400">Pending Approvals</p>
                   <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                 </div>
                 <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pendingApprovals}</p>
                 {stats.pendingApprovals > 0 && (
                   <p className="text-xs text-orange-600 mt-1">Requires attention</p>
                 )}
               </Card>

               <Card className="p-5">
                 <div className="flex items-center justify-between mb-2">
                   <p className="text-sm text-gray-600 dark:text-gray-400">Avg Health Score</p>
                   <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                 </div>
                 <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgFinScore}<span className="text-lg text-gray-500">/100</span></p>
               </Card>
             </div>

             {/* Pending Actions */}
             {approvals.length > 0 && (
               <Card className="p-6">
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Approvals</h3>
                   <button 
                     onClick={() => setActiveTab('approvals')}
                     className="text-sm text-primary hover:underline"
                   >
                     View All ({approvals.length})
                   </button>
                 </div>
                 <div className="space-y-3">
                   {approvals.slice(0, 3).map((approval) => (
                     <div key={approval.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                       <div className="flex-1">
                         <p className="font-medium text-gray-900 dark:text-white">{approval.empName}</p>
                         <p className="text-sm text-gray-600 dark:text-gray-400">{approval.productType} • {approval.amount}</p>
                       </div>
                       <div className="flex space-x-2">
                         <Button size="sm" variant="outline">Review</Button>
                       </div>
                     </div>
                   ))}
                 </div>
               </Card>
             )}

             {/* Two Column Layout */}
             <div className="grid md:grid-cols-2 gap-6">
               {/* Quick Stats */}
               <Card className="p-6">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">This Month</h3>
                 <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600 dark:text-gray-400">Total Disbursals</span>
                     <span className="text-lg font-semibold text-gray-900 dark:text-white">{stats.monthlyDisbursals}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600 dark:text-gray-400">Benefit Adoption Rate</span>
                     <span className="text-lg font-semibold text-gray-900 dark:text-white">{stats.adoptionRate}%</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600 dark:text-gray-400">Active Benefits</span>
                     <span className="text-lg font-semibold text-gray-900 dark:text-white">{benefits.filter(b => b.enabled).length}/{benefits.length}</span>
                   </div>
                 </div>
               </Card>

               {/* Recent Activity */}
               <Card className="p-6">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                 <div className="space-y-3">
                   {[
                     { action: '15 new employees onboarded', time: '2h ago' },
                     { action: 'Home loan approved for Rajesh K.', time: '5h ago' },
                     { action: 'Group insurance plan renewed', time: '1d ago' },
                     { action: 'HRMS data synced successfully', time: '2d ago' },
                   ].map((activity, idx) => (
                     <div key={idx} className="flex items-start justify-between text-sm">
                       <span className="text-gray-900 dark:text-white">{activity.action}</span>
                       <span className="text-gray-500 text-xs whitespace-nowrap ml-2">{activity.time}</span>
                     </div>
                   ))}
                 </div>
               </Card>
             </div>

             {/* Quick Actions */}
             <Card className="p-6">
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 <Button 
                   variant="outline" 
                   onClick={() => setActiveTab('employees')}
                   className="h-auto py-4 flex-col"
                 >
                   <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                   </svg>
                   <span className="text-sm">Employees</span>
                 </Button>
                 <Button 
                   variant="outline" 
                   onClick={() => setActiveTab('benefits')}
                   className="h-auto py-4 flex-col"
                 >
                   <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                   </svg>
                   <span className="text-sm">Benefits</span>
                 </Button>
                 <Button 
                   variant="outline" 
                   onClick={() => setActiveTab('approvals')}
                   className="h-auto py-4 flex-col relative"
                 >
                   {approvals.length > 0 && (
                     <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                       {approvals.length}
                     </span>
                   )}
                   <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   <span className="text-sm">Approvals</span>
                 </Button>
                 <Button 
                   variant="outline" 
                   onClick={() => setShowSyncModal(true)}
                   className="h-auto py-4 flex-col"
                 >
                   <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                   </svg>
                   <span className="text-sm">Sync HRMS</span>
                 </Button>
               </div>
             </Card>
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === 'employees' && (
          <div className="space-y-6">
            {/* Search & Filter */}
            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search employees by name, ID, or department..."
                  className="flex-1"
                />
                <Button variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </Button>
                <Button>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Employee
                </Button>
              </div>
            </Card>

            {/* Employee Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tenure</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Fin. Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Products</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{emp.name}</p>
                            <p className="text-xs text-gray-500">{emp.id}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{emp.department}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">₹{(emp.salary / 100000).toFixed(1)}L</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{emp.tenure}y</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={emp.score >= 80 ? 'bg-green-100 text-green-700' : emp.score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}>
                            {emp.score}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{emp.products}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="outline" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Benefits</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage financial products and benefits for your employees</p>
              </div>
              <Button>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Benefit
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{benefit.name}</h3>
                        <Badge variant="secondary">{benefit.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{benefit.description}</p>
                      <p className="text-xs text-gray-500">Eligibility: {benefit.eligibility}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefit.enabled}
                        onChange={() => toggleBenefit(benefit.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {benefit.enabled && (
                    <>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600 dark:text-gray-400">Utilization Rate</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{benefit.utilizationRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${benefit.utilizationRate}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{benefit.totalUsers} employees using this benefit</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                        <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                      </div>
                    </>
                  )}

                  {!benefit.enabled && (
                    <p className="text-sm text-gray-500 italic">This benefit is currently disabled for all employees</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pending Approvals</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Review and approve employee financial product applications</p>
            </div>

            <div className="space-y-4">
              {approvals.map((approval) => (
                <Card key={approval.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-3xl">
                          {approval.productType === 'Personal Loan' ? '💰' :
                           approval.productType === 'Home Loan' ? '🏠' :
                           '💳'}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{approval.productType}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{approval.empName} ({approval.empId})</p>
                        </div>
                        <Badge className={
                          approval.urgency === 'high' ? 'bg-red-100 text-red-700' :
                          approval.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }>
                          {approval.urgency === 'high' ? 'High Priority' :
                           approval.urgency === 'medium' ? 'Medium Priority' :
                           'Low Priority'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{approval.amount}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Applied</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{approval.appliedDate}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{approval.status}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Approve
                        </Button>
                        <Button variant="outline" size="sm">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Reject
                        </Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* HRMS Sync Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl p-8 m-4 border-2 border-blue-200 dark:border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Step 1: Choose Provider */}
            {syncStep === 'provider' && (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[hsl(var(--primary))] to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {isFirstTime ? 'Welcome to HR Portal! 👋' : 'Connect Your HRMS'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isFirstTime 
                      ? 'Let\'s connect your HRMS to get started'
                      : 'Select your HRMS provider to sync employee data'}
                  </p>
                  <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
                      <span className="font-medium text-gray-900 dark:text-white">Provider</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">2</div>
                      <span>Credentials</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">3</div>
                      <span>Connect</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Popular Providers</h4>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {hrmsProviders.filter(p => p.popular).map((provider) => (
                      <button
                        key={provider.id}
                        onClick={() => handleProviderSelect(provider.id)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedProvider === provider.id
                            ? 'border-primary bg-blue-50 dark:bg-blue-900/20 shadow-md'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="text-3xl mb-2">{provider.icon}</div>
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">{provider.name}</div>
                      </button>
                    ))}
                  </div>
                  
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Other Providers</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {hrmsProviders.filter(p => !p.popular).map((provider) => (
                      <button
                        key={provider.id}
                        onClick={() => handleProviderSelect(provider.id)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedProvider === provider.id
                            ? 'border-primary bg-blue-50 dark:bg-blue-900/20 shadow-md'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="text-3xl mb-2">{provider.icon}</div>
                        <div className="text-xs font-semibold text-gray-900 dark:text-white">{provider.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleContinueToCredentials} 
                    disabled={!selectedProvider}
                    className="flex-1 h-12 text-base font-semibold"
                  >
                    Continue
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                  {!isFirstTime && (
                    <Button variant="outline" onClick={handleCloseModal} className="h-12 text-base font-semibold px-6">
                      Cancel
                    </Button>
                  )}
                </div>
              </>
            )}

            {/* Step 2: Enter Credentials */}
            {syncStep === 'credentials' && (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[hsl(var(--primary))] to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">{hrmsProviders.find(p => p.id === selectedProvider)?.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Connect to {hrmsProviders.find(p => p.id === selectedProvider)?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter your API credentials to establish connection
                  </p>
                  <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Provider</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
                      <span className="font-medium text-gray-900 dark:text-white">Credentials</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">3</div>
                      <span>Connect</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Company Domain
                    </label>
                    <Input
                      type="text"
                      placeholder="yourcompany.workday.com"
                      value={credentials.domain}
                      onChange={(e) => setCredentials({ ...credentials, domain: e.target.value })}
                      className="h-12"
                    />
                    <p className="text-xs text-gray-500 mt-1">Your organization's HRMS domain</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      API Key / Token
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter your API key"
                      value={credentials.apiKey}
                      onChange={(e) => setCredentials({ ...credentials, apiKey: e.target.value })}
                      className="h-12"
                    />
                    <p className="text-xs text-gray-500 mt-1">Secure token for API access</p>
                  </div>

                  <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Need help finding your credentials?</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Contact your HRMS administrator or check your provider's API documentation for authentication details.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      🔒 Your data is secure
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      All credentials are encrypted and stored securely. We never share your data with third parties.
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSyncStep('provider')} 
                    className="h-12 text-base font-semibold px-6"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </Button>
                  <Button 
                    onClick={handleConnect} 
                    disabled={!credentials.apiKey || !credentials.domain}
                    className="flex-1 h-12 text-base font-semibold"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Connect & Sync
                  </Button>
                </div>
              </>
            )}

            {/* Step 3: Connecting */}
            {syncStep === 'connecting' && (
              <div className="text-center py-12">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-blue-200 dark:border-gray-700 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 m-auto w-12 h-12 text-4xl flex items-center justify-center">
                    {hrmsProviders.find(p => p.id === selectedProvider)?.icon}
                  </div>
                </div>
                
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Connecting to {hrmsProviders.find(p => p.id === selectedProvider)?.name}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Please wait while we sync your employee data...</p>
                
                <div className="max-w-md mx-auto space-y-4">
                  {[
                    { icon: '🔐', text: 'Authenticating credentials...', delay: 0 },
                    { icon: '👥', text: 'Fetching employee directory...', delay: 200 },
                    { icon: '💰', text: 'Syncing compensation data...', delay: 400 },
                    { icon: '🏢', text: 'Importing department structure...', delay: 600 },
                    { icon: '📊', text: 'Processing analytics...', delay: 800 },
                  ].map((step, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      style={{ animationDelay: `${step.delay}ms` }}
                    >
                      <div className="text-2xl animate-pulse" style={{ animationDelay: `${step.delay}ms` }}>
                        {step.icon}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{step.text}</span>
                      <div className="ml-auto">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {syncStep === 'success' && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {isFirstTime ? 'Connected Successfully! 🎉' : 'Sync Completed!'}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {isFirstTime 
                    ? `Your ${hrmsProviders.find(p => p.id === selectedProvider)?.name} data is now synced`
                    : 'All employee data is up to date'}
                </p>

                <div className="max-w-md mx-auto bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Employees Synced</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Departments</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Data Points</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">24,940</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Last Sync</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">Now</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
      </div>
    </div>
  );
};
