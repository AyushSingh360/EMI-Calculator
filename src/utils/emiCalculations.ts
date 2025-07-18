import { LoanDetails, EMIResult, AmortizationEntry, ValidationError } from '../types/loan';

export const calculateEMI = (principal: number, annualRate: number, months: number): number => {
  if (principal <= 0 || annualRate <= 0 || months <= 0) return 0;
  
  const monthlyRate = annualRate / (12 * 100);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  
  if (denominator === 0) return principal / months;
  
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / denominator;
};

export const calculateLoanDetails = (loanDetails: LoanDetails): EMIResult => {
  const { principal, interestRate, tenureMonths } = loanDetails;
  
  const monthlyEMI = calculateEMI(principal, interestRate, tenureMonths);
  const totalAmount = monthlyEMI * tenureMonths;
  const totalInterest = totalAmount - principal;
  
  return {
    monthlyEMI,
    totalAmount,
    totalInterest,
    principalAmount: principal
  };
};

export const generateAmortizationSchedule = (loanDetails: LoanDetails): AmortizationEntry[] => {
  const { principal, interestRate, tenureMonths } = loanDetails;
  const monthlyEMI = calculateEMI(principal, interestRate, tenureMonths);
  const monthlyRate = interestRate / (12 * 100);
  
  const schedule: AmortizationEntry[] = [];
  let remainingBalance = principal;
  
  for (let month = 1; month <= tenureMonths; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyEMI - interestPayment;
    remainingBalance = Math.max(0, remainingBalance - principalPayment);
    
    schedule.push({
      month,
      emi: monthlyEMI,
      principalPayment,
      interestPayment,
      remainingBalance,
      year: Math.ceil(month / 12)
    });
  }
  
  return schedule;
};

export const validateLoanInputs = (loanDetails: LoanDetails): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (loanDetails.principal <= 0) {
    errors.push({ field: 'principal', message: 'Principal amount must be greater than 0' });
  }
  
  if (loanDetails.principal > 100000000) {
    errors.push({ field: 'principal', message: 'Principal amount is too large' });
  }
  
  if (loanDetails.interestRate <= 0) {
    errors.push({ field: 'interestRate', message: 'Interest rate must be greater than 0' });
  }
  
  if (loanDetails.interestRate > 50) {
    errors.push({ field: 'interestRate', message: 'Interest rate seems unusually high' });
  }
  
  if (loanDetails.tenureMonths <= 0) {
    errors.push({ field: 'tenureMonths', message: 'Loan tenure must be greater than 0' });
  }
  
  if (loanDetails.tenureMonths > 600) {
    errors.push({ field: 'tenureMonths', message: 'Loan tenure cannot exceed 50 years' });
  }
  
  return errors;
};

export const formatCurrency = (amount: number, locale: string = 'en-IN'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(Math.round(num));
};