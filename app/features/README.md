# Features Directory

This directory follows a **feature-based organization** pattern for better scalability and maintainability.

## Structure

Each feature is organized as a self-contained module with its own:

- `api/` - API client functions for the feature
- `components/` - Feature-specific React components
- `hooks/` - Feature-specific React hooks
- `server/` - Server-side utilities and actions
  - `actions/` - Server actions (form handlers, mutations)
  - Other server utilities (session management, data access, etc.)
- `types/` - TypeScript types specific to the feature

## Current Features

### `auth/`
Authentication feature including:
- User authentication (sign in, sign up, sign out)
- Session management
- User data access
- Auth-related types and hooks

## Adding New Features

When adding a new feature:

1. Create a new directory under `features/` (e.g., `features/users/`)
2. Organize code by type within the feature:
   - API calls → `features/users/api/`
   - Components → `features/users/components/`
   - Hooks → `features/users/hooks/`
   - Server code → `features/users/server/`
   - Types → `features/users/types/`
3. Keep shared/utility code in `lib/` at the root level
4. Keep base UI components in `components/ui/`

## Benefits

- **Co-location**: Related code lives together
- **Clear boundaries**: Easy to understand feature scope
- **Scalability**: Easy to add new features without cluttering root directories
- **Maintainability**: Changes to a feature are localized
- **Team collaboration**: Multiple developers can work on different features without conflicts
