<div align="center">

# ⚡ DevDesk

### Modern, Developer-First Project Management Platform

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![Neon Postgres](https://img.shields.io/badge/Neon_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=black)](https://neon.tech/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-9333EA?style=for-the-badge&logo=auth0&logoColor=white)](https://better-auth.com/)

<p align="center">
  <b>DevDesk</b> is a high-performance, developer-centric project management application designed for agile teams, sprint velocity, and streamlined issue tracking. Built on the modern Next.js 16 App Router and powered by serverless Neon Postgres.
</p>

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Database](#-database--migrations) • [Scripts](#-scripts)

</div>

---

## 🚀 Key Features

- **📋 Dynamic Kanban & Sprint Boards**: Smooth drag-and-drop task workflow powered by `@dnd-kit`, supporting customizable swimlanes (*Backlog*, *In Progress*, *In Review*, *Done*).
- **⚡ Developer-Centric Issue Tracking**: Issue prioritization, rich markdown descriptions, labels, milestones, and estimate point allocations.
- **📊 Real-time Sprint Analytics**: Interactive burndown charts, velocity tracking, and cycle-time visualizers powered by Recharts.
- **🔐 Secure Authentication**: Multi-session authentication, credential management, and role-based access control with Better Auth and Drizzle ORM adapter.
- **☁️ Branch-First Database Architecture**: Powered by Neon Serverless Postgres with instant database branching for preview environments and zero-downtime schema migrations.
- **🎨 Modern UI/UX**: Crafted with Tailwind CSS v4, Base UI primitives, Lucide icons, Dark/Light mode support (`next-themes`), and sonner notifications.
- **🤖 Agent & MCP Ready**: Bundled with Neon Agent Skills and Model Context Protocol (MCP) tooling for AI-driven workflows and autonomous project management.

---

## 🛠 Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) | Server Components, Server Actions, React 19 |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern CSS utility framework with CSS variables |
| **Database** | [Neon Postgres](https://neon.tech/) | Cloud-native serverless Lakebase Postgres |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) | Type-safe, high-performance TypeScript ORM |
| **Authentication** | [Better Auth](https://better-auth.com/) | Complete TypeScript-first authentication suite |
| **Drag & Drop** | [@dnd-kit](https://dndkit.com/) | Modular drag-and-drop toolkit for Kanban boards |
| **State Management**| [Zustand](https://zustand-demo.pmnd.rs/) & [TanStack Query v5](https://tanstack.com/query) | Client state and server cache synchronization |
| **Data Visualization**| [Recharts](https://recharts.org/) | Composable React charting library |
| **Forms & Validation**| [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) | Type-safe schema validation |

---

## 🏛 Architecture

```mermaid
graph TD
    Client["Client / Browser<br/>(React 19 & DnD Kit)"]
    NextServer["Next.js 16 Server<br/>(App Router & Server Actions)"]
    AuthModule["Better Auth Engine<br/>(/api/auth/[...all])"]
    Drizzle["Drizzle ORM<br/>(Type-safe Query Builder)"]
    NeonDB["Neon Serverless Postgres<br/>(Lakebase Postgres with Connection Pooling)"]

    Client -->|HTTP / React Server Components| NextServer
    Client -->|Auth Requests| AuthModule
    NextServer -->|Server Calls| Drizzle
    AuthModule -->|Session & User Store| Drizzle
    Drizzle -->|@neondatabase/serverless| NeonDB
```

---

## 📂 Project Structure

```text
devdesk/
├── app/                      # Next.js 16 App Router
│   ├── api/auth/[...all]/    # Better Auth route handlers
│   ├── globals.css           # Tailwind CSS v4 styling
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Application landing page
├── components/               # React components
│   └── ui/                   # Reusable Base UI & Radix-style components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── sheet.tsx
│       └── ...
├── drizzle/                  # Generated SQL migrations
├── lib/                      # Core utilities and singletons
│   ├── auth.ts               # Better Auth server configuration
│   ├── auth-client.ts        # Better Auth client methods
│   └── db/                   # Database configuration
│       ├── index.ts          # Neon pooled database connection
│       └── schema/           # Drizzle schema definitions
│           ├── auth-schema.ts
│           └── index.ts
├── drizzle.config.ts         # Drizzle Kit configuration
└── package.json              # Dependencies and scripts
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js**: `v22.20.0` or higher
- **Package Manager**: `npm`, `pnpm`, or `bun`
- **Database**: A [Neon](https://neon.tech) Postgres account / project

### 1. Clone & Install

```bash
git clone https://github.com/your-username/devdesk.git
cd devdesk
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the project root:

```env
# Neon Postgres Connection (direct and pooled)
DATABASE_URL="postgresql://<user>:<password>@<ep-id>.c-3.<region>.aws.neon.tech/neondb?sslmode=require"
DATABASE_URL_POOLED="postgresql://<user>:<password>@<ep-id>-pooler.c-3.<region>.aws.neon.tech/neondb?sslmode=require"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-generated-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

> **Tip**: Generate a strong auth secret with:
> ```bash
> openssl rand -base64 32
> ```

### 3. Database Migration

Generate and apply the database migrations using Drizzle Kit:

```bash
# Generate SQL migrations from schema
npm run db:generate

# Apply migrations to your Neon database
npm run db:migrate
```

To visually explore and manipulate your database records:

```bash
npm run db:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view DevDesk.

---

## 💻 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `next dev` | Starts the Next.js development server with Turbopack |
| `build` | `next build` | Compiles the production build |
| `start` | `next start` | Runs the compiled production server |
| `lint` | `eslint` | Runs ESLint checks |
| `db:generate` | `drizzle-kit generate` | Generates Drizzle migration files from schemas |
| `db:migrate` | `drizzle-kit migrate` | Applies pending migrations to the database |
| `db:studio` | `drizzle-kit studio` | Launches the interactive Drizzle Studio UI |

---

## 🔒 Security & Best Practices

- **Zero Secret Leaks**: Credentials, auth secrets, and database connection strings are kept exclusively in `.env.local` and never committed to version control.
- **Connection Pooling**: Configured with Neon's serverless connection pooler for low-latency queries during traffic spikes.
- **Type Safety**: End-to-end type safety from the Postgres schema layer (`drizzle-orm`) to the client form validations (`zod`).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
