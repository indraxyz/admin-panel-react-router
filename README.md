# Admin Dashboard

A modern, production-ready admin dashboard boilerplate built with React Router v7, TypeScript, and Tailwind CSS. Designed for scalability, maintainability, and developer experience.

## Features

- **Authentication** - Complete auth flow with sign in, sign up, and sign out
- **Route Protection** - Client-side route guards for protected routes
- **State Management** - Zustand with localStorage persistence
- **Type Safety** - Full TypeScript support with strict mode
- **Modern UI** - Tailwind CSS v4 with dark/light mode support
- **Form Handling** - React Hook Form with Zod validation
- **Code Quality** - ESLint, Prettier, and TypeScript configured
- **SPA Mode** - Client-side rendering optimized for static hosting (AWS, Vercel, Netlify)
- **Component Library** - Radix UI primitives with shadcn/ui styling

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React Router v7 (SPA mode) |
| Language | TypeScript 5.9 |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Build | Vite 7 |
| Package Manager | pnpm |

## Project Structure

```
dashboard-admin/
├── app/                          # Application source code
│   ├── components/               # Shared UI components
│   │   ├── ui/                   # Base components (Button, Input, Card, etc.)
│   │   ├── app-sidebar.tsx       # Dashboard sidebar navigation
│   │   ├── nav-main.tsx          # Main navigation menu
│   │   ├── nav-projects.tsx      # Projects navigation section
│   │   ├── nav-user.tsx          # User dropdown navigation
│   │   ├── route-guards.tsx      # Client-side auth route protection
│   │   ├── team-switcher.tsx     # Team/workspace switcher
│   │   └── theme-toggle.tsx      # Dark/light mode toggle
│   ├── contexts/                 # React contexts
│   │   └── auth.context.tsx      # Auth state wrapper for components
│   ├── features/                 # Feature-based modules (see below)
│   │   ├── auth/                 # Authentication feature
│   │   └── README.md             # Feature organization guide
│   ├── hooks/                    # Shared custom hooks
│   │   ├── use-mobile.ts         # Mobile detection hook
│   │   └── use-theme.tsx         # Theme management hook
│   ├── lib/                      # Utilities and configuration
│   │   ├── api/                  # API client setup
│   │   ├── config/               # Environment configuration
│   │   ├── constants/            # App-wide constants (routes, roles)
│   │   └── utils/                # Helper functions (cn, zod-resolver)
│   ├── routes/                   # File-based routing
│   │   ├── _auth/                # Auth routes (guest-only)
│   │   ├── _dashboard/           # Protected dashboard routes
│   │   ├── $.tsx                 # Root catch-all (404)
│   │   └── home.tsx              # Landing page
│   ├── stores/                   # Zustand stores
│   │   └── auth.store.ts         # Authentication state
│   ├── types/                    # Global TypeScript types
│   ├── app.css                   # Global styles
│   ├── root.tsx                  # App root with providers
│   └── routes.ts                 # Route configuration
├── public/                       # Static assets
├── .vscode/                      # VS Code settings
├── components.json               # shadcn/ui configuration
├── Dockerfile                    # Docker configuration
├── amplify.yml                   # AWS Amplify deployment config
└── [config files]                # ESLint, Prettier, TypeScript, Vite configs
```

## Folder Structure Philosophy

This project follows a **hybrid structure** combining feature-based organization with shared utilities for optimal scalability and team collaboration.

### Core Directories Explained

#### `app/components/`
**Purpose**: Shared, reusable UI components used across multiple features.

```
components/
├── ui/                    # Primitive UI components (shadcn/ui)
│   ├── button.tsx         # Buttons, links
│   ├── input.tsx          # Form inputs
│   ├── card.tsx           # Card containers
│   └── ...                # Other primitives
├── app-sidebar.tsx        # Layout-specific components
├── route-guards.tsx       # Auth protection wrappers
└── theme-toggle.tsx       # Global utilities
```

**Team ownership**: Shared across teams. Changes should be reviewed carefully.

#### `app/features/`
**Purpose**: Self-contained feature modules with their own API, components, hooks, and types.

```
features/
└── auth/                         # Feature: Authentication
    ├── api/
    │   └── auth.ts               # API client functions
    ├── hooks/
    │   └── useAuth.ts            # Feature-specific hooks
    └── types/
        └── index.ts              # Feature types
```

**Team ownership**: Each feature can be owned by a specific team or developer.

**Benefits**:
- **Co-location**: All related code lives together
- **Clear boundaries**: Easy to understand feature scope
- **Parallel development**: Teams can work independently
- **Easy refactoring**: Changes are localized to the feature

#### `app/contexts/`
**Purpose**: React contexts that need to wrap components.

```
contexts/
└── auth.context.tsx       # Auth state provider for React tree
```

**Note**: Prefer Zustand stores over contexts when possible. Contexts are used when you need to integrate with React Router or provide state to component trees.

#### `app/hooks/`
**Purpose**: Shared custom hooks used across multiple features.

```
hooks/
├── use-mobile.ts          # Device detection
└── use-theme.tsx          # Theme management with provider
```

**Guideline**: Only add hooks here if they're used by 2+ features. Feature-specific hooks belong in `features/<feature>/hooks/`.

#### `app/lib/`
**Purpose**: Utilities, configuration, and shared infrastructure.

```
lib/
├── api/
│   └── client.ts          # HTTP client setup (fetch wrapper)
├── config/
│   └── env.ts             # Environment variables
├── constants/
│   └── index.ts           # App-wide constants (ROUTES, USER_ROLES)
├── utils/
│   ├── cn.ts              # Tailwind class merge utility
│   └── zod-resolver.ts    # Custom Zod resolver for react-hook-form
└── utils.ts               # General utilities
```

#### `app/stores/`
**Purpose**: Global state management with Zustand.

```
stores/
└── auth.store.ts          # Authentication state & persistence
```

**Guideline**: Feature-specific state should stay in the feature. Only truly global state belongs here.

#### `app/routes/`
**Purpose**: File-based routing with React Router v7.

```
routes/
├── _auth/                 # Auth routes (prefixed with _ for grouping)
│   ├── signin.tsx
│   ├── signup.tsx
│   └── signout.tsx
├── _dashboard/            # Dashboard routes (nested layout)
│   ├── _layout.tsx        # Dashboard layout wrapper
│   ├── _index.tsx         # /dashboard (index route)
│   ├── account.tsx        # /dashboard/account
│   ├── settings.tsx       # /dashboard/settings
│   └── $.tsx              # Dashboard catch-all
├── $.tsx                  # Root catch-all (404)
└── home.tsx               # Landing page (/)
```

**Conventions**:
- `_` prefix: Grouping folder or layout file (not part of URL)
- `$.tsx`: Catch-all/splat route
- `_index.tsx`: Index route for parent path

### Route Configuration

Routes are explicitly defined in `app/routes.ts`:

```typescript
export default [
  index("routes/home.tsx"),
  route("signin", "routes/_auth/signin.tsx"),
  route("signup", "routes/_auth/signup.tsx"),
  route("signout", "routes/_auth/signout.tsx"),
  route("dashboard", "routes/_dashboard/_layout.tsx", [
    index("routes/_dashboard/_index.tsx"),
    route("account", "routes/_dashboard/account.tsx"),
    route("settings", "routes/_dashboard/settings.tsx"),
    route("*", "routes/_dashboard/$.tsx"),
  ]),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
```

## Authentication Architecture

This project uses **client-side authentication** with Zustand for state management and localStorage for persistence.

### Auth Store (`stores/auth.store.ts`)
- Manages user state, authentication status, and loading states
- Persists auth data to localStorage
- Provides actions: `signIn`, `signUp`, `signOut`, `updateUser`

### Route Guards (`components/route-guards.tsx`)
```tsx
<RequireAuth>   {/* Redirects to /signin if not authenticated */}
<RequireGuest>  {/* Redirects to /dashboard if authenticated */}
```

### Auth Context (`contexts/auth.context.tsx`)
Wraps the Zustand store for React component tree access via `useAuthContext()`.

### Flow
1. User visits protected route
2. `RequireAuth` checks `isAuthenticated` from auth store
3. If not authenticated, redirects to `/signin`
4. On sign in, auth store updates and persists to localStorage
5. User is redirected to dashboard

**Note**: This is a client-side only SPA (`ssr: false`). For production with sensitive data, implement proper backend authentication with HTTP-only cookies and server-side session validation.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dashboard-admin

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Demo Credentials

```
Email: admin@example.com
Password: password123
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm check` | Run all checks (typecheck + lint + format) |

## Routes

| Route | Description | Auth |
|-------|-------------|------|
| `/` | Landing page | Guest |
| `/signin` | Sign in page | Guest |
| `/signup` | Sign up page | Guest |
| `/signout` | Sign out action | Authenticated |
| `/dashboard` | Dashboard home | Authenticated |
| `/dashboard/account` | Account settings | Authenticated |
| `/dashboard/settings` | App settings | Authenticated |

## Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# API Configuration (optional - uses mock auth by default)
VITE_API_URL=https://api.example.com
```

### Mock Authentication

The app includes mock authentication for development. To connect to a real backend:

1. Set `USE_MOCK_AUTH = false` in `app/features/auth/api/auth.ts`
2. Configure `VITE_API_URL` in your `.env` file
3. Implement your API endpoints to match the expected interfaces

## Deployment

### AWS Amplify

The project includes an `amplify.yml` configuration for AWS Amplify deployment.

```bash
# Build command
pnpm build

# Output directory
build/client
```

### Docker

```bash
# Build the image
docker build -t dashboard-admin .

# Run the container
docker run -p 3000:3000 dashboard-admin
```

### Static Hosting (Vercel, Netlify, etc.)

Since this is an SPA (`ssr: false`), deploy the `build/client` directory to any static hosting provider.

**Important**: Configure your hosting to redirect all routes to `index.html` for client-side routing.

## Extending the Dashboard

### Adding a New Route

1. Create a new file in `app/routes/_dashboard/`:

```tsx
// app/routes/_dashboard/users.tsx
import type { Route } from "./+types/users";

export function meta(_args: Route.MetaArgs) {
  return [{ title: "Users - Admin Panel" }];
}

export default function UsersPage() {
  return (
    <div>
      <h1>Users</h1>
      {/* Your content */}
    </div>
  );
}
```

2. Register in `app/routes.ts`:

```typescript
route("dashboard", "routes/_dashboard/_layout.tsx", [
  // ... existing routes
  route("users", "routes/_dashboard/users.tsx"),
]),
```

3. Add navigation in `app/components/app-sidebar.tsx`

### Adding a New Feature

Follow the feature-based structure:

```
app/features/users/
├── api/
│   └── users.ts           # API functions (getUsers, createUser, etc.)
├── components/
│   └── user-table.tsx     # Feature-specific components
├── hooks/
│   └── useUsers.ts        # Feature hooks (useUserQuery, etc.)
└── types/
    └── index.ts           # Feature types (User, CreateUserInput, etc.)
```

## Team Organization Guidelines

### Ownership Model

| Directory | Ownership | Review Required |
|-----------|-----------|-----------------|
| `app/components/ui/` | UI Team / Shared | Yes - affects all features |
| `app/features/<name>/` | Feature Team | Feature team only |
| `app/lib/` | Platform Team | Yes - affects infrastructure |
| `app/stores/` | Platform Team | Yes - affects global state |
| `app/routes/` | Respective feature teams | Feature team + routing review |

### Adding Team Members

1. **New to project**: Start with feature work in `app/features/`
2. **UI changes**: Coordinate with UI team for `components/ui/` changes
3. **Cross-cutting changes**: Require broader review for `lib/`, `stores/`

### Code Review Checklist

- [ ] Feature code stays within feature boundaries
- [ ] Shared components are truly reusable
- [ ] Types are properly defined
- [ ] No circular dependencies between features
- [ ] Routes are registered in `routes.ts`

## Architecture Decisions

### Why SPA Mode?

This boilerplate is configured as a Single Page Application (`ssr: false`) for:
- Simpler deployment to static hosts (S3, CloudFront, Amplify, Vercel, Netlify)
- Lower infrastructure costs (no server required)
- Better suited for admin dashboards behind authentication
- Faster development iteration

### Why Zustand over Context?

- No provider wrapper needed
- Built-in localStorage persistence
- Better performance with selective subscriptions
- Actions callable outside React components

### Why Feature-Based Structure?

- **Scalability**: Easy to add new features without cluttering root directories
- **Team autonomy**: Teams can own and develop features independently
- **Clear boundaries**: Reduces coupling between features
- **Easier onboarding**: New developers can focus on one feature at a time

## Code Quality

### ESLint Configuration

- TypeScript strict rules
- React and React Hooks rules
- JSX accessibility (jsx-a11y)
- Prettier integration

### Prettier Configuration

- 2 space indentation
- Double quotes
- Trailing commas (ES5)
- Tailwind CSS class sorting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the feature-based structure for new features
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT License - feel free to use this boilerplate for your projects.

## Acknowledgments

- [React Router](https://reactrouter.com/) - Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Primitives
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
