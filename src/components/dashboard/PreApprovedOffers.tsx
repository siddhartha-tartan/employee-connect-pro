import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, PiggyBank, Home } from "lucide-react";

export const PreApprovedOffers: React.FC = () => {
  const offers = [
    {
      id: 1,
      type: 'Credit Card',
      title: 'HDFC Regalia Gold',
      subtitle: 'Lifetime free for employees',
      amount: '₹5L limit',
      features: ['4 reward points per ₹150', 'Airport lounge access', 'Zero joining fee'],
      badge: 'Pre-approved',
      badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      gradient: 'from-yellow-500 to-orange-500',
      Icon: CreditCard,
      expiresIn: '7 days'
    },
    {
      id: 2,
      type: 'Personal Loan',
      title: 'Instant Personal Loan',
      subtitle: 'Minimal documentation',
      amount: 'Up to ₹15L',
      features: ['10.99% interest', 'Instant approval', '5 year tenure'],
      badge: 'Pre-approved',
      badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      gradient: 'from-blue-500 to-cyan-500',
      Icon: PiggyBank,
      expiresIn: '5 days'
    },
    {
      id: 3,
      type: 'Home Loan',
      title: 'Employee Home Loan',
      subtitle: 'Special corporate rates',
      amount: 'Up to ₹50L',
      features: ['8.25% interest', 'Zero processing fee', 'Tax benefits up to ₹3.5L'],
      badge: 'Limited offer',
      badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      gradient: 'from-purple-500 to-pink-500',
      Icon: Home,
      expiresIn: '10 days'
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pre-approved Offers</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Exclusive deals based on your profile</p>
        </div>
        <button className="text-primary dark:text-primary/80 hover:underline text-sm font-medium">
          View all offers →
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Card Header with Gradient */}
            <div className={`bg-gradient-to-br ${offer.gradient} p-6 text-white relative`}>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${offer.badgeColor} bg-white/90`}>
                  {offer.badge}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                <offer.Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm opacity-90 mb-1">{offer.type}</p>
              <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
              <p className="text-sm opacity-80">{offer.subtitle}</p>
              <p className="text-2xl font-bold mt-3">{offer.amount}</p>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <ul className="space-y-2 mb-6">
                {offer.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Expires in {offer.expiresIn}
                </span>
              </div>

              <Button className="w-full">
                Apply Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
