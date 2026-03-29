# VS Code Agent Configuration

This file configures GitHub Copilot's agent behavior for the React Native Enterprise Template project.

## Project Context

This is an advanced **React Native + Expo** project with:

- Full TypeScript type safety
- NativeWind for Tailwind CSS styling
- Zustand for state management
- React Query for data fetching
- i18next for internationalization
- MMKV for encrypted storage
- Custom logging system
- React Hook Form + Zod validation

## Agent Guidelines

### Code Style Preferences

- **TypeScript**: Always use strict mode, prefer explicit types over `any`
- **Component Architecture**: Functional components with React hooks only
- **Styling**: Use Tailwind CSS (NativeWind) with `className` prop, avoid inline styles
- **State Management**:
  - Component-level: React hooks (`useState`, `useContext`)
  - App-level: Zustand stores in `store/` directory
  - Server state: React Query hooks in `api/` directory
- **Imports**: Use path aliases (`@/`) defined in `tsconfig.json`
- **File Organization**: Follow the existing directory structure

### Development Practices

- Always run `bun lint` before committing code
- Add types for all function parameters and return values
- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks in `hooks/` directory
- Use constants from `constants/` for configuration values
- Leverage utility functions from `utils/` (logger, toast, storage)

### When Creating Files

- **Components**: Place in `components/ui/` (reusable) or `components/feature/` (business logic)
- **API Hooks**: Create in `api/` with React Query patterns
- **Stores**: Create in `store/` using Zustand
- **Custom Hooks**: Create in `hooks/` directory
- **Utils**: Add to `utils/` directory if reusable
- **Types**: Define in `types/api.ts` for API types
- **Constants**: Add to `constants/defaults.ts` for app config

### Tailwind CSS in React Native

- Use NativeWind utility classes for styling
- Dark mode: Use `dark:` prefix for dark mode colors (e.g., `dark:border-neutral-600`)
- Responsive: NativeWind supports responsive prefixes (e.g., `md:`, `lg:`)
- Never use StyleSheet.create() anymore
- Color utility classes work the same as web Tailwind

### Common Patterns

#### API Integration

```typescript
// api/posts.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/hooks/use-api";
import type { Post } from "@/types";

export const postKeys = {
  all: ["posts"] as const,
  list: () => [...postKeys.all, "list"] as const,
};

export const usePosts = () => {
  return useQuery({
    queryKey: postKeys.list(),
    queryFn: () => api.get<Post[]>("/posts"),
  });
};
```

#### State Management

```typescript
// store/use-counter-store.ts
import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

#### Custom Hooks

```typescript
// hooks/use-custom-hook.ts
import { useEffect, useState } from "react";

export function useCustomHook() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Logic here
  }, []);

  return { data };
}
```

### Error Handling

- Always wrap API calls in try-catch
- Use `logger.error()` for error logging
- Show user-friendly error messages via `toast.error()`
- For async operations, handle loading and error states with Zustand or React Query

### Testing & Quality

- Code must pass ESLint: `bun lint`
- TypeScript types must be strict and accurate
- Test on both iOS and Android when possible
- Use `bun start` to run the dev server

### Git Commit Messages

- Use clear, descriptive messages
- Start with a verb: "Add", "Fix", "Update", "Remove", "Refactor"
- Example: "Add user authentication API integration"

### Documentation

- Add JSDoc comments to exported functions
- Document complex components with inline comments
- Update README.md when adding new features
- Include type definitions in function signatures

## Special Considerations

### NativeWind Setup

- Tailwind CSS v3 is required (v4 not supported)
- `global.css` must be imported in `app/_layout.tsx`
- Metro bundler is configured with NativeWind plugin
- Babel is configured with NativeWind preset

### Internationalization

- Always use `useTranslation()` hook from `react-i18next`
- Add translation keys to both `locales/en-US.json` and `locales/zh-CN.json`
- Group related translations (e.g., `"home.title"`, `"home.description"`)

### Cross-Platform Considerations

- Test on web, iOS, and Android
- Use `.web.ts` files for web-specific implementations (example: `use-color-scheme.web.ts`)
- Be aware of platform-specific APIs and limitations
- Use try-catch for platform-specific features

## Quick Commands

```bash
bun start       # Start dev server
bun ios         # Open iOS simulator
bun android     # Open Android emulator
bun web         # Open web version
bun lint        # Run ESLint
```

## When to Ask for Help

- Architectural decisions about state or data flow
- Performance optimization questions
- Dependency or library compatibility issues
- Project structure reorganization
- Complex TypeScript type definitions
