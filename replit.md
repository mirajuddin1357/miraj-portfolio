# Portfolio Website - Replit Configuration

## Overview

This is a modern portfolio website for Miraj Ud Din, a B.S. Artificial Intelligence student at the University of Agriculture, Peshawar. The application is built as a full-stack web application with a React frontend and Express.js backend, featuring glassmorphism design, dark/light mode, and comprehensive portfolio sections.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **UI Components**: Radix UI primitives with shadcn/ui design system
- **State Management**: React Context for theme management, TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Module System**: ES Modules
- **Development**: tsx for TypeScript execution
- **Build**: esbuild for production bundling
- **API Structure**: RESTful endpoints under `/api` prefix

### Key Design Decisions
1. **Monorepo Structure**: Client, server, and shared code in separate directories for clear separation of concerns
2. **TypeScript Throughout**: Full TypeScript implementation for type safety across the entire stack
3. **Modern Build Tools**: Vite for frontend, esbuild for backend to ensure fast development and production builds
4. **Component-Based Architecture**: Modular React components for each portfolio section

## Key Components

### Frontend Components
- **Navigation**: Fixed glassmorphism navigation bar with smooth scrolling
- **Hero Section**: Animated typing effect with particle background
- **About Section**: Personal information and academic background
- **Skills Section**: Categorized skill display with visual indicators
- **Projects Section**: Portfolio projects with technology tags
- **Certificates Section**: Academic and professional certifications
- **Contact Section**: Contact form with validation
- **Theme Provider**: Dark/light mode toggle functionality

### Backend Components
- **Route Handlers**: Contact form submission endpoint
- **Storage Layer**: In-memory storage for user data (extensible to database)
- **Vite Integration**: Development server with HMR support

### Shared Components
- **Database Schema**: Drizzle ORM schema definitions
- **Type Definitions**: Shared TypeScript types

## Data Flow

1. **Client Rendering**: Vite serves the React application in development
2. **API Communication**: Frontend makes requests to Express backend via `/api` routes
3. **Form Handling**: Contact form submissions are processed by the backend
4. **State Management**: Theme state managed via React Context, server state via TanStack Query
5. **Static Assets**: Images and assets served through CDN links

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with React DOM
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: TanStack React Query
- **Animations**: AOS (Animate On Scroll) library
- **Icons**: Font Awesome, Lucide React

### Backend Dependencies
- **Server**: Express.js
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: connect-pg-simple for session storage
- **Development**: tsx for TypeScript execution

### Database Integration
- **Database**: PostgreSQL with Neon Database serverless driver
- **ORM**: Drizzle ORM with full schema and relations
- **Tables**: Users, contact_messages, projects (with proper relations)
- **Storage**: DatabaseStorage class replacing MemStorage
- **Schema**: Zod validation for all database operations
- **Migrations**: Drizzle Kit for schema management
- **API Endpoints**: Contact form submission and message retrieval
- **Environment**: DATABASE_URL, PGPORT, PGUSER, PGPASSWORD, PGDATABASE, PGHOST available

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution with nodemon-like behavior
- **Database**: Drizzle push for schema synchronization

### Production
- **Build Process**: 
  1. Vite builds frontend to `dist/public`
  2. esbuild bundles backend to `dist/index.js`
- **Static Serving**: Express serves built frontend files
- **Database**: Production PostgreSQL database via DATABASE_URL
- **Environment**: NODE_ENV=production for production optimizations

### Configuration Notes
- **Path Aliases**: Configured for `@/` (client src), `@shared/` (shared code)
- **Asset Handling**: Vite handles asset optimization and bundling
- **TypeScript**: Strict mode enabled with modern ES modules
- **CSS Processing**: PostCSS with Tailwind and Autoprefixer

The application is designed to be easily deployable on platforms like Replit, Vercel, or similar services with minimal configuration changes.