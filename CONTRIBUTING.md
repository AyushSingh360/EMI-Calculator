# Contributing to EMI Loan Calculator

Thank you for your interest in contributing to the EMI Loan Calculator! We welcome contributions from developers of all skill levels. This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Requirements](#testing-requirements)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)

## 📜 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please read our [Community Guidelines](COMMUNITY.md) before contributing.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18.0 or higher)
- npm (version 8.0 or higher) or yarn
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/emi-calculator.git
   cd emi-calculator
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/AyushSingh360/emi-calculator.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Verify setup**
   - Open `http://localhost:5173` in your browser
   - Ensure the application loads correctly
   - Test basic functionality (EMI calculation, theme toggle)

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes** - Fix issues and improve stability
- **Feature enhancements** - Add new functionality
- **Documentation** - Improve docs, comments, and examples
- **Performance improvements** - Optimize code and user experience
- **UI/UX improvements** - Enhance design and usability
- **Testing** - Add or improve test coverage
- **Accessibility** - Improve accessibility features

### Contribution Workflow

1. **Check existing issues** - Look for existing issues or discussions
2. **Create an issue** - If none exists, create one describing your contribution
3. **Get assignment** - Wait for maintainer approval before starting work
4. **Create a branch** - Create a feature branch from `main`
5. **Make changes** - Implement your changes following our guidelines
6. **Test thoroughly** - Ensure all tests pass and functionality works
7. **Submit PR** - Create a pull request with detailed description

## 🔄 Pull Request Process

### Before Submitting

- [ ] Ensure your code follows our style guidelines
- [ ] Add or update tests as needed
- [ ] Update documentation if required
- [ ] Test your changes thoroughly
- [ ] Rebase your branch on the latest `main`

### PR Requirements

1. **Clear title and description**
   ```
   Title: Add currency selection feature
   
   Description:
   - Adds dropdown for currency selection (USD, EUR, INR)
   - Updates formatting functions to support multiple currencies
   - Includes tests for new functionality
   - Fixes #123
   ```

2. **Link related issues**
   - Use keywords like "Fixes #123" or "Closes #456"

3. **Include screenshots**
   - For UI changes, include before/after screenshots
   - For new features, show the feature in action

4. **Keep PRs focused**
   - One feature or fix per PR
   - Avoid mixing unrelated changes

### Review Process

1. **Automated checks** - All CI checks must pass
2. **Code review** - At least one maintainer review required
3. **Testing** - Manual testing by reviewers
4. **Approval** - PR approved by maintainer
5. **Merge** - Squash and merge to main branch

## 🎨 Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow existing naming conventions
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

```typescript
/**
 * Calculates the EMI for a given loan amount, interest rate, and tenure
 * @param principal - The loan amount
 * @param annualRate - Annual interest rate as percentage
 * @param months - Loan tenure in months
 * @returns Monthly EMI amount
 */
export const calculateEMI = (
  principal: number, 
  annualRate: number, 
  months: number
): number => {
  // Implementation
};
```

### React Components

- Use functional components with hooks
- Follow the existing component structure
- Use proper TypeScript interfaces for props
- Implement proper error boundaries

```typescript
interface ComponentProps {
  title: string;
  onAction: (value: string) => void;
  isLoading?: boolean;
}

const MyComponent: React.FC<ComponentProps> = ({ 
  title, 
  onAction, 
  isLoading = false 
}) => {
  // Component implementation
};
```

### CSS/Styling

- Use Tailwind CSS classes
- Follow the existing design system
- Ensure responsive design
- Test in both light and dark modes

```tsx
<div className={`
  backdrop-blur-md rounded-2xl border shadow-xl transition-all duration-300
  ${isDarkMode 
    ? 'bg-gray-800/80 border-gray-700' 
    : 'bg-white/80 border-gray-200'
  }
`}>
```

### File Organization

- Keep components in `src/components/`
- Place utilities in `src/utils/`
- Add types to `src/types/`
- Follow existing folder structure

## 🧪 Testing Requirements

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Guidelines

- Write tests for new functionality
- Maintain or improve test coverage
- Test edge cases and error conditions
- Use descriptive test names

```typescript
describe('calculateEMI', () => {
  it('should calculate correct EMI for valid inputs', () => {
    const result = calculateEMI(100000, 10, 12);
    expect(result).toBeCloseTo(8791.59, 2);
  });

  it('should handle zero interest rate', () => {
    const result = calculateEMI(100000, 0, 12);
    expect(result).toBe(8333.33);
  });
});
```

## 🐛 Issue Reporting

### Bug Reports

When reporting bugs, please include:

- **Clear title** - Descriptive summary of the issue
- **Steps to reproduce** - Detailed steps to recreate the bug
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Environment** - Browser, OS, device information
- **Screenshots** - Visual evidence if applicable

### Bug Report Template

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Enter '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- Browser: Chrome 120.0
- OS: Windows 11
- Device: Desktop

**Screenshots**
Add screenshots if applicable.
```

## 💡 Feature Requests

### Suggesting Features

- Check existing issues and discussions first
- Provide clear use case and rationale
- Consider implementation complexity
- Be open to alternative solutions

### Feature Request Template

```markdown
**Feature Description**
Clear description of the proposed feature.

**Use Case**
Why is this feature needed? What problem does it solve?

**Proposed Solution**
How should this feature work?

**Alternative Solutions**
Any alternative approaches considered?

**Additional Context**
Screenshots, mockups, or examples.
```

## 📚 Documentation

### Documentation Standards

- Keep README.md up to date
- Document new features and APIs
- Include code examples
- Update inline comments

### Documentation Checklist

- [ ] Update README.md if needed
- [ ] Add JSDoc comments for new functions
- [ ] Update type definitions
- [ ] Include usage examples

## 🏷️ Commit Guidelines

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(calculator): add currency selection dropdown

fix(charts): resolve pie chart rendering issue in dark mode

docs(readme): update installation instructions

style(components): improve button hover animations
```

## 🎯 Development Tips

### Recommended Tools

- **VS Code** with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter

### Debugging

- Use React Developer Tools
- Check browser console for errors
- Use TypeScript strict mode
- Test in multiple browsers

### Performance

- Use React.memo for expensive components
- Implement proper loading states
- Optimize bundle size
- Test on slower devices

## ❓ Getting Help

If you need help with contributing:

1. **Check documentation** - README, issues, discussions
2. **Ask questions** - Create a discussion or comment on issues
3. **Join community** - Participate in project discussions
4. **Contact maintainers** - Reach out to project maintainers

## 🙏 Recognition

Contributors will be recognized in:

- Project README.md
- Release notes
- GitHub contributors page
- Special mentions for significant contributions

Thank you for contributing to the EMI Loan Calculator! Your efforts help make this project better for everyone.

---

**Questions?** Feel free to reach out by creating an issue or starting a discussion!