import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 
        backdrop-blur-md border shadow-lg hover:scale-110 active:scale-95
        ${isDarkMode 
          ? 'bg-gray-800/80 border-gray-700 text-yellow-400 hover:bg-gray-700/80' 
          : 'bg-white/80 border-gray-200 text-gray-700 hover:bg-gray-50/80'
        }
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;