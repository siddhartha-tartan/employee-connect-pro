import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const CRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'corporates' | 'employees' | 'rules' | 'analytics'>('dashboard');
  const [selectedCorporate, setSelectedCorporate] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [analyticsQuery, setAnalyticsQuery] = useState("");
  const [analyticsResult, setAnalyticsResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock Data
  const corporates = [
    { id: 'CORP001', name: 'Tech Corp India', industry: 'Technology', employees: 15, activeProducts: 58, productPenetration: 78, location: 'Bangalore', since: '2019', topProducts: ['Credit Cards', 'Personal Loans', 'Insurance'] },
    { id: 'CORP002', name: 'Global Finance Ltd', industry: 'Finance', employees: 12, activeProducts: 42, productPenetration: 62, location: 'Mumbai', since: '2020', topProducts: ['Home Loans', 'Credit Cards', 'Investment'] },
    { id: 'CORP003', name: 'HealthCare Plus', industry: 'Healthcare', employees: 10, activeProducts: 35, productPenetration: 67, location: 'Delhi', since: '2021', topProducts: ['Insurance', 'Personal Loans', 'Credit Cards'] },
    { id: 'CORP004', name: 'EduTech Solutions', industry: 'Education', employees: 8, activeProducts: 28, productPenetration: 69, location: 'Pune', since: '2022', topProducts: ['Credit Cards', 'FDs', 'Insurance'] },
  ];

  const allEmployees = [
    { id: 'EMP001', corpId: 'CORP001', corpName: 'Tech Corp India', name: 'Rahul Sharma', designation: 'Senior Engineer', department: 'Engineering', salary: 850000, tenure: 3.5, creditScore: 78, products: 3, lastActive: '2 hours ago' },
    { id: 'EMP002', corpId: 'CORP001', corpName: 'Tech Corp India', name: 'Priya Mehta', designation: 'Marketing Manager', department: 'Marketing', salary: 650000, tenure: 2.1, creditScore: 72, products: 2, lastActive: '1 day ago' },
    { id: 'EMP003', corpId: 'CORP001', corpName: 'Tech Corp India', name: 'Amit Kumar', designation: 'Sales Lead', department: 'Sales', salary: 720000, tenure: 4.2, creditScore: 81, products: 4, lastActive: '3 hours ago' },
    { id: 'EMP004', corpId: 'CORP001', corpName: 'Tech Corp India', name: 'Kavita Rao', designation: 'Product Manager', department: 'Product', salary: 980000, tenure: 4.8, creditScore: 84, products: 5, lastActive: '1 hour ago' },
    { id: 'EMP005', corpId: 'CORP001', corpName: 'Tech Corp India', name: 'Sanjay Gupta', designation: 'DevOps Lead', department: 'Engineering', salary: 890000, tenure: 3.2, creditScore: 79, products: 4, lastActive: '4 hours ago' },
    { id: 'EMP006', corpId: 'CORP002', corpName: 'Global Finance Ltd', name: 'Rajesh Kumar', designation: 'VP Operations', department: 'Operations', salary: 1450000, tenure: 7.5, creditScore: 91, products: 7, lastActive: '1 hour ago' },
    { id: 'EMP007', corpId: 'CORP002', corpName: 'Global Finance Ltd', name: 'Lakshmi Menon', designation: 'Senior Analyst', department: 'Finance', salary: 920000, tenure: 4.8, creditScore: 84, products: 5, lastActive: '2 hours ago' },
    { id: 'EMP008', corpId: 'CORP003', corpName: 'HealthCare Plus', name: 'Dr. Karan Mehta', designation: 'Chief Surgeon', department: 'Medical', salary: 1800000, tenure: 9.5, creditScore: 93, products: 8, lastActive: '4 hours ago' },
  ];

  const employeeDetails: Record<string, any> = {
    'EMP001': {
      products: [
        { id: 'P1', name: 'Platinum Credit Card', type: 'Credit Card', status: 'Active', detail: '₹5L limit', since: 'Jan 2023' },
        { id: 'P2', name: 'Personal Loan', type: 'Loan', status: 'Active', detail: '₹8L • ₹18,450/mo', since: 'Mar 2023' },
        { id: 'P3', name: 'Health Insurance', type: 'Insurance', status: 'Active', detail: '₹10L coverage', since: 'Jan 2022' },
      ],
      applications: [
        { id: 'A1', product: 'Home Loan', amount: '₹35L', appliedOn: '2 days ago', status: 'Under Review', stage: 'Document Verification' },
        { id: 'A2', product: 'Investment Plan', amount: '₹2L', appliedOn: '1 week ago', status: 'Approved', stage: 'Completed' },
      ],
      approvals: [
        { id: 'AP1', product: 'Platinum Credit Card', date: 'Jan 15, 2023', decision: 'Approved', detail: '₹5L limit' },
        { id: 'AP2', product: 'Personal Loan', date: 'Mar 10, 2023', decision: 'Approved', detail: '₹8L' },
        { id: 'AP3', product: 'Gold Credit Card', date: 'Dec 20, 2022', decision: 'Rejected', detail: 'Credit score below threshold' },
      ],
    },
  };

  const rules = [
    { id: 'R1', name: 'Platinum Credit Card', type: 'Credit Card', tier: 'Platinum', icon: '💳', gradient: 'from-purple-500 to-blue-600', eligible: 234, approvalRate: 89, 
      criteria: ['Salary ≥ ₹8L', 'Credit Score ≥ 750', 'Tenure ≥ 2 years'], 
      benefits: ['5% cashback', 'Lounge access', 'Zero forex'] },
    { id: 'R2', name: 'Gold Credit Card', type: 'Credit Card', tier: 'Gold', icon: '🌟', gradient: 'from-yellow-500 to-orange-500', eligible: 567, approvalRate: 92,
      criteria: ['Salary ≥ ₹5L', 'Credit Score ≥ 700', 'Tenure ≥ 1 year'],
      benefits: ['2% cashback', 'Dining rewards', 'Travel insurance'] },
    { id: 'R3', name: 'Personal Loan', type: 'Loan', tier: 'Standard', icon: '💰', gradient: 'from-green-500 to-emerald-600', eligible: 892, approvalRate: 87,
      criteria: ['Salary ≥ ₹3L', 'Credit Score ≥ 650', 'Tenure ≥ 6 months'],
      benefits: ['Up to 20x salary', '10.5%-14% interest', '12-60 months tenure'] },
    { id: 'R4', name: 'Home Loan', type: 'Loan', tier: 'Premium', icon: '🏠', gradient: 'from-blue-500 to-cyan-500', eligible: 156, approvalRate: 78,
      criteria: ['Salary ≥ ₹10L', 'Credit Score ≥ 750', 'Tenure ≥ 2 years', 'Age ≤ 55'],
      benefits: ['Up to ₹2Cr', '8.5% interest', 'Zero processing fee'] },
  ];

  const handleAnalyticsQuery = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const query = analyticsQuery.toLowerCase();
    
    // Simple, practical results
    if (query.includes('card') || query.includes('credit')) {
      setAnalyticsResult({
        query: analyticsQuery,
        summary: '47 credit card applications in last 3 days',
        metrics: [
          { label: 'Total Apps', value: '47' },
          { label: 'Approved', value: '42', percentage: 89 },
          { label: 'Rejected', value: '5', percentage: 11 },
        ],
        topCorporate: 'Tech Corp India (23 apps)',
        recommendation: 'High demand from Tech sector. Consider targeted campaign for remaining eligible employees.'
      });
    } else if (query.includes('loan')) {
      setAnalyticsResult({
        query: analyticsQuery,
        summary: '234 loan applications this month',
        metrics: [
          { label: 'Total Apps', value: '234' },
          { label: 'Approved', value: '204', percentage: 87 },
          { label: 'Rejected', value: '30', percentage: 13 },
        ],
        topCorporate: 'Tech Corp India (89 apps)',
        recommendation: 'Average loan amount up 8%. Personal loans dominate at 56% of applications.'
      });
    } else if (query.includes('growth') || query.includes('trend')) {
      setAnalyticsResult({
        query: analyticsQuery,
        summary: 'Portfolio growth: 45 new employees and 163 products added',
        metrics: [
          { label: 'New Employees', value: '45' },
          { label: 'New Products', value: '163' },
          { label: 'Growth Rate', value: '+23%' },
        ],
        topCorporate: 'Tech Corp India (fastest growth)',
        recommendation: 'Strong momentum across all corporates. Focus on maintaining quality of service.'
      });
    } else {
      setAnalyticsResult({
        query: analyticsQuery,
        summary: 'Portfolio Overview',
        metrics: [
          { label: 'Corporates', value: '4' },
          { label: 'Employees', value: '2,969' },
          { label: 'Active Products', value: '8,373' },
        ],
        topCorporate: 'Tech Corp India (highest revenue)',
        recommendation: 'Overall portfolio health is strong. Consider expanding to 2-3 new corporates this quarter.'
      });
    }
    
    setIsAnalyzing(false);
  };

  const selectedEmp = allEmployees.find(e => e.id === selectedEmployee);
  const empDetails = selectedEmployee ? employeeDetails[selectedEmployee] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--primary))] to-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Employee Connect Pro</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Relationship Manager Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 border-blue-200">RM: Anjali Verma</Badge>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notifications
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-sm border border-gray-200 dark:border-gray-700 inline-flex mb-8">
            {['dashboard', 'corporates', 'employees', 'rules', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any);
                  if (tab !== 'employees') setSelectedEmployee(null);
                }}
                className={`px-6 py-2.5 font-medium text-sm transition-all rounded-lg capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 p-8">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-blue-500"></div>
                </div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Portfolio Overview</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Manage {corporates.length} corporate clients with {corporates.reduce((sum, c) => sum + c.employees, 0)} employees</p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Corporates</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{corporates.length}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active partnerships</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Employees</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{corporates.reduce((sum, c) => sum + c.employees, 0)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Across all corporates</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Active Products</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{corporates.reduce((sum, c) => sum + c.activeProducts, 0)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Products in use</p>
                </Card>
              </div>

              {/* Top Corporates */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Corporate Clients</h3>
                <div className="space-y-3">
                  {corporates.map((corp, idx) => (
                    <div key={corp.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer" onClick={() => {setActiveTab('corporates')}}>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-sm">{idx + 1}</div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{corp.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{corp.employees} employees • {corp.industry}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{corp.activeProducts} products</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{corp.productPenetration}% adoption</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'View Corporates', icon: '🏢', action: () => setActiveTab('corporates') },
                  { label: 'All Employees', icon: '👥', action: () => setActiveTab('employees') },
                  { label: 'Manage Rules', icon: '⚙️', action: () => setActiveTab('rules') },
                  { label: 'Analytics', icon: '📊', action: () => setActiveTab('analytics') },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="p-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-700 transition-all text-center"
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Corporates Tab */}
          {activeTab === 'corporates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Corporate Clients</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{corporates.length} active corporate partnerships</p>
                </div>
                <Button>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Corporate
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {corporates.map((corp) => (
                  <Card key={corp.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{corp.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{corp.industry} • {corp.location}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Client since {corp.since}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30">Active</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Employees</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{corp.employees}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Products</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{corp.activeProducts}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Adoption</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{corp.productPenetration}%</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Popular Products:</p>
                      <div className="flex flex-wrap gap-2">
                        {corp.topProducts.map((product, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => {
                        setSelectedCorporate(corp.id);
                        setActiveTab('employees');
                      }}
                    >
                      View {corp.employees} Employees
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Employees Tab */}
          {activeTab === 'employees' && !selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedCorporate ? corporates.find(c => c.id === selectedCorporate)?.name + ' - ' : ''}Employees
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {allEmployees.filter(e => !selectedCorporate || e.corpId === selectedCorporate).length} employees
                  </p>
                </div>
                <div className="flex space-x-2">
                  {selectedCorporate && (
                    <Button variant="outline" onClick={() => setSelectedCorporate(null)}>Show All</Button>
                  )}
                  <Button>Add Employee</Button>
                </div>
              </div>

              <Card className="p-4">
                <Input placeholder="Search by name, ID, designation, or department..." className="w-full" />
              </Card>

              <Card className="overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Employee</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Corporate</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Department</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Salary</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Credit Score</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Products</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {allEmployees.filter(e => !selectedCorporate || e.corpId === selectedCorporate).map((emp) => (
                      <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                              {emp.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{emp.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{emp.designation}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{emp.corpName}</td>
                        <td className="px-6 py-4 whitespace-nowrap"><Badge variant="secondary">{emp.department}</Badge></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">₹{(emp.salary / 100000).toFixed(1)}L</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={emp.creditScore >= 80 ? 'bg-green-100 text-green-700' : emp.creditScore >= 70 ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}>
                            {emp.creditScore}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{emp.products} active</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button variant="outline" size="sm" onClick={() => setSelectedEmployee(emp.id)}>View Profile</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* Employee Detail View */}
          {activeTab === 'employees' && selectedEmployee && selectedEmp && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => setSelectedEmployee(null)}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Employees
                </Button>
              </div>

              {/* Employee Header */}
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {selectedEmp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedEmp.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{selectedEmp.designation} • {selectedEmp.department}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedEmp.corpName} • {selectedEmp.id}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="bg-blue-50 dark:bg-gray-900 rounded-lg p-4">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Annual Salary</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">₹{(selectedEmp.salary / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-gray-900 rounded-lg p-4">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Tenure</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{selectedEmp.tenure} years</p>
                  </div>
                  <div className="bg-green-50 dark:bg-gray-900 rounded-lg p-4">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Credit Score</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{selectedEmp.creditScore}</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-gray-900 rounded-lg p-4">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Active Products</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{selectedEmp.products}</p>
                  </div>
                </div>
              </Card>

              {/* Active Products */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Products</h3>
                {empDetails?.products ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {empDetails.products.map((product: any) => (
                      <div key={product.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{product.type}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-700">{product.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{product.detail}</p>
                        <p className="text-xs text-gray-500">Active since {product.since}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-8">No active products</p>
                )}
              </Card>

              {/* Applications */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Applications</h3>
                {empDetails?.applications ? (
                  <div className="space-y-3">
                    {empDetails.applications.map((app: any) => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">{app.product}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{app.amount} • Applied {app.appliedOn}</p>
                          <p className="text-xs text-gray-500 mt-1">Stage: {app.stage}</p>
                        </div>
                        <Badge className={app.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                          {app.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-8">No recent applications</p>
                )}
              </Card>

              {/* Approval History */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Approval History</h3>
                {empDetails?.approvals ? (
                  <div className="space-y-3">
                    {empDetails.approvals.map((approval: any) => (
                      <div key={approval.id} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">{approval.product}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{approval.detail}</p>
                          <p className="text-xs text-gray-500 mt-1">{approval.date}</p>
                        </div>
                        <Badge className={approval.decision === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                          {approval.decision}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-8">No approval history</p>
                )}
              </Card>
            </div>
          )}

          {/* Rules Tab - Redesigned */}
          {activeTab === 'rules' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Product Eligibility Rules</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{rules.length} active rules defining product access</p>
                </div>
                <Button>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Rule
                </Button>
              </div>

              <div className="space-y-4">
                {rules.map((rule) => (
                  <Card key={rule.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{rule.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{rule.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{rule.type} • {rule.tier} Tier</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30">Active</Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-4">
                      {/* Eligibility Requirements */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Eligibility Requirements</h4>
                        <div className="space-y-2">
                          {rule.criteria.map((c, idx) => (
                            <div key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Product Benefits */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Product Benefits</h4>
                        <div className="space-y-2">
                          {rule.benefits.map((b, idx) => (
                            <div key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                              <span className="text-green-600 mr-2">✓</span>
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Statistics */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Performance</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Eligible Employees</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{rule.eligible}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Approval Rate</p>
                            <div className="flex items-baseline space-x-2">
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{rule.approvalRate}%</p>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${rule.approvalRate}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit Rule
                      </Button>
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Eligible Employees
                      </Button>
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        View Analytics
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab - Simplified & Engaging */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 p-8">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-purple-500"></div>
                </div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">AI Analytics 🤖</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">Ask any question about your portfolio and get instant insights</p>
                </div>
              </div>

              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="e.g., How many credit card applications this week?"
                      value={analyticsQuery}
                      onChange={(e) => setAnalyticsQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && analyticsQuery && handleAnalyticsQuery()}
                      className="text-base h-12 mb-3"
                    />
                    <div className="flex flex-wrap gap-2">
                      {['Credit card applications', 'Loan approval rates', 'Portfolio growth trends'].map((q) => (
                        <button
                          key={q}
                          onClick={() => setAnalyticsQuery(q)}
                          className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button 
                    onClick={handleAnalyticsQuery}
                    disabled={!analyticsQuery || isAnalyzing}
                    size="lg"
                    className="h-12"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                  </Button>
                </div>
              </Card>

              {/* Loading State */}
              {isAnalyzing && (
                <Card className="p-12">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analyzing your data...</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Processing query across portfolio</p>
                  </div>
                </Card>
              )}

              {/* Results - Simple & Practical */}
              {!isAnalyzing && analyticsResult && (
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Query: {analyticsResult.query}</p>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{analyticsResult.summary}</h3>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setAnalyticsResult(null)}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {analyticsResult.metrics.map((metric: any, idx: number) => (
                      <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.label}</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                        {metric.percentage !== undefined && (
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: `${metric.percentage}%` }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">🏆 Top Performer:</p>
                    <p className="text-gray-700 dark:text-gray-300">{analyticsResult.topCorporate}</p>
                  </div>

                  <div className="bg-purple-50 dark:bg-gray-900 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">💡 Recommendation:</p>
                    <p className="text-gray-700 dark:text-gray-300">{analyticsResult.recommendation}</p>
                  </div>

                  <div className="flex space-x-2 mt-6">
                    <Button variant="outline" size="sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
