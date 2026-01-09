# ZUNO v2 - AI Learning & Productivity SaaS

ZUNO v2 is a modern, production-grade learning platform built with Next.js 14, Supabase, and AI orchestration via OpenRouter.

## Architecture

### Frontend (Next.js 14 App Router)
- **App Router**: Leveraging Server Components for data fetching and Client Components for interactivity.
- **Tailwind CSS & Shadcn UI**: Clean, premium design system with a dark-mode focus.
- **Auth**: Direct integration with Supabase Auth for secure user management.

### Backend (Next.js API Routes)
- **Edge-Ready Functions**: API routes handle business logic like onboarding and AI roadmap generation.
- **Supabase SSR**: Secure cookie-based session handling across server and client.

### AI Layer (OpenRouter)
- **Centralized Client**: `lib/ai/client.ts` abstracts AI interactions, making it easy to swap models.
- **Structured Outputs**: Extensive use of JSON formatting for consistent roadmap data.

### Database (Supabase PostgreSQL)
- **RLS Policies**: Leveraging existing Row-Level Security for data isolation.
- **Existing Schema**: Respects the current database structure for seamless migration.

## Setup

1. **Environment Variables**:
   Copy `.env.example` to `.env.local` and fill in your keys.
   ```bash
   cp .env.example .env.local
   ```

2. **Installation**:
   ```bash
   npm install
   ```

3. **Development**:
   ```bash
   npm run dev
   ```

4. **Docker**:
   ```bash
   docker-compose up --build
   ```

## API Documentation

### POST `/api/onboarding`
Processes user learning goals and generates AI roadmaps.
- **Body**:
  ```json
  {
    "subjects": ["Python", "Machine Learning"],
    "full_name": "John Doe",
    "daily_time_minutes": 60,
    "target_date": "2026-05-01",
    "target_goal": "job-ready",
    "learning_style": "mixed"
  }
  ```

## Deployment Checklist
1. Configure Supabase Auth redirect URLs (`/auth/callback`).
2. Set Production environment variables in Vercel.
3. Ensure RLS policies are active on all tables.
4. Verify OpenRouter API credits.
