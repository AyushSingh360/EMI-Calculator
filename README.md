# EMI Loan Calculator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5.0-FF6384.svg)](https://www.chartjs.org/)

A comprehensive and visually stunning EMI (Equated Monthly Installment) Loan Calculator web application built with React, TypeScript, and modern web technologies. Features real-time calculations, interactive charts, dark mode support, and detailed amortization schedules.

## 🚀 Features

- **Real-time EMI Calculations** - Instant calculations as you type using the standard EMI formula
- **Interactive Charts** - Pie charts for principal vs interest breakdown and line charts for payment schedules
- **Amortization Schedule** - Detailed month-by-month payment breakdown with year filtering
- **Dark/Light Mode** - Smooth theme transitions with persistent user preferences
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Professional UI** - Modern glass-morphism design with subtle animations
- **Accessibility** - ARIA labels, keyboard navigation, and screen reader support
- **Data Export** - Download amortization schedules as CSV files
- **Input Validation** - Comprehensive error handling and user feedback

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn**
- Modern web browser with JavaScript enabled

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AyushSingh360/emi-calculator.git
   cd emi-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🎯 Usage

### Basic EMI Calculation

1. **Enter Loan Details**
   - Principal Amount: Enter the loan amount (e.g., ₹1,000,000)
   - Interest Rate: Enter annual interest rate (e.g., 8.5%)
   - Loan Tenure: Select years or months and enter duration

2. **View Results**
   - Monthly EMI amount
   - Total amount payable
   - Total interest payable
   - Principal amount breakdown

3. **Analyze Charts**
   - Pie chart shows principal vs interest ratio
   - Line chart displays payment progression over time

4. **Review Amortization Schedule**
   - Month-by-month payment breakdown
   - Filter by specific years
   - Download complete schedule as CSV

### Advanced Features

- **Theme Toggle**: Click the sun/moon icon to switch between light and dark modes
- **Responsive Design**: Works seamlessly on all device sizes
- **Real-time Updates**: All calculations update instantly as you modify inputs

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── charts/         # Chart components (Pie, Line)
│   ├── AmortizationTable.tsx
│   ├── EMICalculator.tsx
│   ├── EMIResultCard.tsx
│   ├── LoanInputForm.tsx
│   └── ThemeToggle.tsx
├── contexts/           # React contexts
│   └── ThemeContext.tsx
├── types/              # TypeScript type definitions
│   └── loan.ts
├── utils/              # Utility functions
│   └── emiCalculations.ts
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🧮 EMI Formula

The application uses the standard EMI calculation formula:

```
EMI = [P × R × (1+R)^N] / [(1+R)^N-1]

Where:
P = Principal loan amount
R = Monthly interest rate (Annual rate / 12 / 100)
N = Number of monthly installments
```

## 🎨 Customization

### Theme Colors

The application uses a comprehensive color system defined in `tailwind.config.js`:

- **Primary**: Blue shades for main UI elements
- **Secondary**: Purple shades for accents
- **Success**: Green shades for positive indicators
- **Warning**: Amber shades for alerts
- **Error**: Red shades for error states

### Adding New Features

1. Create new components in the `src/components/` directory
2. Add type definitions in `src/types/`
3. Implement utility functions in `src/utils/`
4. Update the main calculator component as needed

## 🔧 Troubleshooting

### Common Issues

**Issue**: Application won't start
- **Solution**: Ensure Node.js version 18+ is installed and run `npm install`

**Issue**: Charts not displaying
- **Solution**: Check browser console for errors and ensure Chart.js dependencies are installed

**Issue**: Calculations seem incorrect
- **Solution**: Verify input values are within valid ranges (positive numbers)

**Issue**: Dark mode not persisting
- **Solution**: Check if localStorage is enabled in your browser

### Performance Issues

- Clear browser cache and reload
- Ensure you're using the latest version of the application
- Check browser developer tools for any console errors

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [Chart.js](https://www.chartjs.org/)
- Icons from [Lucide React](https://lucide.dev/)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#-troubleshooting)
2. Search existing [issues](https://github.com/AyushSingh360/emi-calculator/issues)
3. Create a new issue with detailed information
4. Join our [community discussions](https://github.com/AyushSingh360/emi-calculator/discussions)

---

**Made with ❤️ by [AyushSingh360](https://github.com/AyushSingh360)**