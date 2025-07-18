import React, { useState, useEffect, useMemo } from 'react';
import { LoanDetails, EMIResult, AmortizationEntry } from '../types/loan';
import { calculateLoanDetails, generateAmortizationSchedule } from '../utils/emiCalculations';
import LoanInputForm from './LoanInputForm';
import EMIResultCard from './EMIResultCard';
import PieChart from './charts/PieChart';
import LineChart from './charts/LineChart';
import AmortizationTable from './AmortizationTable';
import LoadingSpinner from './LoadingSpinner';
import { useTheme } from '../contexts/ThemeContext';

const EMICalculator: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    principal: 1000000,
    interestRate: 8.5,
    tenureMonths: 240, // 20 years
  });
  const [isLoading, setIsLoading] = useState(false);

  // Calculate results with debounced loading effect
  const { emiResult, amortizationSchedule } = useMemo(() => {
    if (loanDetails.principal <= 0 || loanDetails.interestRate <= 0 || loanDetails.tenureMonths <= 0) {
      return {
        emiResult: { monthlyEMI: 0, totalAmount: 0, totalInterest: 0, principalAmount: 0 },
        amortizationSchedule: [],
      };
    }

    const result = calculateLoanDetails(loanDetails);
    const schedule = generateAmortizationSchedule(loanDetails);

    return {
      emiResult: result,
      amortizationSchedule: schedule,
    };
  }, [loanDetails]);

  // Simulate loading for better UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [loanDetails]);

  const handleLoanDetailsChange = (details: LoanDetails) => {
    setLoanDetails(details);
  };

  return (
    <div className="min-h-screen relative z-10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            EMI Loan Calculator
          </h1>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Calculate your Equated Monthly Installments with detailed amortization schedule and interactive charts
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-1">
            <LoanInputForm
              loanDetails={loanDetails}
              onLoanDetailsChange={handleLoanDetailsChange}
            />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-8">
            {/* EMI Results */}
            <EMIResultCard result={emiResult} isLoading={isLoading} />

            {/* Charts Section */}
            {!isLoading && emiResult.monthlyEMI > 0 && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className={`
                  backdrop-blur-md rounded-2xl border shadow-xl transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-gray-800/80 border-gray-700' 
                    : 'bg-white/80 border-gray-200'
                  }
                `}>
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Principal vs Interest
                    </h3>
                  </div>
                  <div className="p-6">
                    <PieChart result={emiResult} />
                  </div>
                </div>

                {/* Line Chart */}
                <div className={`
                  backdrop-blur-md rounded-2xl border shadow-xl transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-gray-800/80 border-gray-700' 
                    : 'bg-white/80 border-gray-200'
                  }
                `}>
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Payment Schedule
                    </h3>
                  </div>
                  <div className="p-6">
                    <LineChart schedule={amortizationSchedule} />
                  </div>
                </div>
              </div>
            )}

            {/* Amortization Table */}
            {!isLoading && emiResult.monthlyEMI > 0 && (
              <AmortizationTable schedule={amortizationSchedule} />
            )}

            {/* Loading State */}
            {isLoading && <LoadingSpinner />}
          </div>
        </div>

        {/* Footer */}
        <footer className={`text-center mt-16 pb-8 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p className="text-sm">
            EMI Calculator • Built with precision for accurate financial planning
          </p>
        </footer>
      </div>
    </div>
  );
};

export default EMICalculator;