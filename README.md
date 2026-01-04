# Live Market Dislocation Monitor

A real-time market monitoring tool that detects abnormal market behavior and classifies market regimes based on statistical deviations.

## Features

- Real-time monitoring of multiple asset classes (S&P 500, Treasury yields, EUR/USD, VIX)
- Statistical signal computation using z-scores and rolling volatility
- Market regime classification: NORMAL, STRESS, LIQUIDITY_EVENT, NARRATIVE_BREAK
- Cross-asset analysis for detecting systemic events
- Polling-based real-time updates (15s frontend, 60s backend)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Vercel KV (with in-memory fallback)
- Yahoo Finance API

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables (optional, for Vercel KV):
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

4. Set up a cron job or external scheduler to call `/api/update` every 60 seconds

### Cron Setup (Vercel)

Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/update",
    "schedule": "*/1 * * * *"
  }]
}
```

## Signal Logic

- **Z-score calculation**: `|move| / volatility`
- **Classification**:
  - `|z| < 1` → NORMAL
  - `1 ≤ |z| < 2` → STRESS
  - `|z| ≥ 2` → LIQUIDITY_EVENT

- **Cross-asset checks**:
  - Equities ↓ + Yields ↑ → LIQUIDITY_EVENT
  - Equities ↓ + VIX ↑ + FX flat → NARRATIVE_BREAK

## Project Structure

```
/app
  /page.tsx                # Dashboard
  /api
    /update/route.ts       # Fetch & compute signals
    /snapshot/route.ts     # Get cached snapshot
  /components
    MarketGrid.tsx         # Grid display
    StatusBadge.tsx        # Status indicator
  /lib
    data.ts                # Market data fetching
    signals.ts             # Signal computation
    cache.ts               # Caching layer
    types.ts               # TypeScript types
```
