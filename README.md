# Paige Monorepo

A monorepo containing the Paige wedding web application and its Backend for Frontend (BFF) orchestration layer.

## Directory Structure

```
paige-monorepo/
├── apps/
│   ├── web/                           # Next.js Frontend
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json               # App-specific dependencies
│   │   ├── tsconfig.json              # Extends root, adds Next.js config
│   │   ├── next.config.ts
│   │   └── Dockerfile                 # Independent deployment
│   │
│   ├── web-orchestration/             # BFF Layer (Backend for Frontend)
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── package.json               # App-specific dependencies
│   │   ├── tsconfig.json              # Extends root, adds Node.js config
│   │   └── Dockerfile                 # Independent deployment
│   │
│   └── packages/
│       └── shared/                    # Shared utilities and types
│           ├── src/
│           │   ├── types/
│           │   └── utils/
│           ├── package.json
│           └── tsconfig.json
│
├── tsconfig.json                      # Base TypeScript config
├── pnpm-workspace.yaml                # Defines workspace packages
├── package.json                       # Root scripts and shared dev deps
├── docker-compose.yml                 # Production deployment
├── docker-compose.dev.yml             # Development environment
└── .dockerignore                      # Docker build exclusions
```

## Tech Stack

- **Frontend (web)**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **BFF (web-orchestration)**: Express, TypeScript
- **Package Manager**: pnpm with workspaces
- **Deployment**: Docker containers for independent deployment

## Getting Started

### Prerequisites

- Node.js >= 24.0.0 (LTS)
- pnpm >= 10.0.0 (latest version more secure)

### Installation

### Install pnpm first:

https://pnpm.io/installation

``` bash
npm install --global corepack@latest
corepack enable pnpm
corepack use pnpm@latest-10
```

```bash
# Install dependencies for all workspaces
pnpm install
```

### Development

```bash
# Run both apps in parallel
pnpm dev

# Run frontend only
pnpm dev:web

# Run BFF only
pnpm dev:orchestration
```

### Building

```bash
# Build all apps
pnpm build

# Build specific app
pnpm build:web
pnpm build:orchestration
```

### Production

```bash
# Start all apps
pnpm start

# Start specific app
pnpm start:web
pnpm start:orchestration
```

## TypeScript Configuration

The monorepo uses a hierarchical TypeScript configuration:

- **Root `tsconfig.json`**: Base configuration shared across all packages
- **App-specific `tsconfig.json`**: Extends base config with app-specific settings
  - `apps/web/tsconfig.json`: Next.js-specific configuration
  - `apps/web-orchestration/tsconfig.json`: Node.js/Express configuration
  - `apps/packages/shared/tsconfig.json`: Shared library configuration

### Type Checking

```bash
# Type check all apps
pnpm typecheck
```

## Docker Deployment

Each app has its own Dockerfile for independent deployment:

### Build Docker Images

```bash
# Build all images
pnpm docker:build

# Build specific image
pnpm docker:build:web
pnpm docker:build:orchestration
```

### Run Containers

```bash
# Frontend (port 3000)
docker run -p 3000:3000 paige-web

# BFF (port 4000)
docker run -p 4000:4000 paige-orchestration
```

## Shared Packages

The `@paige/shared` package contains:

- Common TypeScript types
- Shared utility functions
- Reusable business logic

To use in your apps:

```typescript
import { ApiResponse, formatDate } from "@paige/shared";
```

## Scripts Reference

## Common Commands

| Command             | Purpose                    |
| ------------------- | -------------------------- |
| `pnpm install`      | Install all dependencies   |
| `pnpm dev`          | Start all apps in dev mode |
| `pnpm build`        | Build all apps             |
| `pnpm typecheck`    | Check TypeScript types     |
| `pnpm lint`         | Lint all apps              |
| `pnpm format`       | Format code with Prettier  |
| `pnpm clean`        | Remove all build artifacts |
| `pnpm docker:build` | Build all Docker images    |

## Environment Variables

### Frontend (apps/web)

Create `apps/web/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### BFF (apps/web-orchestration)

Create `apps/web-orchestration/.env`:

```
PORT=4000
NODE_ENV=development
```

## Adding New Packages

1. Create a new directory in `apps/packages/`
2. Add a `package.json` with a scoped name (e.g., `@paige/your-package`)
3. Add a `tsconfig.json` extending the root config
4. Run `pnpm install` to link the workspace

## Contributing

This project uses:

- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files
- **Prettier**: Code formatting
- **ESLint**: Code linting

All commits will automatically be formatted and linted.
