import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Background */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`} />
      
      {/* Animated Geometric Patterns */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-1000 ${
              isDarkMode ? 'bg-white/5' : 'bg-black/5'
            }`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Floating Animation */}
      <style jsx>{`
        .absolute.rounded-full {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;