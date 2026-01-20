# Kisum Admin Dashboard

A modern, production-ready admin dashboard boilerplate built with React Router v7, TypeScript, and Tailwind CSS. Designed for scalability, maintainability, and developer experience.

## Features

- **Authentication** - Complete auth flow with sign in, sign up, and sign out
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
| Framework | React Router v7 |
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
app/
├── components/           # Shared UI components
│   ├── ui/              # Base components (Button, Input, Card, etc.)
│   ├── app-sidebar.tsx  # Dashboard sidebar
│   ├── route-guards.tsx # Auth route protection
│   └── theme-toggle.tsx # Dark/light mode toggle
├── contexts/            # React contexts (auth wrapper)
├── stores/              # Zustand stores
│   └── auth.store.ts    # Authentication state
├── features/            # Feature modules
│   └── auth/            # Authentication feature
│       ├── api/         # API functions
│       ├── hooks/       # Feature hooks
│       └── types/       # Feature types
├── hooks/               # Shared custom hooks
├── lib/                 # Utilities and configuration
│   ├── api/             # API client
│   ├── config/          # Environment config
│   └── utils/           # Helper functions
├── routes/              # File-based routing
│   ├── _auth/           # Auth routes (signin, signup, signout)
│   └── _dashboard/      # Protected dashboard routes
├── types/               # Global TypeScript types
└── root.tsx             # App root with providers
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd kisum-admin

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

# Server Configuration
NODE_ENV=development
SESSION_SECRET=your-session-secret-min-32-chars
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

### Static Hosting (Vercel, Netlify, etc.)

Since this is an SPA (`ssr: false`), deploy the `build/client` directory to any static hosting provider.

**Important**: Configure your hosting to redirect all routes to `index.html` for client-side routing.

## Architecture Decisions

### Why SPA Mode?

This boilerplate is configured as a Single Page Application (`ssr: false`) for:
- Simpler deployment to static hosts
- Lower infrastructure costs
- Better suited for admin dashboards behind authentication

### Why Zustand over Context?

- No provider wrapper needed
- Built-in localStorage persistence
- Better performance with selective subscriptions
- Actions callable outside React components

### Why Custom Zod Resolver?

The included `lib/utils/zod-resolver.ts` provides a custom resolver for react-hook-form that:
- Uses `safeParse` to avoid uncaught promise rejections
- Ensures compatibility across Zod versions
- Properly populates form error states

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

2. Add navigation in `app/components/app-sidebar.tsx`

### Adding a New Feature

Follow the feature-based structure:

```
app/features/users/
├── api/
│   └── users.ts      # API functions
├── hooks/
│   └── useUsers.ts   # Feature hooks
├── types/
│   └── index.ts      # Feature types
└── components/       # Feature-specific components
```

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
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this boilerplate for your projects.

## Acknowledgments

- [React Router](https://reactrouter.com/) - Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Primitives
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
