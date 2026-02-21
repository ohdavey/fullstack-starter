# Challenge App

Laravel + React + TypeScript scaffold. Backend powered by FrankenPHP, frontend by Vite.

## Requirements

- Docker + Docker Compose

## Setup

```bash
cp .env.example .env
docker compose up -d --build
```

The first build will install Composer and Node dependencies automatically.

## Services

| Service | URL |
|---|---|
| App (Laravel + React) | http://localhost:8000 |
| Vite HMR dev server | http://localhost:5173 |
| MySQL | localhost:3306 |
| Redis | localhost:6379 |

## Common Commands

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# Rebuild after Dockerfile changes
docker compose up -d --build

# Open a shell in the app container
docker compose exec app zsh

# Run artisan commands
docker compose exec app php artisan <command>

# Run Tinker (history persisted across restarts)
docker compose exec app php artisan tinker

# Tail Laravel logs
docker compose exec app php artisan pail

# Run migrations
docker compose exec app php artisan migrate
```

## Notes

- API routes live in `routes/api.php`, controllers in `app/Http/Controllers/Api/`.
- React pages live in `resources/js/pages/`, shadcn/ui components in `resources/js/components/ui/`.

