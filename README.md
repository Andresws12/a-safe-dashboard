# A Safe Dashboard

## Overview

A secure administration dashboard built with modern technologies that provides a robust foundation for web applications with end-to-end type safety, authentication, and more.

## Features

- 🧙‍♂️ End-to-end type safety with [tRPC](https://trpc.io)
- ⚡ Full-stack React with Next.js 15
- 📊 Data visualization using Chart.js
- 🗄️ PostgreSQL database with Prisma ORM
- 🌐 Built-in internationalization with next-intl
- 🔒 Authentication powered by NextAuth.js
- ⚙️ Recommended VSCode extensions
- 🎨 Code formatting with ESLint + Prettier
- 💚 CI/CD configured with GitHub Actions:
  - ✅ E2E tests with [Cypress](https://docs.cypress.io/)
  - ✅ Unit tests with Vitest
  - ✅ Automatic linting
- 🔐 Environment variable validation during build and startup
- 📱 Responsive UI with Radix UI components
- 🎯 State management with React Query

## Prerequisites

- Node.js >= 18.17.0
- Docker (for a local PostgreSQL database)
- pnpm (recommended package manager)

## Getting Started

### Clone and Install

```bash
git clone git@github.com:Andresws12/a-safe-dashboard.git
cd a-safe-dashboard
pnpm install
```

### Environment Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update environment variables as necessary.

### Local Setup

1. Configure the Node.js version:
   ```bash
   nvm use
   ```
2. Start the PostgreSQL database:
   ```bash
   docker compose up -d
   ```
3. Launch the development environment:
   ```bash
   pnpm dx
   ```

### Development Mode

Start all services (database, migrations, seeding, and Next.js) with:

```bash
pnpm dx
```

This command starts the PostgreSQL database, runs migrations, seeds initial data, and launches the Next.js server.

## Available Commands

### Development

```bash
pnpm dev        # Starts the Next.js development server
pnpm dx         # Initializes PostgreSQL, migrates, seeds the DB, and launches Next.js
```

### Database

```bash
pnpm generate        # Generates the Prisma client
pnpm prisma-studio   # Opens Prisma Studio for database management
pnpm db-seed         # Seeds the database with initial data
pnpm db-reset        # Resets the local database
pnpm migrate-dev     # Runs migrations in development
pnpm migrate         # Runs migrations in production
```

### Build & Deployment

```bash
pnpm build      # Generates the Prisma client, runs migrations, and builds Next.js
pnpm start      # Starts the application in production mode
```

### Testing

```bash
pnpm test-unit      # Runs unit tests with Vitest
pnpm test-e2e       # Runs E2E tests with Cypress
pnpm test-dev       # Runs E2E tests in development mode using Cypress
pnpm test-start     # Runs both unit and E2E tests
```

### Code & Formatting

```bash
pnpm lint         # Runs ESLint
pnpm lint-fix     # Runs ESLint and automatically fixes issues
pnpm format       # Formats the code with Prettier
pnpm format:check # Checks formatting without modifying files
```

## Project Structure

```
a-safe-dashboard/
├── .github/          # GitHub Actions configuration
├── .next/            # Next.js build output (generated)
├── .vscode/          # Recommended VS Code settings
├── components/       # Reusable React components
│   ├── common/       # Common components (header, etc.)
│   ├── pages/        # Page-specific components
│   ├── providers/    # Context providers
│   └── UI/           # User interface components
├── cypress/          # E2E tests with Cypress
│   ├── downloads/    # Files downloaded during test execution
│   ├── e2e/          # End-to-end test specifications
│   │   ├── login.cy.ts               # Login flow tests
│   │   └── utilities/                # Reusable test utilities
│   │       ├── common.classes.ts     # Common CSS class selectors
│   │       ├── common.selectors.ts   # Common element selectors
│   │       ├── utils.ts              # General utility functions
│   │       ├── components/           # Component-specific utilities
│   │       ├── login/                # Login-specific utilities
│   │       │   └── login.selectors.ts # Login page selectors
│   │       ├── models/               # Data models for tests
│   │       └── utils/                # Additional utility functions
│   │           └── loginCredentials.ts # Test credentials
│   ├── fixtures/     # Test data files
│   │   └── example.json # Example test data
│   └── support/      # Global test configuration
│       ├── commands.ts # Custom Cypress commands
│       └── e2e.ts    # E2E test configuration
├── handlers/         # Business logic handlers
├── lib/              # Libraries and utilities
├── messages/         # Internationalization messages
│   ├── en.json       # English translations
│   └── es.json       # Spanish translations
├── prisma/           # Database schema and migrations
├── public/           # Static assets
├── src/              # Main source code
│   ├── app/          # Next.js application structure
│   ├── hooks/        # Custom hooks
│   ├── i18n/         # Internationalization configuration
│   └── server/       # Server-side code, including tRPC
└── types/            # TypeScript definitions
```

## Main Technologies

- **Frontend**: React 19, Next.js 15
- **API**: tRPC for typed APIs
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Testing**: Vitest (unit) and cypress (E2E)
- **Styling**: Tailwind CSS, Radix UI
- **Internationalization**: next-intl
- **Charts**: Chart.js / react-chartjs-2

## License

[MIT](LICENSE)

## Contact

Andrés Hernández - [GitHub](https://github.com/Andresws12)

Project link: [https://github.com/Andresws12/a-safe-dashboard](https://github.com/Andresws12/a-safe-dashboard)
