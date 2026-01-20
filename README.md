# Kisum Admin Dashboard

A scalable, maintainable, and high-performance admin dashboard built with React Router v7.

## Features

- ✅ **Authentication**: Sign in and Sign up pages with session management
- ✅ **Type Safety**: Full TypeScript support with type-safe routes
- ✅ **Modern UI**: Tailwind CSS with dark mode support
- ✅ **Form Validation**: React Hook Form with Zod validation
- ✅ **Server-Side Rendering**: SSR enabled for better performance
- ✅ **Scalable Architecture**: Feature-based folder structure

## Project Structure

```
app/
├── components/          # Reusable UI components
│   └── ui/             # Base UI components (Button, Input, Card)
├── routes/             # File-based routing
│   ├── _auth/          # Authentication routes
│   │   ├── signin.tsx  # Sign in page
│   │   └── signup.tsx  # Sign up page
│   └── _dashboard/     # Protected dashboard routes
│       ├── _layout.tsx # Dashboard layout
│       └── _index.tsx  # Dashboard home
├── lib/                # Utilities and helpers
│   ├── api/            # API client and resources
│   ├── auth/           # Authentication utilities
│   ├── config/         # Configuration
│   └── utils/          # General utilities
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
└── server/             # Server-only code
    └── actions/         # Server actions
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm >= 10.0.0

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
pnpm build
```

### Production

```bash
pnpm start
```

## Authentication

The app includes a complete authentication system with:

- **Sign In**: `/signin` - User authentication
- **Sign Up**: `/signup` - New user registration
- **Session Management**: Server-side session handling
- **Protected Routes**: Dashboard routes require authentication

### Mock Authentication

Currently, the authentication uses mock data for development. To integrate with a real backend:

1. Update `app/lib/api/auth.ts` to point to your API endpoints
2. Update the action functions in `app/routes/_auth/signin.tsx` and `app/routes/_auth/signup.tsx`
3. Configure your session store in `app/lib/auth/session.server.ts` (use Redis, database, etc.)

## Routes

- `/` - Home (redirects to signin or dashboard)
- `/signin` - Sign in page
- `/signup` - Sign up page
- `/dashboard` - Protected dashboard (requires authentication)

## Tech Stack

- **React Router v7** - Routing and SSR
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **TanStack Query** - Server state management
- **Vite** - Build tool

## Next Steps

1. **Connect to Backend**: Update API endpoints in `app/lib/api/`
2. **Add More Routes**: Create additional dashboard pages
3. **Implement Permissions**: Add role-based access control
4. **Add Data Tables**: Use TanStack Table for data management
5. **Set Up Testing**: Add unit and E2E tests
6. **Configure CI/CD**: Set up deployment pipeline

## License

MIT
