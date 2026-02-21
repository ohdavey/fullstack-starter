# Interview Coding Challenge — Project Scaffold

## Overview
A pre-built, ready-to-code scaffold for a Senior Full Stack Software Engineer interview coding challenge. The goal is to walk in with zero setup time remaining, spending all 4 hours on the actual problem.

---

## Stack

| Layer | Technology |
|---|---|
| Backend | Laravel (latest) |
| Database | MySQL 8 |
| Cache | Redis |
| Frontend | Vite + React + TypeScript |
| UI Components | shadcn/ui |
| Styling | Tailwind CSS v4 |
| Runtime | FrankenPHP |
| Containerization | Docker / Docker Compose |
| Node.js | For Vite dev server (inside container) |

> **ORM Rule:** No Eloquent models. All database interaction via raw SQL using Laravel's `DB::select()`, `DB::insert()`, `DB::update()`, `DB::delete()`, and `DB::statement()` with parameterized queries only.

---

## Architecture

Single-repo Laravel + Vite approach:
- Laravel serves as the API backend and bootstraps the Vite-powered React frontend
- Vite dev server runs inside Docker and proxies HMR through Laravel's Vite plugin
- React is the frontend SPA, communicating with Laravel API routes via `fetch`
- shadcn/ui components are pre-installed and ready to use with no CLI needed during the challenge

---

## Docker Services

```
docker-compose.yml
├── app        → FrankenPHP running Laravel (port 8000)
├── mysql      → MySQL 8 (port 3306)
├── redis      → Redis 7 (port 6379)
└── node       → Node.js for Vite HMR dev server (port 5173)
```

All services on a shared Docker network. Environment variables injected via `.env`.

---

## Project Structure

```
/
├── app/
│   └── Http/
│       └── Controllers/
│           └── Api/          ← All API controllers go here
├── database/
│   ├── migrations/           ← Use for table creation (not ORM, just schema)
│   └── schema.sql            ← Raw SQL dump for reference
├── resources/
│   ├── js/
│   │   ├── components/
│   │   │   └── ui/           ← shadcn/ui components (pre-installed)
│   │   ├── pages/            ← React page components
│   │   ├── lib/
│   │   │   └── utils.ts      ← shadcn cn() utility
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── views/
│       └── app.blade.php     ← Single Blade view that mounts React
├── routes/
│   ├── api.php               ← All API routes
│   └── web.php               ← Catch-all route → serves React SPA
├── docker/
│   ├── Dockerfile
│   └── Caddyfile             ← FrankenPHP/Caddy config
├── docker-compose.yml
├── .env.example
└── CLAUDE.md                 ← This file
```

---

## Environment Variables (.env)

```env
APP_NAME=ChallengeApp
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=challenge
DB_USERNAME=challenge
DB_PASSWORD=secret

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_CLIENT=phpredis

VITE_API_BASE_URL=http://localhost:8000
```

---

## Pre-installed shadcn Components

The following components are already added and ready to import from `@/components/ui/`:

- `button`
- `input`
- `label`
- `card`
- `table`
- `form`
- `badge`
- `dialog`
- `select`
- `textarea`
- `separator`
- `sonner` (toast notifications)

Import pattern:
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
```

---

## Raw SQL Patterns (No ORM)

### Query helpers via Laravel DB facade

```php
// SELECT — returns array of stdClass objects
$rows = DB::select('SELECT * FROM items WHERE user_id = ?', [$userId]);

// INSERT — get new ID via lastInsertId() (MySQL)
DB::insert('INSERT INTO items (name, description) VALUES (?, ?)', [$name, $desc]);
$newId = DB::getPdo()->lastInsertId();
$item = DB::select('SELECT * FROM items WHERE id = ?', [$newId])[0];

// UPDATE
DB::update('UPDATE items SET name = ? WHERE id = ?', [$name, $id]);

// DELETE
DB::delete('DELETE FROM items WHERE id = ?', [$id]);

// DDL / arbitrary statements
DB::statement('CREATE TABLE IF NOT EXISTS items (...)');

// Transaction
DB::transaction(function () use ($data) {
    DB::insert('INSERT INTO ...', [...]);
    DB::insert('INSERT INTO ...', [...]);
});
```

> Never use `DB::table()` chained query builder — write raw SQL strings explicitly to demonstrate SQL fluency.

---

## API Response Convention

All API controllers return consistent JSON:

```php
// Success
return response()->json(['data' => $result], 200);

// Created
return response()->json(['data' => $result], 201);

// Error
return response()->json(['error' => 'Message here'], 422);
```

---

## Frontend API Convention

Centralized fetch wrapper in `resources/js/lib/api.ts`:

```ts
const BASE = import.meta.env.VITE_API_BASE_URL ?? ''

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
```

---

## Smoke Test Checklist (verify before the challenge)

- [ ] `docker compose up` starts all 4 services with no errors
- [ ] `http://localhost:8000` serves the React app (Blade shell + Vite assets)
- [ ] `http://localhost:5173` Vite HMR is active (hot reload works)
- [ ] `http://localhost:8000/api/health` returns `{"status":"ok","db":true,"redis":true}`
- [ ] Health check route performs a real `DB::select('SELECT 1')` and a Redis `ping`
- [ ] A shadcn `Button` component renders correctly on the home page
- [ ] MySQL volume persists data across `docker compose down` / `up`

---

## During the Challenge — Quick Start

1. Read the problem fully during the kickoff call. Ask about: entities, relationships, key user flows, any auth requirement.
2. Design your schema first (2-3 tables max for a 4-hour task). Write `schema.sql`.
3. Run migrations / `DB::statement()` to create tables.
4. Build one full vertical slice (API route → controller → raw SQL → React page) before adding more features.
5. Use shadcn `Table` + `Card` for display, `Form` + `Input` + `Button` for mutations.
6. Keep controllers thin — one method per route, raw SQL inline or in a dedicated `QueryService` class.

---

## Demo Talking Points (45-min discussion prep)

- Walk through schema design decisions and any normalization choices
- Explain a specific SQL query — especially any JOIN or aggregation
- Point out parameterized queries and why they prevent SQL injection
- Mention what you'd add with more time: indexes, transactions, validation, pagination, auth
- Acknowledge the transition to Laravel + React and how this scaffold aligns with their direction
