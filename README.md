# 🌀 SentinelPH

Philippine Disaster Intelligence Dashboard — real-time monitoring and analytics for typhoons, earthquakes, and natural calamities.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 + TypeScript + Tailwind + shadcn/ui |
| Backend | NestJS 11 + TypeScript |
| Database | PostgreSQL 16 + Prisma ORM |
| Cache | Redis 7 |
| Maps | mapcn (MapLibre GL) |
| Charts | Recharts via shadcn |
| Monorepo | Turborepo + Bun |

## Prerequisites

- [Bun](https://bun.sh) >= 1.3
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Node.js >= 20

## Getting Started

### 1. Clone and install
\```bash
git clone https://github.com/kenneth-loto/sentinelph.git
cd sentinelph
bun install
\```

### 2. Setup environment variables
\```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
\```

### 3. Start infrastructure
\```bash
docker compose up -d
\```

Services:
- PostgreSQL → localhost:5432
- Redis → localhost:6379  
- PgAdmin → http://localhost:5050 (admin@sentinel.dev / admin123)

### 4. Run development
\```bash
bun run dev
\```

- Frontend → http://localhost:3000
- API → http://localhost:4000/api

## Project Structure

\```
sentinelph/
├── apps/
│   ├── web/          ← Next.js 16 frontend
│   └── api/          ← NestJS 11 backend
├── packages/
│   └── typescript-config/
├── docker-compose.yml
└── turbo.json
\```

## Data Sources

- [USGS Earthquake API](https://earthquake.usgs.gov/fdsnws/event/1/)
- [GDACS Global Disaster Alerts](https://www.gdacs.org)
- [NASA EONET Natural Events](https://eonet.gsfc.nasa.gov/api/v3/events)
- [Open-Meteo Weather API](https://open-meteo.com)
