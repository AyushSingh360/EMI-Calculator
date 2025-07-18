export interface LoanDetails {
  principal: number;
  interestRate: number;
  tenureMonths: number;
}

export interface EMIResult {
  monthlyEMI: number;
  totalAmount: number;
  totalInterest: number;
  principalAmount: number;
}

export interface AmortizationEntry {
  month: number;
  emi: number;
  principalPayment: number;
  interestPayment: number;
  remainingBalance: number;
  year: number;
}

export interface ValidationError {
  field: string;
  message: string;
}