import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import EMICalculator from './components/EMICalculator';
import ThemeToggle from './components/ThemeToggle';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <ThemeToggle />
        <EMICalculator />
      </div>
    </ThemeProvider>
  );
}

export default App;