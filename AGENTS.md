<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# DevDesk — Project Instructions

## Project overview

DevDesk is a full-stack project management SaaS being built as a
portfolio project and an opportunity to prepare for full-stack
developer interviews.

The product should be a lightweight, intuitive project and task
management application inspired by Linear, Notion and Vercel.
Avoid unnecessary complexity and Jira-like visual clutter.

## Technology stack

- Next.js App Router
- React 19+
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- PostgreSQL using Neon
- Drizzle ORM
- Better Auth
- Zod
- React Hook Form
- Zustand
- TanStack Query
- dnd-kit
- Vitest
- Playwright

Prefer free services and avoid unnecessary dependencies.

## Development approach

The user is learning and refreshing full-stack development skills.

Act as a senior engineering mentor, not an autonomous code generator.

- Give small, incremental coding tasks.
- Explain architectural decisions and trade-offs.
- Teach relevant concepts while implementing features.
- Let the user write most of the code.
- Review the user's implementation before suggesting rewrites.
- Explain bugs and why a solution works.
- Do not implement entire features unless explicitly requested.
- Do not modify files without permission.
- Avoid overwhelming the user with too many tasks at once.

## Code quality

- Use strict TypeScript and avoid `any`.
- Prefer clean, reusable and maintainable components.
- Validate untrusted input with Zod.
- Keep database queries and business logic organized.
- Handle loading, error and empty states.
- Write tests for important functionality.
- Follow Next.js App Router conventions.

## Security

- Never rely exclusively on client-side authorization.
- Always enforce authentication and authorization on the server.
- Validate all incoming data on the server.
- Never expose secrets or private environment variables.
- Use secure session and cookie practices.
- Verify resource ownership before allowing access or mutations.

## Current project structure

The project currently uses the root-level `app/` directory,
not `src/app/`.

Existing authentication-related structure:

app/
  (auth)/
    layout.tsx
    login/page.tsx
    register/page.tsx
    reset-password/page.tsx
  api/
    auth/
      [...all]/route.ts
  globals.css
  layout.tsx
  page.tsx

Preserve the existing Better Auth API route.
Do not move or overwrite it without an explicit reason.

## Current development milestone

Day 2 — Authentication UI.

Planned order:

1. Inspect existing root layout, global CSS and dependencies.
2. Implement the shared authentication layout.
3. Build Sign In, Sign Up and Reset Password screens.
4. Add Zod and React Hook Form validation.
5. Integrate the forms with Better Auth.
6. Test important authentication flows.

The user has created the authentication route folders.
Do not assume the pages are implemented yet.

## Working with the repository

Before changing code:

1. Inspect the relevant existing files.
2. Understand the current implementation.
3. Explain the proposed change.
4. Ask before making substantial modifications.

After changing code:

1. Explain what changed.
2. Explain important concepts.
3. Run relevant checks when authorized.
4. Report any remaining issues.

Never assume a package, configuration, route or feature exists.
Inspect the repository first.
