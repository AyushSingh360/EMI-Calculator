import React from 'react';
import { TrendingUp, DollarSign, CreditCard, PiggyBank } from 'lucide-react';
import { EMIResult } from '../types/loan';
import { formatCurrency, formatNumber } from '../utils/emiCalculations';
import { useTheme } from '../contexts/ThemeContext';

interface EMIResultCardProps {
  result: EMIResult;
  isLoading: boolean;
}

const EMIResultCard: React.FC<EMIResultCardProps> = ({ result, isLoading }) => {
  const { isDarkMode } = useTheme();

  const resultItems = [
    {
      label: 'Monthly EMI',
      value: formatCurrency(result.monthlyEMI),
      icon: CreditCard,
      color: isDarkMode ? 'text-blue-400' : 'text-blue-600',
      bgColor: isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100',
    },
    {
      label: 'Total Amount',
      value: formatCurrency(result.totalAmount),
      icon: DollarSign,
      color: isDarkMode ? 'text-purple-400' : 'text-purple-600',
      bgColor: isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100',
    },
    {
      label: 'Total Interest',
      value: formatCurrency(result.totalInterest),
      icon: TrendingUp,
      color: isDarkMode ? 'text-amber-400' : 'text-amber-600',
      bgColor: isDarkMode ? 'bg-amber-500/20' : 'bg-amber-100',
    },
    {
      label: 'Principal Amount',
      value: formatCurrency(result.principalAmount),
      icon: PiggyBank,
      color: isDarkMode ? 'text-green-400' : 'text-green-600',
      bgColor: isDarkMode ? 'bg-green-500/20' : 'bg-green-100',
    },
  ];

  return (
    <div className={`
      backdrop-blur-md rounded-2xl border shadow-xl transition-all duration-300
      ${isDarkMode 
        ? 'bg-gray-800/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
      }
    `}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className={`text-xl font-semibold transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Loan Summary
        </h2>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className={`h-20 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200'
                }`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resultItems.map((item, index) => (
              <div
                key={item.label}
                className={`
                  group p-4 rounded-xl transition-all duration-300 cursor-default
                  hover:scale-105 hover:shadow-lg
                  ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50/50'}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-all duration-300 ${item.bgColor}`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {item.label}
                    </p>
                    <p className={`text-lg font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EMIResultCard;