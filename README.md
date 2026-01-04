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
3. **Important**: In Vercel project settings, ensure:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build` (or leave empty for auto-detection)
   - **Output Directory**: Leave empty (Next.js handles this automatically)
   - **Install Command**: `npm install` (or leave empty)
4. Add environment variables (optional, for Vercel KV):
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

5. The cron job is configured to run once daily (9:00 AM UTC) due to Vercel Hobby plan limitations.
   For more frequent updates, upgrade to Pro plan or use an external scheduler.

### Cron Setup (Vercel)

The cron job is configured in `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/update",
    "schedule": "0 9 * * *"
  }]
}
```

**Note**: Hobby accounts are limited to daily cron jobs. The schedule `0 9 * * *` runs once per day at 9:00 AM UTC.
For real-time monitoring (every 60 seconds), upgrade to Pro plan or use an external scheduler service.

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
