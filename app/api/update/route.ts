import { NextResponse } from 'next/server';
import { fetchPrice, fetchPriceHistory, ASSETS } from '@/lib/data';
import {
  computeSignals,
  detectCrossAssetEvents,
  applyCrossAssetEvents,
} from '@/lib/signals';
import { setCachedSnapshot } from '@/lib/cache';
import { MarketSnapshot } from '@/lib/types';

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Helper function to update market data
 */
async function updateMarketData() {
  // Fetch current prices for all assets
  const pricePromises = ASSETS.map((asset) =>
    fetchPrice(asset.symbol).then((price) => [asset.symbol, price] as const)
  );
  const prices = await Promise.all(pricePromises);
  const currentPrices = new Map(prices);

  // Fetch price histories for volatility calculation
  const historyPromises = ASSETS.map((asset) =>
    fetchPriceHistory(asset.symbol, 60).then((history) => [
      asset.symbol,
      history,
    ] as const)
  );
  const histories = await Promise.all(historyPromises);
  const historyMap = new Map(histories);

  // Compute signals for each asset
  let assets = await computeSignals(currentPrices, historyMap);

  // Perform cross-asset analysis
  const crossAssetEvents = detectCrossAssetEvents(assets);

  // Apply cross-asset events to update regimes
  assets = applyCrossAssetEvents(assets, crossAssetEvents);

  // Create snapshot
  const snapshot: MarketSnapshot = {
    assets,
    timestamp: Date.now(),
    crossAssetEvents,
  };

  // Cache the snapshot
  await setCachedSnapshot(snapshot);

  return {
    success: true,
    timestamp: snapshot.timestamp,
    assetCount: assets.length,
  };
}

/**
 * API route that fetches market data, computes signals, and caches the result
 * Should be called every 60 seconds (via cron or external scheduler)
 * 
 * Vercel cron jobs use POST by default, but we support both GET and POST
 */
export async function POST(request: Request) {
  // Vercel cron jobs automatically add the x-vercel-cron header
  // For additional security, you can check for a CRON_SECRET env variable
  const vercelCronHeader = request.headers.get('x-vercel-cron');
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  
  // If CRON_SECRET is set, require it. Otherwise, allow Vercel cron requests
  if (cronSecret) {
    if (authHeader !== `Bearer ${cronSecret}` && !vercelCronHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  try {
    const result = await updateMarketData();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating market data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update market data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Allow GET for manual testing
  try {
    const result = await updateMarketData();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating market data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update market data' },
      { status: 500 }
    );
  }
}

