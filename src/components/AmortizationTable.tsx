import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download, Eye } from 'lucide-react';
import { AmortizationEntry } from '../types/loan';
import { formatCurrency } from '../utils/emiCalculations';
import { useTheme } from '../contexts/ThemeContext';

interface AmortizationTableProps {
  schedule: AmortizationEntry[];
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ schedule }) => {
  const { isDarkMode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Group schedule by year
  const yearlySchedule = schedule.reduce((acc, entry) => {
    if (!acc[entry.year]) {
      acc[entry.year] = [];
    }
    acc[entry.year].push(entry);
    return acc;
  }, {} as Record<number, AmortizationEntry[]>);

  const years = Object.keys(yearlySchedule).map(Number).sort();

  const handleDownload = () => {
    const csvContent = [
      ['Month', 'EMI', 'Principal', 'Interest', 'Balance'].join(','),
      ...schedule.map(entry => [
        entry.month,
        entry.emi.toFixed(2),
        entry.principalPayment.toFixed(2),
        entry.interestPayment.toFixed(2),
        entry.remainingBalance.toFixed(2)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'amortization-schedule.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`
      backdrop-blur-md rounded-2xl border shadow-xl transition-all duration-300
      ${isDarkMode 
        ? 'bg-gray-800/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
      }
    `}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Amortization Schedule
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className={`
                p-2 rounded-lg transition-all duration-300 hover:scale-105
                ${isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
              title="Download CSV"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105
                ${isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              <Eye className="w-4 h-4" />
              {isExpanded ? 'Hide Details' : 'View Details'}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 space-y-4">
          {/* Year Selection */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedYear(null)}
              className={`
                px-3 py-1 rounded-full text-sm transition-all duration-300
                ${selectedYear === null
                  ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                  : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              All Years
            </button>
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`
                  px-3 py-1 rounded-full text-sm transition-all duration-300
                  ${selectedYear === year
                    ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                    : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                Year {year}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b transition-colors duration-300 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  {['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map(header => (
                    <th key={header} className={`
                      px-4 py-3 text-left text-sm font-semibold transition-colors duration-300
                      ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                    `}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(selectedYear ? yearlySchedule[selectedYear] : schedule).slice(0, 50).map((entry, index) => (
                  <tr
                    key={entry.month}
                    className={`
                      border-b transition-all duration-300 hover:bg-opacity-50
                      ${isDarkMode 
                        ? 'border-gray-700 hover:bg-gray-700' 
                        : 'border-gray-100 hover:bg-gray-50'
                      }
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className={`px-4 py-3 text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {entry.month}
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formatCurrency(entry.emi)}
                    </td>
                    <td className={`px-4 py-3 text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {formatCurrency(entry.principalPayment)}
                    </td>
                    <td className={`px-4 py-3 text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {formatCurrency(entry.interestPayment)}
                    </td>
                    <td className={`px-4 py-3 text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {formatCurrency(entry.remainingBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(selectedYear ? yearlySchedule[selectedYear] : schedule).length > 50 && (
            <p className={`text-sm text-center transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Showing first 50 entries. Download CSV for complete schedule.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AmortizationTable;