import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { EMIResult } from '../../types/loan';
import { useTheme } from '../../contexts/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  result: EMIResult;
}

const PieChart: React.FC<PieChartProps> = ({ result }) => {
  const { isDarkMode } = useTheme();

  const data = {
    labels: ['Principal Amount', 'Total Interest'],
    datasets: [
      {
        data: [result.principalAmount, result.totalInterest],
        backgroundColor: [
          isDarkMode ? '#3B82F6' : '#2563EB',
          isDarkMode ? '#8B5CF6' : '#7C3AED',
        ],
        borderColor: [
          isDarkMode ? '#60A5FA' : '#3B82F6',
          isDarkMode ? '#A78BFA' : '#8B5CF6',
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          isDarkMode ? '#60A5FA' : '#3B82F6',
          isDarkMode ? '#A78BFA' : '#8B5CF6',
        ],
        hoverBorderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDarkMode ? '#E5E7EB' : '#374151',
          font: {
            size: 12,
            weight: '500',
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
        titleColor: isDarkMode ? '#FFFFFF' : '#111827',
        bodyColor: isDarkMode ? '#E5E7EB' : '#374151',
        borderColor: isDarkMode ? '#374151' : '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const value = context.parsed;
            const total = result.totalAmount;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
  };

  return (
    <div className="h-80">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;