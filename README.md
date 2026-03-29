# React Native Enterprise Template 🚀

An advanced React Native template built with [Expo](https://expo.dev), featuring enterprise-grade architecture with type safety, state management, API integration, internationalization, and modern tooling.

## Features

- ✅ **Type Safety** - Full TypeScript support with strict mode
- ✅ **State Management** - Zustand for simple, scalable state
- ✅ **Data Fetching** - TanStack React Query with custom hooks
- ✅ **Styling** - NativeWind (Tailwind CSS for React Native)
- ✅ **Internationalization** - i18next with EN/ZH locales
- ✅ **Storage** - MMKV with encrypted secure storage
- ✅ **Logging** - Custom logger with color support
- ✅ **Form Validation** - React Hook Form + Zod validation
- ✅ **Notifications** - Sonner Native toast notifications
- ✅ **Dark Mode** - Built-in theme support with Tailwind

## Quick Start

### Prerequisites

- Node.js 18+
- Bun or npm/yarn
- iOS/Android dev environment (optional, Expo Go works too)

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun start

# Run on specific platform
bun ios      # iOS simulator
bun android  # Android emulator
bun web      # Web browser
```

## Project Structure

```
app/                    # Expo Router pages (file-based routing)
  (tabs)/              # Tab navigation layout
  _layout.tsx          # Root layout with providers
components/
  ui/                  # Reusable UI components
  feature/             # Business-specific components
api/                   # API hooks (useUsers, usePosts, etc)
store/                 # Zustand stores
hooks/                 # Custom React hooks
utils/                 # Utilities (logger, toast, storage)
constants/             # Configuration constants
locales/               # i18n translations
types/                 # TypeScript type definitions
```

## Key Technologies

| Library         | Version | Purpose              |
| --------------- | ------- | -------------------- |
| React Native    | 0.81.5  | Mobile framework     |
| Expo SDK        | 54      | Development platform |
| NativeWind      | 4.2.3   | Tailwind CSS styling |
| Zustand         | 5.0.12  | State management     |
| React Query     | 5.95.2  | Data fetching        |
| React Hook Form | 7.72.0  | Form management      |
| Zod             | 4.3.6   | Schema validation    |
| i18next         | 26.0.1  | Internationalization |

## Configuration

### Environment Variables

Configure in `constants/env.ts` for development, staging, and production:

```typescript
export const Config = {
  API_BASE_URL: "https://api.example.com",
  API_TIMEOUT: 20000,
  ENABLE_LOGGING: true,
  // ... more config
};
```

### Theme & Colors

- Tailwind CSS: `tailwind.config.js`
- Dark mode colors: Configured via `dark:` prefix in classNames
- Custom colors: Extend in `tailwind.config.js` theme section

### Logging

```typescript
import { logger } from "@/utils";

logger.info("Message"); // Green
logger.warn("Warning"); // Yellow
logger.error("Error"); // Red
logger.debug("Debug"); // Cyan
```

### API Requests

```typescript
// api/posts.ts - Example API hook
export const usePosts = () => {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: () => api.get<Post[]>("/posts"),
  });
};

// Usage in components
const { data: posts, isLoading } = usePosts();
```

### Storage

```typescript
import { mmkvStorage, secureStorage } from "@/utils";

// Auto-synced storage
mmkvStorage.set("key", value);
const data = mmkvStorage.get("key");

// Encrypted storage
secureStorage.set("token", encryptedToken);
```

### Internationalization

```typescript
import { useTranslation } from "react-i18next";

export function MyComponent() {
  const { t } = useTranslation();
  return <Text>{t("home.title")}</Text>;
}
```

Add translations in `locales/en-US.json` and `locales/zh-CN.json`.

## Scripts

```bash
bun start       # Start dev server
bun ios         # Open iOS simulator
bun android     # Open Android emulator
bun web         # Open web version
bun lint        # Run ESLint
```

## Best Practices

- **Components**: Keep components small and focused
- **Hooks**: Extract reusable logic into custom hooks
- **State**: Use Zustand for app-level state, React hooks for local state
- **API**: Leverage React Query for caching and synchronization
- **Styling**: Use Tailwind utility classes, avoid inline styles
- **Types**: Always define types for props and API responses
- **Error Handling**: Use error boundaries and try-catch in async operations

## Troubleshooting

### Build fails with NativeWind error

Ensure `tailwindcss@3` is installed (v4 not supported by NativeWind 4.x):

```bash
bun add -d tailwindcss@^3
```

### Styles not applying

1. Verify `global.css` is imported in `app/_layout.tsx`
2. Check `tailwind.config.js` content paths are correct
3. Restart Metro bundler: `Ctrl+C` then `bun start`

### Type errors

Run `bun install` to ensure all types are installed and `.nativewind-env.d.ts` is generated.

## CI/CD

This project includes automated CI/CD pipelines:

- **ESLint & Type Checks**: Run on every push and PR
- **Build Verification**: Ensures the app builds correctly
- **Security Scanning**: Checks for vulnerable dependencies
- **Automated Dependency Updates**: Weekly checks for updates

See [.github/README.md](.github/README.md) for more details.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Setting up development environment
- Code style and conventions
- Commit message format
- Pull request process
- Testing requirements

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run linting: `bun lint`
5. Commit: `git commit -m "feat: add amazing feature"`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Security

For security concerns, please see [SECURITY.md](SECURITY.md). We take security seriously and appreciate responsible disclosure.

## Code of Conduct

We are committed to providing a welcoming environment for all contributors. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for our community standards.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history and release notes.

## License

MIT - See [LICENSE](LICENSE) file for details

Copyright (c) 2026 React Native Enterprise Template Contributors
