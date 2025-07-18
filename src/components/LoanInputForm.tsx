import React, { useState, useCallback } from 'react';
import { Calculator, IndianRupee, Calendar, Percent, AlertCircle } from 'lucide-react';
import { LoanDetails, ValidationError } from '../types/loan';
import { validateLoanInputs } from '../utils/emiCalculations';
import { useTheme } from '../contexts/ThemeContext';

interface LoanInputFormProps {
  onLoanDetailsChange: (details: LoanDetails) => void;
  loanDetails: LoanDetails;
}

const LoanInputForm: React.FC<LoanInputFormProps> = ({ onLoanDetailsChange, loanDetails }) => {
  const { isDarkMode } = useTheme();
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [tenureType, setTenureType] = useState<'months' | 'years'>('years');

  const handleInputChange = useCallback((field: keyof LoanDetails, value: string) => {
    const numValue = parseFloat(value) || 0;
    let updatedDetails: LoanDetails;

    if (field === 'tenureMonths') {
      const months = tenureType === 'years' ? numValue * 12 : numValue;
      updatedDetails = { ...loanDetails, tenureMonths: months };
    } else {
      updatedDetails = { ...loanDetails, [field]: numValue };
    }

    const validationErrors = validateLoanInputs(updatedDetails);
    setErrors(validationErrors);
    onLoanDetailsChange(updatedDetails);
  }, [loanDetails, onLoanDetailsChange, tenureType]);

  const getFieldError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  const tenureValue = tenureType === 'years' ? loanDetails.tenureMonths / 12 : loanDetails.tenureMonths;

  return (
    <div className={`
      backdrop-blur-md rounded-2xl border shadow-xl transition-all duration-300
      ${isDarkMode 
        ? 'bg-gray-800/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
      }
    `}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className={`
            p-2 rounded-lg transition-colors duration-300
            ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}
          `}>
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Loan Details
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Principal Amount */}
        <div className="space-y-2">
          <label className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <IndianRupee className="w-4 h-4" />
            Principal Amount
          </label>
          <div className="relative">
            <input
              type="number"
              value={loanDetails.principal || ''}
              onChange={(e) => handleInputChange('principal', e.target.value)}
              placeholder="Enter loan amount"
              className={`
                w-full px-4 py-3 rounded-lg border transition-all duration-300
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }
                ${getFieldError('principal') ? 'border-red-500 ring-2 ring-red-500/20' : ''}
              `}
              aria-describedby={getFieldError('principal') ? 'principal-error' : undefined}
            />
            {getFieldError('principal') && (
              <div id="principal-error" className="flex items-center gap-1 mt-1 text-sm text-red-500">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('principal')}
              </div>
            )}
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <label className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Percent className="w-4 h-4" />
            Annual Interest Rate
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={loanDetails.interestRate || ''}
              onChange={(e) => handleInputChange('interestRate', e.target.value)}
              placeholder="Enter interest rate"
              className={`
                w-full px-4 py-3 rounded-lg border transition-all duration-300
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }
                ${getFieldError('interestRate') ? 'border-red-500 ring-2 ring-red-500/20' : ''}
              `}
              aria-describedby={getFieldError('interestRate') ? 'interest-error' : undefined}
            />
            {getFieldError('interestRate') && (
              <div id="interest-error" className="flex items-center gap-1 mt-1 text-sm text-red-500">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('interestRate')}
              </div>
            )}
          </div>
        </div>

        {/* Loan Tenure */}
        <div className="space-y-2">
          <label className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <Calendar className="w-4 h-4" />
            Loan Tenure
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={tenureValue || ''}
              onChange={(e) => handleInputChange('tenureMonths', e.target.value)}
              placeholder={`Enter tenure in ${tenureType}`}
              className={`
                flex-1 px-4 py-3 rounded-lg border transition-all duration-300
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                ${isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }
                ${getFieldError('tenureMonths') ? 'border-red-500 ring-2 ring-red-500/20' : ''}
              `}
              aria-describedby={getFieldError('tenureMonths') ? 'tenure-error' : undefined}
            />
            <div className="flex rounded-lg border overflow-hidden">
              {(['years', 'months'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTenureType(type)}
                  className={`
                    px-4 py-3 text-sm font-medium transition-all duration-300
                    ${tenureType === type
                      ? isDarkMode 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-600 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {getFieldError('tenureMonths') && (
            <div id="tenure-error" className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="w-4 h-4" />
              {getFieldError('tenureMonths')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanInputForm;