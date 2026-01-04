import { MarketSnapshot } from './types';

// In-memory cache fallback
let memoryCache: MarketSnapshot | null = null;
let cacheTimestamp = 0;

/**
 * Cache abstraction layer
 * Uses Vercel KV in production, falls back to in-memory cache
 */
export async function getCachedSnapshot(): Promise<MarketSnapshot | null> {
  // Try Vercel KV first
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const { kv } = await import('@vercel/kv');
      const snapshot = await kv.get<MarketSnapshot>('market-snapshot');
      return snapshot;
    } catch (error) {
      console.error('KV error, falling back to memory:', error);
    }
  }

  // Fallback to in-memory cache
  // Only return if cache is less than 2 minutes old
  if (memoryCache && Date.now() - cacheTimestamp < 120000) {
    return memoryCache;
  }

  return null;
}

/**
 * Store snapshot in cache
 */
export async function setCachedSnapshot(snapshot: MarketSnapshot): Promise<void> {
  // Try Vercel KV first
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const { kv } = await import('@vercel/kv');
      await kv.set('market-snapshot', snapshot, { ex: 300 }); // 5 minute expiry
      return;
    } catch (error) {
      console.error('KV error, falling back to memory:', error);
    }
  }

  // Fallback to in-memory cache
  memoryCache = snapshot;
  cacheTimestamp = Date.now();
}

