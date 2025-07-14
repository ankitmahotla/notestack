# Next.js Notes App

A simple fullstack notes app built with Next.js 15, Drizzle ORM, and PostgreSQL. Supports authentication, optimistic UI, and persistent storage.

## Features

- ⚡ **Next.js App Router** - Built with React Server Components & Server Actions
- 🗄️ **Drizzle ORM + PostgreSQL** - Type-safe database operations with hosted Postgres (Supabase, Railway, Neon, etc.)
- 🔐 **Authentication** - Secure user authentication (Auth0 or your choice)
- ✨ **Optimistic UI** - Instant UI updates with server synchronization
- 🎨 **Modern UI** - Clean interface built with shadcn/ui components
- 📝 **Full CRUD Operations** - Create, read, update, and delete notes

## Tech Stack

- **Framework**: Next.js 15
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Auth0 (configurable)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Hosting**: Vercel (recommended)

## Prerequisites

- Node.js 18+
- npm/yarn/pnpm/
- PostgreSQL database (cloud provider account)

## Setup

### 1. Clone & Install

```bash
git clone <this-repo>
cd <this-repo>
npm install
```

### 2. Configure Database

Create a free PostgreSQL database from one of these providers:
- [Railway](https://railway.app)
- [Neon](https://neon.tech)
- [PlanetScale](https://planetscale.com)

Copy your database connection string and add it to your environment variables:

```bash
# .env
DATABASE_URL="postgresql://username:password@host:port/database"
```

### 3. Run Database Migrations

Generate and run the database schema:

```bash
npx drizzle-kit push
```

### 4. Authentication Setup

Configure your authentication provider. For Auth0:

```bash
# .env
AUTH0_SECRET='your-auth0-secret'
APP_BASE_URL='http://localhost:3000'
AUTH0_DOMAIN='https://your-domain.auth0.com'
AUTH0_CLIENT_ID='your-client-id'
AUTH0_CLIENT_SECRET='your-client-secret'
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app running.

## Usage

### Basic Operations

- **Create Note**: Click the "New Note" button to add a new note
- **Edit Note**: Click on any note to edit its content
- **Delete Note**: Use the delete button to remove notes
- **Real-time Updates**: All changes are instantly reflected in the UI

### Key Features

- **Optimistic Updates**: Changes appear immediately while syncing with the server
- **Persistent Storage**: All notes are stored in your PostgreSQL database
- **User Authentication**: Each user sees only their own notes
- **Responsive Design**: Works seamlessly on desktop and mobile
