# Contributing to Solar System Emulator

Thank you for your interest in contributing to the Solar System Emulator! This document provides guidelines and instructions for contributing.

## 🎯 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser/device information
- Screenshots (if applicable)

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature has already been requested
- Clearly describe the feature and its benefits
- Provide examples or mockups if possible

### Submitting Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/Ajayprakashk7/solar-system-emulator.git
   cd solar-system-emulator
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add TypeScript types for new features
   - Include JSDoc comments for utilities
   - Test on both desktop and mobile

4. **Test your changes**
   ```bash
   npm run lint
   npm run build
   npm run dev
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
   
   Use conventional commit messages:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Test changes
   - `chore:` Build/tooling changes

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

## 📋 Development Guidelines

### Code Style

- **JavaScript/TypeScript**: Follow ESLint configuration
- **Formatting**: Use Prettier (automatic on save)
- **Naming**: Use camelCase for variables, PascalCase for components
- **Files**: Use descriptive names, group related files

### TypeScript

- Add types for all new functions and components
- Use interfaces over types for object shapes
- Avoid `any` - use `unknown` if type is truly unknown
- Export types that might be reused

### Component Guidelines

- Keep components focused and single-purpose
- Extract reusable logic into hooks
- Use React contexts sparingly
- Prefer composition over props drilling

### Performance

- Test on low-end devices
- Use React.memo() for expensive components
- Dispose Three.js resources properly
- Profile with Chrome DevTools before optimizing

### Accessibility

- Include ARIA labels for interactive elements
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios (WCAG 2.1 AA)

### Documentation

- Add JSDoc comments for utilities and complex functions
- Update README.md for new features
- Include inline comments for complex logic
- Document breaking changes

## 🧪 Testing

Before submitting:

```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build

# Manual testing
npm run dev
```

Test on:
- ✅ Desktop Chrome/Edge
- ✅ Desktop Safari
- ✅ Desktop Firefox
- ✅ Mobile Safari (iOS)
- ✅ Mobile Chrome (Android)

## 🎨 Adding New Features

### Adding a New Planet/Moon

1. Add texture to `public/images/bodies/` or `public/images/moons/`
2. Update `components/solar-system/lib/planetsData.js`
3. Add educational content to `lib/educational-content.ts`
4. Test rendering and performance

### Adding NASA API Integration

1. Create route in `app/api/nasa/[feature]/route.ts`
2. Add validation schema in `lib/validation.ts`
3. Implement rate limiting
4. Add error handling
5. Update analytics tracking
6. Document in README.md

### Improving Performance

1. Profile with Chrome DevTools
2. Identify bottlenecks
3. Implement optimization
4. Test on low-end devices
5. Measure improvement
6. Document changes

## 📦 Project Structure

```
solar-system-emulator/
├── app/                      # Next.js App Router
│   ├── api/nasa/            # NASA API routes
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── solar-system/        # 3D components
│   │   ├── celestial/       # Planets, moons, sun
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── motion/          # Animation
│   │   ├── services/        # NASA API
│   │   ├── ui/              # UI components
│   │   └── utils/           # Utilities
│   └── ui/                  # Shared UI
├── config/                  # Configuration
├── lib/                     # Core libraries
├── public/                  # Static assets
└── scripts/                 # Build scripts
```

## 🤔 Questions?

- Open an issue for questions
- Check existing issues and PRs
- Review documentation files

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Solar System Emulator! 🚀
