import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import { AmortizationEntry } from '../../types/loan';
import { useTheme } from '../../contexts/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  schedule: AmortizationEntry[];
}

const LineChart: React.FC<LineChartProps> = ({ schedule }) => {
  const { isDarkMode } = useTheme();

  // Group by year and calculate yearly totals
  const yearlyData = schedule.reduce((acc, entry) => {
    if (!acc[entry.year]) {
      acc[entry.year] = { principal: 0, interest: 0, balance: entry.remainingBalance };
    }
    acc[entry.year].principal += entry.principalPayment;
    acc[entry.year].interest += entry.interestPayment;
    acc[entry.year].balance = entry.remainingBalance;
    return acc;
  }, {} as Record<number, { principal: number; interest: number; balance: number }>);

  const years = Object.keys(yearlyData).map(Number);
  const principalData = years.map(year => yearlyData[year].principal);
  const interestData = years.map(year => yearlyData[year].interest);
  const balanceData = years.map(year => yearlyData[year].balance);

  const data = {
    labels: years.map(year => `Year ${year}`),
    datasets: [
      {
        label: 'Principal Payment',
        data: principalData,
        borderColor: isDarkMode ? '#3B82F6' : '#2563EB',
        backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Interest Payment',
        data: interestData,
        borderColor: isDarkMode ? '#8B5CF6' : '#7C3AED',
        backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(124, 58, 237, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Remaining Balance',
        data: balanceData,
        borderColor: isDarkMode ? '#10B981' : '#059669',
        backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(5, 150, 105, 0.1)',
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y1',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#E5E7EB' : '#374151',
          font: {
            size: 12,
            weight: '500',
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
        titleColor: isDarkMode ? '#FFFFFF' : '#111827',
        bodyColor: isDarkMode ? '#E5E7EB' : '#374151',
        borderColor: isDarkMode ? '#374151' : '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `${context.dataset.label}: ₹${value.toLocaleString('en-IN')}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: isDarkMode ? '#374151' : '#E5E7EB',
        },
        ticks: {
          color: isDarkMode ? '#9CA3AF' : '#6B7280',
          font: {
            size: 11,
          },
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: isDarkMode ? '#374151' : '#E5E7EB',
        },
        ticks: {
          color: isDarkMode ? '#9CA3AF' : '#6B7280',
          font: {
            size: 11,
          },
          callback: (value) => `₹${(value as number).toLocaleString('en-IN')}`,
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: isDarkMode ? '#9CA3AF' : '#6B7280',
          font: {
            size: 11,
          },
          callback: (value) => `₹${(value as number).toLocaleString('en-IN')}`,
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div className="h-80">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;