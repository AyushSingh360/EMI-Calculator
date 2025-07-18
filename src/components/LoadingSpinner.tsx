import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const LoadingSpinner: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin ${
          isDarkMode ? 'border-blue-400' : 'border-blue-600'
        }`} />
        <div className={`absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-purple-500 animate-spin ${
          isDarkMode ? 'border-t-purple-400' : 'border-t-purple-600'
        }`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
    </div>
  );
};

export default LoadingSpinner;