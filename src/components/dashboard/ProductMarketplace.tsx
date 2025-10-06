import React, { useState } from "react";

export const ProductMarketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Products', icon: '📦' },
    { id: 'savings', label: 'Savings & FD', icon: '💎' },
    { id: 'insurance', label: 'Insurance', icon: '🛡️' },
    { id: 'investments', label: 'Investments', icon: '📈' },
    { id: 'tax', label: 'Tax Saving', icon: '📊' },
    { id: 'loans', label: 'Loans', icon: '💰' },
  ];

  const products = [
    {
      id: 1,
      category: 'savings',
      icon: '💎',
      name: 'Fixed Deposit',
      description: 'Secure savings with guaranteed returns',
      rate: '7.5% p.a.',
      features: ['No lock-in period', 'Premature withdrawal'],
      badge: 'Popular',
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    },
    {
      id: 2,
      category: 'insurance',
      icon: '🛡️',
      name: 'Health Insurance',
      description: 'Comprehensive health coverage for family',
      rate: '₹5L coverage',
      features: ['Cashless claims', 'No waiting period'],
      badge: 'Recommended',
      badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    },
    {
      id: 3,
      category: 'insurance',
      icon: '🚗',
      name: 'Accident Insurance',
      description: 'Personal accident cover for employees',
      rate: '₹10L coverage',
      features: ['Instant activation', 'Family add-on'],
      badge: 'New',
      badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    },
    {
      id: 4,
      category: 'investments',
      icon: '📈',
      name: 'Mutual Funds',
      description: 'Diversified equity & debt funds',
      rate: '12-15% returns',
      features: ['SIP from ₹500', 'Expert advisory'],
      badge: 'High Return',
      badgeColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    },
    {
      id: 5,
      category: 'tax',
      icon: '📊',
      name: 'ELSS Funds',
      description: 'Tax saving with wealth creation',
      rate: 'Save ₹46,800',
      features: ['80C benefits', '3-year lock-in'],
      badge: 'Tax Saver',
      badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    },
    {
      id: 6,
      category: 'tax',
      icon: '📄',
      name: 'Tax Filing Service',
      description: 'Expert-assisted ITR filing',
      rate: '₹999 only',
      features: ['CA consultation', 'Max refund'],
      badge: 'Limited Time',
      badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    },
    {
      id: 7,
      category: 'loans',
      icon: '🏠',
      name: 'Home Loan',
      description: 'Low interest home loans',
      rate: '8.25% p.a.',
      features: ['Up to ₹50L', 'Quick approval'],
      badge: 'Best Rate',
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    },
    {
      id: 8,
      category: 'loans',
      icon: '🎓',
      name: 'Education Loan',
      description: 'Fund your higher education',
      rate: '9.5% p.a.',
      features: ['Moratorium period', 'Tax benefits'],
      badge: 'Special Rate',
      badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Marketplace</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Explore all financial products & services</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex overflow-x-auto gap-3 mb-8 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 overflow-hidden group cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{product.icon}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.badgeColor}`}>
                  {product.badge}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{product.description}</p>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-2 mb-4">
                <p className="text-sm font-bold text-blue-900 dark:text-blue-300">{product.rate}</p>
              </div>

              <ul className="space-y-1 mb-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-green-500 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white group-hover:bg-primary group-hover:text-white font-medium py-2 rounded-lg transition-colors text-sm">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No products found in this category</p>
        </div>
      )}
    </div>
  );
};
