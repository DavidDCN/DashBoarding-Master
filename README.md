# Dashboard Master

A modern admin dashboard built with **Next.js**, **shadcn/ui**, and **Tailwind CSS**, featuring live data tables, multiple chart types, a Supabase-backed todo list, and real external data feeds.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ecf8e)

---

## ✨ Features

- **Dashboard Home** — bar, area, line, and pie charts; latest transactions; browser usage donut; popular content feed; and a live todo list
- **Payments Table** — sortable, filterable data table with row selection and pagination (built with `@tanstack/react-table`)
- **User Profile Page** — user badges, editable user info (via a slide-out `Sheet`), and a per-user activity line chart
- **Todo List (CRUD)** — fully wired to **Supabase**: create, read, update (toggle complete), and delete tasks in real time
- **Popular Content Feed** — pulls real, live article data from the public [dev.to API](https://dev.to/api/articles)
- **Dark / Light Mode** — powered by `next-themes`
- **Responsive sidebar & navbar** — collapsible app navigation
- **Fully responsive** — built on shadcn/ui components and Tailwind CSS 4

---


## 🛠️ Tech Stack

| Layer              | Technology                                     | Version   |
|--------------------|-------------------------------------------------|-----------|
| Framework          | Next.js (App Router, Turbopack)                 | ^16.2.6   |
| Language           | TypeScript                                      | ^5        |
| UI Library         | React / React DOM                               | 19.2.4    |
| UI Components      | shadcn/ui (Radix / Base UI primitives)          | ^4.13.0   |
| Styling            | Tailwind CSS                                    | ^4        |
| Data Tables        | TanStack Table                                  | latest    |
| Charts             | Recharts                                        | ^3.9.2    |
| Icons              | Lucide React                                    | ^1.24.0   |
| Dates              | date-fns / react-day-picker                     | ^4.4.0 / ^10.0.1 |
| Theming            | next-themes                                     | ^0.4.6    |
| Class utilities    | class-variance-authority, clsx, tailwind-merge  | latest    |
| Backend (Todos)    | Supabase (Postgres + Auto-generated API)        | JS client |
| External Data      | dev.to public API                               | —         |
| Linting/Formatting | ESLint, Prettier                                | ^9 / ^3.8.3 |

---

## 📁 Project Structure

```
Dashboard Master/
├── app/
│   ├── layout.tsx                  # Root layout, ThemeProvider
│   ├── page.tsx                    # Dashboard home
│   ├── payments/
│   │   ├── page.tsx                # Payments table page
│   │   ├── columns.tsx             # Table column definitions
│   │   └── data-table.tsx          # Reusable data table component
│   └── users/[username]/
│       └── page.tsx                # Single user profile page
├── components/
│   ├── AppAreaChart.tsx             # Area chart widget
│   ├── AppBarChart.tsx              # Total Revenue bar chart
│   ├── AppLineChart.tsx             # User activity line chart
│   ├── AppPieChart.tsx              # Browser usage donut chart
│   ├── AppSidebar.tsx               # Collapsible sidebar navigation
│   ├── Navbar.tsx                   # Top navigation bar
│   ├── CardList.tsx                 # Transactions / popular content lists
│   ├── TodoList.tsx                 # Supabase-backed CRUD todo list
│   ├── EditUser.tsx                 # Edit user form (Sheet content)
│   ├── TablePagination.tsx          # Pagination controls for data tables
│   ├── theme-provider.tsx           # next-themes wrapper
│   ├── img/                         # Static image assets
│   ├── providers/                   # Context providers
│   └── ui/                          # shadcn/ui primitives
├── hooks/                           # Custom React hooks
├── images/                          # Public-facing images
├── lib/
│   ├── supabaseClient.ts            # Supabase client instance
│   └── utils.ts                     # cn() helper, etc.
├── public/
├── .env.local                       # Environment variables (not committed)
├── components.json                  # shadcn/ui config
├── next.config.ts
├── eslint.config.mjs
├── .prettierrc / .prettierignore
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone and install base dependencies

```bash
npm install
```

This installs everything already listed in `package.json`. If you're setting the project up from scratch (or adding these features to a new project), here's what each piece was installed with:

### 2. Core framework & UI

```bash
# Next.js, React, and TypeScript are typically scaffolded together via:
npx create-next-app@latest

# shadcn/ui CLI + components used in this project
npx shadcn@latest init
npx shadcn@latest add button card badge avatar breadcrumb checkbox \
  hover-card progress select sheet input label calendar popover \
  scroll-area dropdown-menu table
```

### 3. Charts

```bash
npm install recharts
```

### 4. Data tables (Payments page)

```bash
npm install @tanstack/react-table
```

### 5. Icons

```bash
npm install lucide-react
```

### 6. Dates

```bash
npm install date-fns
npx shadcn@latest add calendar   # installs react-day-picker as a dependency
```

### 7. Dark mode

```bash
npm install next-themes
```

### 8. Supabase (Todo List backend)

```bash
npm install @supabase/supabase-js
```



### 9. Utility libraries (usually installed automatically by shadcn init)

```bash
npm install class-variance-authority clsx tailwind-merge tw-animate-css
```
<img width="1627" height="307" alt="image" src="https://github.com/user-attachments/assets/28f2420f-a0bd-408e-baf3-462e5213c5b4" />

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ Never commit `.env.local` — it's already covered by `.gitignore`.

---

## 🗄️ Supabase Setup

Run this in your Supabase project's **SQL Editor** to create the `todos` table:

```sql
create table todos (
  id uuid default gen_random_uuid() primary key,
  task text not null,
  completed boolean default false,
  created_at timestamp with time zone default now()
);

alter table todos enable row level security;

create policy "Allow all access" on todos
for all
using (true)
with check (true);
```

> This policy is permissive for demo purposes. Restrict it to authenticated users before shipping to production.

---

## 🖼️ Image Domains
The code is from: https://www.youtube.com/watch?v=SjsQdfvxjL8, being used to master the Shadcn
<img width="1895" height="896" alt="image" src="https://github.com/user-attachments/assets/f3141fd6-fe2f-4d07-9bef-f75c8fe3a89d" />
<img width="1917" height="707" alt="image" src="https://github.com/user-attachments/assets/3d249194-2162-4bf4-8b0f-0d50e548bb4c" />
<img width="1895" height="797" alt="image" src="https://github.com/user-attachments/assets/c48bb887-21aa-42aa-b3d6-2339978ec333" />
<img width="1606" height="901" alt="image" src="https://github.com/user-attachments/assets/30ec4311-8a70-40ee-8713-b9d3519b081d" />

In `next.config.ts`, whitelist any external image hosts used by the app:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placecats.com" },
      { protocol: "https", hostname: "media2.dev.to" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
```

---

## ▶️ Running the Project

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 📜 Available Scripts

| Command             | Description                    |
|----------------------|---------------------------------|
| `npm run dev`        | Start the development server    |
| `npm run build`      | Build the app for production    |
| `npm run start`      | Run the production build        |
| `npm run lint`       | Run ESLint                      |
| `npm run format`     | Format code with Prettier       |
| `npm run typecheck`  | Run TypeScript type checking    |

---

## 🗺️ Roadmap

- [ ] Rebuild the Payments feature on a Laravel API backend, as a learning exercise alongside the existing Supabase-powered Todo feature
- [ ] Add authentication (Supabase Auth or a custom backend)
- [ ] Add due dates to todos
- [ ] Persist and paginate transactions from a real database instead of static data

---

## 📄 License

This project is for personal learning purposes.
